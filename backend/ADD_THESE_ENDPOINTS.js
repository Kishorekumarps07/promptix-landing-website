// Add these endpoints AFTER the /api/admin/stats endpoint (around line 449)
// and BEFORE the "// 404 handler" comment

/**
 * GET /api/admin/contacts
 * Get all contacts with pagination
 */
app.get('/api/admin/contacts', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;
        const source = req.query.source;

        const query = source ? { source } : {};
        const total = await Contact.countDocuments(query);
        const contacts = await Contact.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        console.log(`📋 Fetched ${contacts.length} contacts`);

        res.json({
            success: true,
            data: contacts,
            pagination: { page, limit, total, pages: Math.ceil(total / limit) }
        });
    } catch (error) {
        console.error('❌ Admin contacts error:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch contacts' });
    }
});

/**
 * DELETE /api/admin/contacts
 */
app.delete('/api/admin/contacts', async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ success: false, error: 'Contact ID is required' });
        }

        const contact = await Contact.findByIdAndDelete(id);
        if (!contact) {
            return res.status(404).json({ success: false, error: 'Contact not found' });
        }

        console.log(`🗑️ Deleted contact: ${contact.email}`);
        res.json({ success: true, message: 'Contact deleted successfully' });
    } catch (error) {
        console.error('❌ Delete contact error:', error);
        res.status(500).json({ success: false, error: 'Failed to delete contact' });
    }
});
