/**
 * Debug Routes
 * Add these to your server.js file
 */

// GET /api/debug/collections
// List all collections and document counts
app.get('/api/debug/collections', async (req, res) => {
    try {
        console.log('🔍 [DEBUG] Fetching all collections...');

        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();

        const collectionInfo = await Promise.all(
            collections.map(async (col) => {
                const count = await db.collection(col.name).countDocuments();
                const sample = await db.collection(col.name).findOne();

                return {
                    name: col.name,
                    count: count,
                    sampleId: sample?._id?.toString(),
                    sampleFields: sample ? Object.keys(sample).slice(0, 8) : []
                };
            })
        );

        console.log(`✅ [DEBUG] Found ${collections.length} collections`);

        res.json({
            success: true,
            database: mongoose.connection.name,
            host: mongoose.connection.host,
            collections: collectionInfo,
            totalCollections: collections.length,
            modelCollections: {
                Contact: Contact.collection.name,
                CareerApplication: CareerApplication.collection.name,
                InternshipApplication: InternshipApplication.collection.name
            }
        });
    } catch (error) {
        console.error('❌ [DEBUG] Error fetching collections:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Enhanced logging for contact save
// Add this inside your POST /api/contacts handler after successful save:
/*
const contact = await Contact.create({...});

console.log('\n✅ DOCUMENT SAVED SUCCESSFULLY');
console.log('========================================');
console.log('📄 Document ID:', contact._id.toString());
console.log('📧 Email:', contact.email);
console.log('🗄️  Database:', mongoose.connection.name);
console.log('📚 Collection:', Contact.collection.name);
console.log('🔗 Full Path:', `${mongoose.connection.name}.${Contact.collection.name}`);
console.log('========================================\n');
*/
