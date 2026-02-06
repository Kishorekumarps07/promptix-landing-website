const Logo = ({ className = '', size = 'default' }) => {
    // Standard sizes if no specific className is provided
    const sizeClasses = {
        small: 'h-8',
        default: 'h-10 md:h-12',
        large: 'h-24 md:h-32', // Significantly large for Footer
    };

    const containerHeight = className.includes('h-') ? '' : sizeClasses[size];

    return (
        <div className={`flex items-center ${containerHeight} ${className}`}>
            <img
                src="/promptix-logo-final.png"
                alt="PromptiX - Tech Solutions & Digital Marketing Logo"
                className="h-full w-auto object-contain transition-all duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:drop-shadow-[0_0_20px_rgba(249,115,22,0.3)]"
            />
        </div>
    );
};

export default Logo;
