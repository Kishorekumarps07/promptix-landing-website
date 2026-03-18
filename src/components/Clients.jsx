import React from 'react';

const clients = [
    { name: 'Mr. Coach', logo: '/images/clients/mr-coach.png' },
    { name: 'VIP Catering', logo: '/images/clients/vip-catering.png' },
    { name: 'Eagle Eye', logo: '/images/clients/eagle-eye.png' },
];

const Clients = () => {
    // Duplicate for seamless single-strip scroll (scroll -50% = one full set)
    const allClients = [...clients, ...clients];

    return (
        <section className="bg-navy-950 py-10 md:py-14 border-y border-white/5 relative overflow-hidden">
            {/* Heading */}
            <p className="text-gray-500 font-medium uppercase tracking-[0.2em] text-xs text-center mb-8">
                Trusted by Industry Leaders
            </p>

            {/* Marquee wrapper */}
            <div className="relative overflow-hidden pause-on-hover">
                {/* Single strip — duplicated content to fill seamlessly */}
                <div className="animate-marquee flex items-center gap-10">
                    {allClients.map((client, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 bg-white/10 border border-white/10 rounded-xl px-6 py-3 hover:bg-white/20 hover:border-orange-500/30 transition-all duration-300 cursor-pointer"
                        >
                            <img
                                src={client.logo}
                                alt={client.name}
                                className="h-10 md:h-12 w-auto object-contain"
                            />
                        </div>
                    ))}
                </div>

                {/* Fade edges */}
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#121821] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#121821] to-transparent z-10 pointer-events-none" />
            </div>
        </section>
    );
};

export default Clients;
