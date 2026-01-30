'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="relative bg-[#f5f3f0] dark:bg-black py-20 px-6 md:px-12 overflow-hidden border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <div className="max-w-[1400px] mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                    {/* Brand Column */}
                    <div className="md:col-span-2">
                        <h2 className="text-2xl font-bold tracking-tight mb-6 dark:text-white">YANTRIKA</h2>
                        <p className="max-w-md text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                            We are a student-led robotics club at VCET, dedicated to pushing the boundaries of innovation and engineering.
                            From autonomous systems to combat robotics, we build the future.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider mb-6 text-gray-400 dark:text-gray-500">Menu</h3>
                        <ul className="space-y-4">
                            {[
                                { name: 'Home', href: '/' },
                                { name: 'About Us', href: '/about' },
                                { name: 'Projects', href: '/projects' },
                                { name: 'Team', href: '/team' },
                                { name: 'Contact', href: '/contact' }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm font-medium">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Socials */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider mb-6 text-gray-400 dark:text-gray-500">Connect</h3>
                        <ul className="space-y-4">
                            {[
                                { name: 'Instagram', url: 'https://www.instagram.com/vcet_yantrika/' },
                                { name: 'LinkedIn', url: 'https://www.linkedin.com/in/yantrika-vcet-484068291/' },
                                { name: 'GitHub', url: 'https://github.com/yantrika' }
                            ].map((item) => (
                                <li key={item.name}>
                                    <a href={item.url} target={['Instagram', 'LinkedIn', 'GitHub'].includes(item.name) ? "_blank" : "_self"} rel={['Instagram', 'LinkedIn', 'GitHub'].includes(item.name) ? "noopener noreferrer" : ""} className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm font-medium flex items-center gap-2">
                                        {item.name}
                                        <span className="text-xs">↗</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Big Footer Text */}
                <div className="border-t border-gray-200 dark:border-gray-800 pt-12 flex flex-col items-center">
                    <h1 className="text-[12vw] leading-none font-bold tracking-tighter text-gray-200 dark:text-white/10 select-none pointer-events-none">
                        YANTRIKA
                    </h1>
                </div>

                {/* Copyright */}
                <div className="flex flex-col md:flex-row justify-between items-center mt-8 text-xs text-gray-500 dark:text-gray-500 font-mono">
                    <p>© {new Date().getFullYear()} VCET Robotics Club. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
