import mongoose from 'mongoose';

const InternshipApplicationSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true
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
    domain: {
        type: String,
        required: [true, 'Domain is required'],
        enum: [
            'Web Development',
            'App Development',
            'AI & Data Science',
            'Digital Marketing',
            'Graphic Design',
            'Content Writing',
            'Video Editing',
            'UI/UX Design'
        ]
    },
    college: {
        type: String,
        trim: true
    },
    year: {
        type: String,
        trim: true
    },
    branch: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    mode: {
        type: String,
        enum: ['Remote', 'On-site', 'Hybrid'],
        default: 'Remote'
    },
    startDate: {
        type: Date
    },
    duration: {
        type: String,
        default: '8 weeks'
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        default: 9999
    },
    message: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'in-progress', 'completed', 'cancelled'],
        default: 'pending'
    }
}, {
    timestamps: true
});

// Indexes
InternshipApplicationSchema.index({ email: 1, domain: 1 });
InternshipApplicationSchema.index({ status: 1 });
InternshipApplicationSchema.index({ domain: 1 });
InternshipApplicationSchema.index({ createdAt: -1 });

const InternshipApplication = mongoose.model('InternshipApplication', InternshipApplicationSchema);

export default InternshipApplication;
