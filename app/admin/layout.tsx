"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    if (pathname === "/admin/login") {
        return children;
    }

    const handleLogout = async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
    };

    const navItems = [
        { name: "Dashboard", href: "/admin" },
        { name: "Home Page", href: "/admin/home" },
        { name: "About Page", href: "/admin/about" },
        { name: "Projects Page", href: "/admin/projects" },
        { name: "Team Page", href: "/admin/team" },
        { name: "Contact Page", href: "/admin/contact" },
    ];

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 flex flex-col">
                <h2 className="text-xl font-bold mb-6 px-2">Admin Panel</h2>
                <nav className="space-y-1 flex-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`block px-3 py-2 rounded-md transition-colors ${pathname === item.href
                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200"
                                : "hover:bg-gray-100 dark:hover:bg-gray-700/50"
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 rounded-md text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </aside>
            <main className="flex-1 p-8 overflow-auto">{children}</main>
        </div>
    );
}
