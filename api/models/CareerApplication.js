import mongoose from 'mongoose';

const CareerApplicationSchema = new mongoose.Schema({
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
    roleApplied: {
        type: String,
        required: [true, 'Role applied is required'],
        trim: true,
        maxlength: [200, 'Role name cannot exceed 200 characters']
    },
    location: {
        type: String,
        trim: true,
        maxlength: [100, 'Location cannot exceed 100 characters']
    },
    qualification: {
        type: String,
        trim: true,
        maxlength: [200, 'Qualification cannot exceed 200 characters']
    },
    experienceLevel: {
        type: String,
        trim: true,
        enum: {
            values: ['Fresher', 'Entry Level', 'Mid Level', 'Senior Level', 'Expert'],
            message: '{VALUE} is not a valid experience level'
        }
    },
    skills: {
        type: [String],
        default: [],
        validate: {
            validator: function (skills) {
                return skills.length <= 20;
            },
            message: 'Cannot add more than 20 skills'
        }
    },
    resumeUrl: {
        type: String,
        trim: true,
        match: [
            /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
            'Please provide a valid URL'
        ]
    },
    portfolioUrl: {
        type: String,
        trim: true,
        match: [
            /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
            'Please provide a valid URL'
        ]
    },
    availability: {
        type: String,
        trim: true,
        enum: {
            values: ['Immediate', 'Within 2 weeks', 'Within 1 month', 'Within 2 months', 'Notice Period'],
            message: '{VALUE} is not a valid availability option'
        }
    },
    status: {
        type: String,
        enum: {
            values: ['Applied', 'Reviewed', 'Shortlisted', 'Rejected'],
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
    timestamps: true, // Adds createdAt and updatedAt
    collection: 'career_applications'
});

// Indexes for better query performance
CareerApplicationSchema.index({ email: 1 });
CareerApplicationSchema.index({ status: 1 });
CareerApplicationSchema.index({ roleApplied: 1 });
CareerApplicationSchema.index({ createdAt: -1 });
CareerApplicationSchema.index({ email: 1, roleApplied: 1 }, { unique: true }); // Prevent duplicate applications

// Virtual for formatted date
CareerApplicationSchema.virtual('formattedDate').get(function () {
    return this.createdAt.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
});

// Virtual for application age in days
CareerApplicationSchema.virtual('daysOld').get(function () {
    const now = new Date();
    const diff = now - this.createdAt;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
});

// Method to get application summary
CareerApplicationSchema.methods.getSummary = function () {
    return {
        name: this.fullName,
        email: this.email,
        role: this.roleApplied,
        status: this.status,
        appliedOn: this.formattedDate,
        daysOld: this.daysOld
    };
};

// Method to update status
CareerApplicationSchema.methods.updateStatus = async function (newStatus) {
    const validStatuses = ['Applied', 'Reviewed', 'Shortlisted', 'Rejected'];
    if (!validStatuses.includes(newStatus)) {
        throw new Error('Invalid status');
    }
    this.status = newStatus;
    return await this.save();
};

// Static method to find by status
CareerApplicationSchema.statics.findByStatus = function (status) {
    return this.find({ status })
        .sort({ createdAt: -1 })
        .select('fullName email roleApplied status createdAt');
};

// Static method to find by role
CareerApplicationSchema.statics.findByRole = function (role) {
    return this.find({ roleApplied: role })
        .sort({ createdAt: -1 });
};

// Static method to find recent applications
CareerApplicationSchema.statics.findRecent = function (limit = 10) {
    return this.find()
        .sort({ createdAt: -1 })
        .limit(limit)
        .select('fullName email roleApplied status createdAt');
};

// Static method to get application statistics
CareerApplicationSchema.statics.getStats = async function () {
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
CareerApplicationSchema.pre('save', function (next) {
    // Trim and normalize text fields
    if (this.fullName) {
        this.fullName = this.fullName.replace(/\s+/g, ' ').trim();
    }
    if (this.location) {
        this.location = this.location.replace(/\s+/g, ' ').trim();
    }
    if (this.qualification) {
        this.qualification = this.qualification.replace(/\s+/g, ' ').trim();
    }

    // Trim skills array
    if (this.skills && this.skills.length > 0) {
        this.skills = this.skills.map(skill => skill.trim()).filter(skill => skill.length > 0);
    }

    next();
});

// Prevent model recompilation in development
const CareerApplication = mongoose.models.CareerApplication ||
    mongoose.model('CareerApplication', CareerApplicationSchema);

export default CareerApplication;
