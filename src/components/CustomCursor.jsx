import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [isHovered, setIsHovered] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };

        const handleMouseEnter = () => setIsHovered(true);
        const handleMouseLeave = () => setIsHovered(false);

        window.addEventListener('mousemove', moveCursor);

        // Add listeners for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        // MutationObserver to attach listeners to new elements
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    const newInteractiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
                    newInteractiveElements.forEach(el => {
                        el.removeEventListener('mouseenter', handleMouseEnter); // Prevent duplicates
                        el.removeEventListener('mouseleave', handleMouseLeave);
                        el.addEventListener('mouseenter', handleMouseEnter);
                        el.addEventListener('mouseleave', handleMouseLeave);
                    });
                }
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
            observer.disconnect();
        };
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-orange-500 pointer-events-none z-[9999] hidden md:block mix-blend-difference"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
            }}
            animate={{
                scale: isHovered ? 2.5 : 1,
                opacity: 1,
                backgroundColor: isHovered ? 'rgba(249, 115, 22, 0.2)' : 'transparent',
            }}
            transition={{
                scale: { duration: 0.2 },
                opacity: { duration: 0.2 },
            }}
        />
    );
};

export default CustomCursor;
