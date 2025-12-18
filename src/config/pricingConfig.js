// Domain-based pricing configuration
// This can be easily extended for different pricing tiers per domain

export const DOMAIN_PRICING = {
    'Artificial Intelligence & Data': {
        basePrice: 9999,
        duration: '8 weeks',
        currency: 'INR',
        features: [
            'Industry-focused training',
            'Real-world project',
            'Internship certificate',
            'Mentor guidance',
            'Career support'
        ]
    },
    'Software & Full-Stack': {
        basePrice: 9999,
        duration: '8 weeks',
        currency: 'INR',
        features: [
            'Industry-focused training',
            'Real-world project',
            'Internship certificate',
            'Mentor guidance',
            'Career support'
        ]
    },
    'Cloud, DevOps & Automation': {
        basePrice: 9999,
        duration: '8 weeks',
        currency: 'INR',
        features: [
            'Industry-focused training',
            'Real-world project',
            'Internship certificate',
            'Mentor guidance',
            'Career support'
        ]
    },
    'UI / UX & Product Design': {
        basePrice: 9999,
        duration: '8 weeks',
        currency: 'INR',
        features: [
            'Industry-focused training',
            'Real-world project',
            'Internship certificate',
            'Mentor guidance',
            'Career support'
        ]
    },
    'Digital Marketing & Growth': {
        basePrice: 9999,
        duration: '8 weeks',
        currency: 'INR',
        features: [
            'Industry-focused training',
            'Real-world project',
            'Internship certificate',
            'Mentor guidance',
            'Career support'
        ]
    },
    'Business, Analytics & Product': {
        basePrice: 9999,
        duration: '8 weeks',
        currency: 'INR',
        features: [
            'Industry-focused training',
            'Real-world project',
            'Internship certificate',
            'Mentor guidance',
            'Career support'
        ]
    },
    'Quality, Security & Assurance': {
        basePrice: 9999,
        duration: '8 weeks',
        currency: 'INR',
        features: [
            'Industry-focused training',
            'Real-world project',
            'Internship certificate',
            'Mentor guidance',
            'Career support'
        ]
    },
    'Content & Communication': {
        basePrice: 9999,
        duration: '8 weeks',
        currency: 'INR',
        features: [
            'Industry-focused training',
            'Real-world project',
            'Internship certificate',
            'Mentor guidance',
            'Career support'
        ]
    },
    // Default pricing for any domain not listed
    default: {
        basePrice: 9999,
        duration: '8 weeks',
        currency: 'INR',
        features: [
            'Industry-focused training',
            'Real-world project',
            'Internship certificate',
            'Mentor guidance',
            'Career support'
        ]
    }
};

// Helper function to get pricing for a specific domain
export const getDomainPricing = (domain) => {
    return DOMAIN_PRICING[domain] || DOMAIN_PRICING.default;
};

// Helper function to format price
export const formatPrice = (amount, currency = 'INR') => {
    const currencySymbols = {
        INR: '₹',
        USD: '$',
        EUR: '€'
    };
    return `${currencySymbols[currency] || ''}${amount.toLocaleString()}`;
};

// Application status constants
export const APPLICATION_STATUS = {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    PAYMENT_PENDING: 'payment_pending',
    PAID: 'paid',
    REJECTED: 'rejected',
    CANCELLED: 'cancelled'
};

// Payment mode constants
export const PAYMENT_MODES = {
    ONLINE: 'online',
    OFFLINE: 'offline',
    EMI: 'emi'
};
