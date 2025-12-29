import React from 'react';
// Clean build trigger for Vercel deployment fix

const Logo = ({ className = '', size = 'default' }) => {
    const heights = {
        small: 'h-10',      // Increased from h-8
        default: 'h-16',    // Increased from h-12
        large: 'h-24',      // Increased from h-20
    };

    return (
        <div className={`flex items-center ${className}`}>
            <img
                src="/promptix-logo-v2.png"
                alt="PromptiX - AI, Tech & Digital Marketing Agency Logo"
                className={`${heights[size]} w-auto object-contain transition-all duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:drop-shadow-[0_0_20px_rgba(249,115,22,0.3)]`}
            />
        </div>
    );
};

export default Logo;
