"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("/api/admin/login", {
            method: "POST",
            body: JSON.stringify({ password }),
        });

        if (res.ok) {
            router.push("/admin");
        } else {
            setError("Invalid password");
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
            <form onSubmit={handleLogin} className="p-8 bg-white dark:bg-gray-800 rounded shadow-md w-96">
                <h1 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">Admin Login</h1>
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    className="w-full p-2 border rounded mb-4 text-black bg-gray-50 border-gray-300"
                />
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 font-medium">
                    Login
                </button>
            </form>
        </div>
    );
}
