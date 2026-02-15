"use client";

import { useState, useEffect } from "react";
import HomeEditor from "@/app/admin/components/HomeEditor";

export default function AdminHomePage() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetch("/api/site-config")
            .then((res) => res.json())
            .then((resData) => {
                setData(resData || { home: {} });
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
            // Only send the home part updated, but API expects full config usually or merges.
            // Our API merges with strict: false if we send partial? 
            // The API implementation I saw: 
            // const config = await SiteConfig.findOneAndUpdate({}, data, { new: true, upsert: true, setDefaultsOnInsert: true });
            // So if I send { home: ... }, it might overwrite other fields if not careful, or if data only contains home.
            // Wait, findOneAndUpdate with just { home: ... } will REPLACE the document config if not using $set? 
            // Mongoose findOneAndUpdate with an object as update will replace if not using operators, UNLESS it's a Mongoose document save.
            // BUT, `findOneAndUpdate({}, data)` where data is `{ home: ... }` will likely replace the whole doc or set specific fields?
            // Actually, if `data` is `{ home: ... }`, it might unset other fields if not using $set.
            // Let's verify the API route `app/api/site-config/route.ts`.

            // To be safe, I should fetch full config, update home, send full config back.
            // OR update the API to handle partial updates (PATCH).
            // For now, I will assume I need to handle the data merging on client or rely on API. 
            // Let's re-read API.

            // Step 105: `const config = await SiteConfig.findOneAndUpdate({}, data, { new: true, upsert: true, setDefaultsOnInsert: true });`
            // If data is `{ home: ... }` and doesn't have `about`, `about` might be lost if Mongoose replaces?
            // No, Mongoose `findOneAndUpdate` with a POJO update object usually implies `$set` for top level keys if not specified? 
            // NO, `findOneAndUpdate(query, update)` -> if update is `{ name: 'foo' }`, it replaces? 
            // Actually standard MongoDB behavior is replacement. Mongoose might cast it to $set? 
            // To be 100% safe without changing API right now, I should ensure I have the full data object or use $set in API.

            // I'll update the API to be safer later. For now, I'll fetch FULL config, and just pass sub-prop to editor, but save FULL config.
            // The `data` state here should probably be the FULL config.

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
                <h1 className="text-3xl font-bold dark:text-white">Edit Home Page</h1>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </div>

            <HomeEditor
                data={data.home || {}}
                onChange={(newData) => setData({ ...data, home: newData })}
            />
        </div>
    );
}
