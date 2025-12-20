import mongoose from 'mongoose';

const InternshipApplicationSchema = new mongoose.Schema({
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
        required: [true, 'Phone number is required'],
        trim: true,
        match: [
            /^[\d\s\-\+\(\)]+$/,
            'Please provide a valid phone number'
        ]
    },
    college: {
        type: String,
        trim: true,
        maxlength: [200, 'College name cannot exceed 200 characters']
    },
    domain: {
        type: String,
        required: [true, 'Domain is required'],
        trim: true,
        enum: {
            values: [
                'Full Stack Development',
                'AI & Machine Learning',
                'Data Science',
                'Digital Marketing',
                'UI/UX Design',
                'Cloud Computing',
                'Cybersecurity',
                'Mobile App Development'
            ],
            message: '{VALUE} is not a valid domain'
        }
    },
    mode: {
        type: String,
        enum: {
            values: ['Online', 'Offline'],
            message: '{VALUE} is not a valid mode'
        },
        default: 'Online'
    },
    duration: {
        type: String,
        trim: true,
        enum: {
            values: ['1 Month', '2 Months', '3 Months', '6 Months'],
            message: '{VALUE} is not a valid duration'
        }
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative'],
        max: [1000000, 'Price cannot exceed 10,00,000']
    },
    startDate: {
        type: Date,
        validate: {
            validator: function (date) {
                // Start date should not be in the past
                return date >= new Date().setHours(0, 0, 0, 0);
            },
            message: 'Start date cannot be in the past'
        }
    },
    status: {
        type: String,
        enum: {
            values: ['Applied', 'Confirmed', 'Completed', 'Cancelled'],
            message: '{VALUE} is not a valid status'
        },
        default: 'Applied'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    }
}, {
    timestamps: true,
    collection: 'internship_applications'
});

// Indexes for better query performance
InternshipApplicationSchema.index({ email: 1 });
InternshipApplicationSchema.index({ domain: 1 });
InternshipApplicationSchema.index({ status: 1 });
InternshipApplicationSchema.index({ startDate: 1 });
InternshipApplicationSchema.index({ createdAt: -1 });
InternshipApplicationSchema.index({ email: 1, domain: 1 }, { unique: true }); // Prevent duplicate applications

// Virtual for formatted date
InternshipApplicationSchema.virtual('formattedStartDate').get(function () {
    if (!this.startDate) return null;
    return this.startDate.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
});

// Virtual for formatted created date
InternshipApplicationSchema.virtual('formattedCreatedDate').get(function () {
    return this.createdAt.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
});

// Virtual for formatted price (Indian Rupees)
InternshipApplicationSchema.virtual('formattedPrice').get(function () {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(this.price);
});

// Virtual for days until start
InternshipApplicationSchema.virtual('daysUntilStart').get(function () {
    if (!this.startDate) return null;
    const now = new Date();
    const diff = this.startDate - now;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
});

// Method to get application summary
InternshipApplicationSchema.methods.getSummary = function () {
    return {
        name: this.fullName,
        email: this.email,
        domain: this.domain,
        mode: this.mode,
        duration: this.duration,
        price: this.formattedPrice,
        status: this.status,
        startDate: this.formattedStartDate
    };
};

// Method to update status
InternshipApplicationSchema.methods.updateStatus = async function (newStatus) {
    const validStatuses = ['Applied', 'Confirmed', 'Completed', 'Cancelled'];
    if (!validStatuses.includes(newStatus)) {
        throw new Error('Invalid status');
    }
    this.status = newStatus;
    return await this.save();
};

// Static method to find by domain
InternshipApplicationSchema.statics.findByDomain = function (domain) {
    return this.find({ domain })
        .sort({ createdAt: -1 })
        .select('fullName email domain mode duration price status startDate');
};

// Static method to find by status
InternshipApplicationSchema.statics.findByStatus = function (status) {
    return this.find({ status })
        .sort({ createdAt: -1 })
        .select('fullName email domain status startDate');
};

// Static method to find upcoming internships
InternshipApplicationSchema.statics.findUpcoming = function () {
    const today = new Date();
    return this.find({
        startDate: { $gte: today },
        status: { $in: ['Applied', 'Confirmed'] }
    })
        .sort({ startDate: 1 })
        .select('fullName email domain startDate status');
};

// Static method to get domain statistics
InternshipApplicationSchema.statics.getDomainStats = async function () {
    const stats = await this.aggregate([
        {
            $group: {
                _id: '$domain',
                count: { $sum: 1 },
                totalRevenue: { $sum: '$price' },
                avgPrice: { $avg: '$price' }
            }
        },
        {
            $sort: { count: -1 }
        }
    ]);

    return stats;
};

// Static method to get status statistics
InternshipApplicationSchema.statics.getStatusStats = async function () {
    const stats = await this.aggregate([
        {
            $group: {
                _id: '$status',
                count: { $sum: 1 }
            }
        }
    ]);

    return stats.reduce((acc, stat) => {
        acc[stat._id] = stat.count;
        return acc;
    }, {});
};

// Pre-save middleware to sanitize data
InternshipApplicationSchema.pre('save', function (next) {
    // Trim and normalize text fields
    if (this.fullName) {
        this.fullName = this.fullName.replace(/\s+/g, ' ').trim();
    }
    if (this.college) {
        this.college = this.college.replace(/\s+/g, ' ').trim();
    }
    next();
});

// Prevent model recompilation in development
const InternshipApplication = mongoose.models.InternshipApplication ||
    mongoose.model('InternshipApplication', InternshipApplicationSchema);

export default InternshipApplication;
