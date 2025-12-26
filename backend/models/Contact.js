import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters'],
        maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true
    },
    appointmentDate: {
        type: String,
        trim: true
    },
    appointmentTime: {
        type: String,
        trim: true
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
        minlength: [10, 'Message must be at least 10 characters'],
        maxlength: [2000, 'Message cannot exceed 2000 characters']
    },
    source: {
        type: String,
        default: 'Contact Page'
    },
    status: {
        type: String,
        enum: ['New', 'In Progress', 'Resolved', 'Archived'],
        default: 'New'
    }
}, {
    timestamps: true
});

// Indexes for better query performance
ContactSchema.index({ email: 1 });
ContactSchema.index({ createdAt: -1 });

const Contact = mongoose.model('Contact', ContactSchema);

export default Contact;
