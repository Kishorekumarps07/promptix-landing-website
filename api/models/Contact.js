import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters long'],
        maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            'Please provide a valid email address'
        ]
    },
    phone: {
        type: String,
        trim: true,
        match: [
            /^[\d\s\-\+\(\)]+$/,
            'Please provide a valid phone number'
        ]
    },
    subject: {
        type: String,
        trim: true,
        maxlength: [200, 'Subject cannot exceed 200 characters']
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
        trim: true,
        minlength: [10, 'Message must be at least 10 characters long'],
        maxlength: [2000, 'Message cannot exceed 2000 characters']
    },
    source: {
        type: String,
        enum: {
            values: ['Contact Page', 'Footer', 'CTA'],
            message: '{VALUE} is not a valid source'
        },
        default: 'Contact Page'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    }
}, {
    timestamps: true, // Adds createdAt and updatedAt automatically
    collection: 'contacts'
});

// Indexes for better query performance
ContactSchema.index({ email: 1 });
ContactSchema.index({ createdAt: -1 });
ContactSchema.index({ source: 1 });

// Virtual for formatted date
ContactSchema.virtual('formattedDate').get(function () {
    return this.createdAt.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
});

// Method to get contact summary
ContactSchema.methods.getSummary = function () {
    return {
        name: this.fullName,
        email: this.email,
        subject: this.subject || 'No subject',
        source: this.source,
        date: this.formattedDate
    };
};

// Static method to find recent contacts
ContactSchema.statics.findRecent = function (limit = 10) {
    return this.find()
        .sort({ createdAt: -1 })
        .limit(limit)
        .select('fullName email subject source createdAt');
};

// Static method to find by source
ContactSchema.statics.findBySource = function (source) {
    return this.find({ source })
        .sort({ createdAt: -1 });
};

// Pre-save middleware to sanitize data
ContactSchema.pre('save', function (next) {
    // Remove extra whitespace from text fields
    if (this.fullName) {
        this.fullName = this.fullName.replace(/\s+/g, ' ').trim();
    }
    if (this.subject) {
        this.subject = this.subject.replace(/\s+/g, ' ').trim();
    }
    if (this.message) {
        this.message = this.message.replace(/\s+/g, ' ').trim();
    }
    next();
});

// Prevent model recompilation in development
const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);

export default Contact;
