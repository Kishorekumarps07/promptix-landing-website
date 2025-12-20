import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters long'],
        maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            'Please provide a valid email address'
        ]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
        select: false // Don't return password by default in queries
    },
    role: {
        type: String,
        enum: {
            values: ['Admin', 'SuperAdmin'],
            message: '{VALUE} is not a valid role'
        },
        default: 'Admin'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    lastLogin: {
        type: Date
    }
}, {
    timestamps: true,
    collection: 'admins'
});

// Indexes
AdminSchema.index({ email: 1 }, { unique: true });
AdminSchema.index({ role: 1 });

// Virtual for formatted date
AdminSchema.virtual('formattedCreatedDate').get(function () {
    return this.createdAt.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
});

// Virtual for last login formatted
AdminSchema.virtual('formattedLastLogin').get(function () {
    if (!this.lastLogin) return 'Never';
    return this.lastLogin.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
});

// Pre-save middleware to hash password
AdminSchema.pre('save', async function () {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) {
        return;
    }

    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare password for login
AdminSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error('Password comparison failed');
    }
};

// Method to update last login
AdminSchema.methods.updateLastLogin = async function () {
    this.lastLogin = new Date();
    return await this.save();
};

// Method to check if user is SuperAdmin
AdminSchema.methods.isSuperAdmin = function () {
    return this.role === 'SuperAdmin';
};

// Static method to find by email (including password for authentication)
AdminSchema.statics.findByEmailWithPassword = function (email) {
    return this.findOne({ email }).select('+password');
};

// Static method to get all admins (excluding passwords)
AdminSchema.statics.getAllAdmins = function () {
    return this.find()
        .select('-password')
        .sort({ createdAt: -1 });
};

// Static method to count admins by role
AdminSchema.statics.countByRole = async function () {
    const stats = await this.aggregate([
        {
            $group: {
                _id: '$role',
                count: { $sum: 1 }
            }
        }
    ]);

    return stats.reduce((acc, stat) => {
        acc[stat._id] = stat.count;
        return acc;
    }, {});
};

// Prevent model recompilation in development
const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

export default Admin;
