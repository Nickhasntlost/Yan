"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("/api/admin/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
        });

        if (res.ok) {
            router.push("/admin");
        } else {
            setError("Invalid credentials");
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
            <form onSubmit={handleLogin} className="p-8 bg-white dark:bg-gray-800 rounded shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Admin Login</h1>
                {error && <p className="text-red-500 mb-4 text-center text-sm bg-red-50 p-2 rounded border border-red-200">{error}</p>}

                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter Username"
                        className="w-full p-2 border rounded text-black bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        className="w-full p-2 border rounded text-black bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 font-bold transition-colors">
                    Login
                </button>
            </form>
        </div>
    );
}
