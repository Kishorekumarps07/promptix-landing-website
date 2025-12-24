
// Contact Information - Single Source of Truth
// This file contains all contact details for the PromptiX website
// Import and use these constants instead of hardcoding contact information

export const CONTACT = {
    // Phone Numbers
    phone: {
        // Raw number for tel: links (no spaces or hyphens)
        raw: '+918939003635',
        // Display format for UI
        display: '+91 89390 03635',
        // Digits only for WhatsApp and other integrations
        digitsOnly: '918939003635',
    },

    // WhatsApp
    whatsapp: {
        // WhatsApp link (wa.me format)
        link: 'https://wa.me/918939003635',
        // Display number
        display: '+91 89390 03635',
    },

    // Email
    email: {
        // Company email address
        address: 'infopromptix@gmail.com',
        // Mailto link
        link: 'mailto:infopromptix@gmail.com',
    },

    // Office Address
    address: {
        // Full address as single string
        full: 'No: PC1C, 2nd Block First Floor, Mogappair West, Ambattur Industrial Estate, Chennai, Tamil Nadu – 600037',

        // Address broken into lines for display
        lines: [
            'No: PC1C, 2nd Block First Floor,',
            'Mogappair West, Ambattur Industrial Estate,',
            'Chennai, Tamil Nadu – 600037'
        ],

        // Individual components
        building: 'No: PC1C, 2nd Block First Floor',
        area: 'Mogappair West, Ambattur Industrial Estate',
        city: 'Chennai',
        state: 'Tamil Nadu',
        pincode: '600037',
        country: 'India',
    },

    // Social Media (for future use)
    social: {
        // Add social media links here when needed
        linkedin: 'https://www.linkedin.com/in/promptix-tech-solutions-9618a63a2/',
        github: 'https://github.com/infopromptix-edtech',
        instagram: 'https://www.instagram.com/promptix_tech?igsh=MWYxOGV0OWh2ZGF2OQ==',
        facebook: 'https://www.facebook.com/profile.php?id=61585508464984',
        // twitter: '',
    },
};

// Helper function to get tel link
export const getTelLink = () => `tel:${CONTACT.phone.raw}`;

// Helper function to get WhatsApp link
export const getWhatsAppLink = () => CONTACT.whatsapp.link;

// Helper function to get email link
export const getEmailLink = () => CONTACT.email.link;

// Export default for convenience
export default CONTACT;
