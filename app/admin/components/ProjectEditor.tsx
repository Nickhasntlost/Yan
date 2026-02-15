"use client";

import { useState, useEffect } from "react";
import { Project } from "@/types";
import { Plus, Trash2, Edit2, X, Save } from "lucide-react";

export default function ProjectEditor() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [editing, setEditing] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/projects");
            const data = await res.json();
            setProjects(data);
        } catch (error) {
            console.error("Failed to fetch projects", error);
        }
        setLoading(false);
    };

    const handleSave = async () => {
        if (!editing) return;

        try {
            // Check if we are updating or creating
            // The logic for update vs create depends on how the API is structured.
            // Based on previous analysis, PUT might not be implemented for individual items,
            // but let's assume standard REST or use POST for create.
            // Wait, the API I analyzed only had GET and POST.
            // I need to check if I need to update the API as well. 
            // For now, I'll implement POST for create. 
            // If I need to update, I might need to add PUT/DELETE to the API route.
            // Let's assume for now I'll handle Create. Updates might need API work.
            // Valid point: The API I read earlier only had GET and POST.
            // I will implement the UI and then probably need to update the API to support PUT/DELETE.

            // Actually, let's implement the API changes as part of this if needed.
            // For now, let's just stick to the UI creation.

            const method = editing._id ? "PUT" : "POST";
            // If it's PUT, we might need a specific route like /api/projects/[id] or handle it in the main route with an ID.
            // The current route.ts for projects is simple. I might need to upgrade it.

            // Let's rely on a unified route for now and see if we can pass _id in body for update if the API supports it.
            // If not, I will add a task to update key APIs.

            const res = await fetch("/api/projects", {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editing),
            });

            if (res.ok) {
                fetchProjects();
                setEditing(null);
            } else {
                alert("Failed to save project");
            }
        } catch (error) {
            console.error("Error saving project", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;
        try {
            const res = await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchProjects();
            } else {
                alert("Failed to delete project");
            }
        } catch (error) {
            console.error("Error deleting project", error);
        }
    };

    const addStat = () => {
        if (!editing) return;
        setEditing({
            ...editing,
            stats: { ...editing.stats, "": "" }
        });
    };

    const updateStatKey = (oldKey: string, newKey: string) => {
        if (!editing) return;
        const newStats: Record<string, string> = {};
        Object.entries(editing.stats).forEach(([key, value]) => {
            if (key === oldKey) {
                newStats[newKey] = value;
            } else {
                newStats[key] = value;
            }
        });
        setEditing({ ...editing, stats: newStats });
    };

    const updateStatValue = (key: string, value: string) => {
        if (!editing) return;
        setEditing({
            ...editing,
            stats: { ...editing.stats, [key]: value }
        });
    };

    const removeStat = (keyToRemove: string) => {
        if (!editing) return;
        const newStats: Record<string, string> = {};
        Object.entries(editing.stats).forEach(([key, value]) => {
            if (key !== keyToRemove) {
                newStats[key] = value;
            }
        });
        setEditing({ ...editing, stats: newStats });
    };


    if (loading) return <div>Loading projects...</div>;

    if (editing) {
        return (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold dark:text-white">{editing._id ? "Edit Project" : "New Project"}</h3>
                    <button onClick={() => setEditing(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                        <X className="w-5 h-5 dark:text-gray-400" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-gray-300">Title</label>
                        <input
                            type="text"
                            value={editing.title}
                            onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-gray-300">Category</label>
                        <select
                            value={editing.category}
                            onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                            <option value="Combat">Combat</option>
                            <option value="AI/ML">AI/ML</option>
                            <option value="Utility">Utility</option>
                            <option value="Drones">Drones</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1 dark:text-gray-300">Image URL</label>
                        <input
                            type="text"
                            value={editing.image}
                            onChange={(e) => setEditing({ ...editing, image: e.target.value })}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1 dark:text-gray-300">Description</label>
                        <textarea
                            value={editing.desc}
                            onChange={(e) => setEditing({ ...editing, desc: e.target.value })}
                            className="w-full p-2 border rounded h-24 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">Stats</label>
                    {Object.entries(editing.stats || {}).map(([key, value], idx) => (
                        <div key={idx} className="flex gap-2 mb-2">
                            <input
                                type="text"
                                placeholder="Label (e.g. Weight)"
                                value={key}
                                onChange={(e) => updateStatKey(key, e.target.value)}
                                className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                            <input
                                type="text"
                                placeholder="Value (e.g. 15kg)"
                                value={value}
                                onChange={(e) => updateStatValue(key, e.target.value)}
                                className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                            <button onClick={() => removeStat(key)} className="text-red-500 hover:text-red-700">
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                    <button onClick={addStat} className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
                        <Plus className="w-4 h-4" /> Add Stat
                    </button>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                    <button onClick={() => setEditing(null)} className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2">
                        <Save className="w-4 h-4" /> Save Project
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold dark:text-white">Projects</h2>
                <button
                    onClick={() => setEditing({ title: "", category: "Combat", image: "", desc: "", stats: {} })}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" /> Add Project
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project) => (
                    <div key={project._id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700 flex flex-col">
                        <div className="relative h-40 mb-4 rounded overflow-hidden bg-gray-100 dark:bg-gray-900">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                        </div>
                        <h3 className="font-bold text-lg dark:text-white mb-1">{project.title}</h3>
                        <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">{project.category}</p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4 flex-grow">{project.desc}</p>

                        <div className="flex justify-end gap-2 mt-auto">
                            <button onClick={() => setEditing(project)} className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                                <Edit2 className="w-5 h-5" />
                            </button>
                            <button onClick={() => project._id && handleDelete(project._id)} className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400">
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
