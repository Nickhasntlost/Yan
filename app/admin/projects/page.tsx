"use client";

import { useState, useEffect } from "react";
import ProjectEditor from "@/app/admin/components/ProjectEditor";
import LabProjectEditor from "@/app/admin/components/LabProjectEditor";
import HeroEditor from "@/app/admin/components/HeroEditor";

export default function ProjectsAdminPage() {
    const [activeTab, setActiveTab] = useState("projects");
    const [config, setConfig] = useState<any>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetch("/api/site-config")
            .then((res) => res.json())
            .then((resData) => {
                setConfig(resData || { projects: { hero: {} } });
            });
    }, []);

    const handleSaveConfig = async () => {
        setSaving(true);
        try {
            const res = await fetch("/api/site-config", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(config),
            });
            if (res.ok) alert("Page settings saved!");
            else alert("Failed to save.");
        } catch {
            alert("Error saving.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8">
            <h1 className="text-3xl font-bold mb-8 dark:text-white">Manage Projects Page</h1>

            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8">
                <button
                    onClick={() => setActiveTab("projects")}
                    className={`px-6 py-3 font-medium capitalize transition-colors ${activeTab === "projects"
                        ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400"
                        : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        }`}
                >
                    Projects List
                </button>
                <button
                    onClick={() => setActiveTab("lab")}
                    className={`px-6 py-3 font-medium capitalize transition-colors ${activeTab === "lab"
                        ? "border-b-2 border-purple-600 text-purple-600 dark:text-purple-400"
                        : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        }`}
                >
                    Lab Projects
                </button>
                <button
                    onClick={() => setActiveTab("settings")}
                    className={`px-6 py-3 font-medium capitalize transition-colors ${activeTab === "settings"
                        ? "border-b-2 border-green-600 text-green-600 dark:text-green-400"
                        : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        }`}
                >
                    Page Settings
                </button>
            </div>

            {activeTab === "projects" && <ProjectEditor />}
            {activeTab === "lab" && <LabProjectEditor />}
            {activeTab === "settings" && config && (
                <div>
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={handleSaveConfig}
                            disabled={saving}
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                        >
                            {saving ? "Saving..." : "Save Settings"}
                        </button>
                    </div>
                    <HeroEditor
                        data={config.projects?.hero || {}}
                        onChange={(newHero) => setConfig({ ...config, projects: { ...config.projects, hero: newHero } })}
                    />
                </div>
            )}
        </div>
    );
}
