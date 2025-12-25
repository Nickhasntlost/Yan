'use client';

import { useState } from 'react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f5f3f0] border-b border-gray-200">
                <div className="max-w-[1400px] mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="navbar-logo">
                            <a
                                href="#"
                                className="text-xl font-medium tracking-tight text-gray-900 hover:opacity-70 transition-opacity"
                            >
                                LUSION
                            </a>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 ml-auto">
                            {/* Brand Icon */}
                            <button
                                className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white hover:scale-110 transition-transform shadow-sm"
                                aria-label="Brand Icon"
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M4 12c2.5-3 5.5-3 8 0s5.5 3 8 0" />
                                </svg>
                            </button>

                            {/* Let's Talk Button */}
                            <button className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all hover:scale-105">
                                <span className="text-[11px] font-medium tracking-wide">LET&apos;S TALK</span>
                                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                            </button>

                            {/* Menu Button */}
                            <button
                                onClick={toggleMenu}
                                className="flex items-center gap-2 px-5 py-2.5 bg-transparent hover:bg-gray-200 rounded-full transition-colors"
                                aria-label="Toggle menu"
                            >
                                <span className="text-[11px] font-medium tracking-wide">MENU</span>
                                <div className="flex gap-0.5">
                                    <span className="w-1.5 h-1.5 bg-gray-900 rounded-full"></span>
                                    <span className="w-1.5 h-1.5 bg-gray-900 rounded-full"></span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Menu Overlay */}
            <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
}
