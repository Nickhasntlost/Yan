"use client";

import { useState, useEffect } from "react";
import AboutEditor from "@/app/admin/components/AboutEditor";

export default function AdminAboutPage() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetch("/api/site-config")
            .then((res) => res.json())
            .then((resData) => {
                setData(resData || { about: {} });
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch("/api/site-config", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (res.ok) alert("Saved successfully!");
            else alert("Failed to save.");
        } catch {
            alert("Error saving.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold dark:text-white">Edit About Page</h1>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </div>

            <AboutEditor
                data={data.about || {}}
                onChange={(newData) => setData({ ...data, about: newData })}
            />
        </div>
    );
}
