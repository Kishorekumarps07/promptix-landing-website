import mongoose from 'mongoose';

// Global cache for MongoDB connection (serverless optimization)
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Connect to MongoDB database
 * Optimized for serverless environments with connection caching
 * @returns {Promise<typeof mongoose>} Mongoose connection
 */
async function connectDB() {
    // Return cached connection if available
    if (cached.conn) {
        console.log('Using cached database connection');
        return cached.conn;
    }

    // Check if MongoDB URI is configured
    if (!process.env.MONGODB_URI) {
        throw new Error(
            'Please define the MONGODB_URI environment variable inside .env.local'
        );
    }

    // Create new connection if no promise exists
    if (!cached.promise) {
        const opts = {
            bufferCommands: false, // Disable mongoose buffering
            maxPoolSize: 10, // Maximum number of connections in the pool
            serverSelectionTimeoutMS: 5000, // Timeout for server selection
            socketTimeoutMS: 45000, // Socket timeout
            family: 4, // Use IPv4, skip trying IPv6
        };

        console.log('Creating new database connection...');

        cached.promise = mongoose
            .connect(process.env.MONGODB_URI, opts)
            .then((mongoose) => {
                console.log('Database connected successfully');
                return mongoose;
            })
            .catch((error) => {
                console.error('Database connection error:', error);
                throw error;
            });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

/**
 * Disconnect from MongoDB
 * Useful for cleanup in non-serverless environments
 */
export async function disconnectDB() {
    if (cached.conn) {
        await cached.conn.disconnect();
        cached.conn = null;
        cached.promise = null;
        console.log('Database disconnected');
    }
}

/**
 * Get connection status
 * @returns {string} Connection state
 */
export function getConnectionStatus() {
    if (!cached.conn) return 'disconnected';

    const states = {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting',
    };

    return states[mongoose.connection.readyState] || 'unknown';
}

export default connectDB;
