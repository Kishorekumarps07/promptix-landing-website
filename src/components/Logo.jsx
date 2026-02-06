import React from 'react';
// Clean build trigger for Vercel deployment fix

const Logo = ({ className = '', size = 'default' }) => {
    const heights = {
        small: 'h-20',      // Increased from h-14
        default: 'h-28',    // Increased from h-20
        large: 'h-40',      // Increased from h-32
    };

    return (
        <div className={`flex items-center ${className}`}>
            <img
                src="/promptix-logo-new.png"
                alt="PromptiX - Tech Solutions & Digital Marketing Logo"
                className={`${heights[size]} w-auto object-contain transition-all duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:drop-shadow-[0_0_20px_rgba(249,115,22,0.3)]`}
            />
        </div>
    );
};

export default Logo;
