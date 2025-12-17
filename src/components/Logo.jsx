import React from 'react';

const Logo = ({ className = '', size = 'default' }) => {
    const heights = {
        small: 'h-6',
        default: 'h-10',
        large: 'h-14',
    };

    return (
        <div className={`flex items-center ${className}`}>
            <img
                src="/promptix-logo-final.png"
                alt="PromptiX Logo"
                className={`${heights[size]} w-auto object-contain`}
            />
        </div>
    );
};

export default Logo;
