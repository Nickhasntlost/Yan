"use client";

import { useState, useEffect } from "react";
import { LabProject } from "@/types";
import { Plus, Trash2, Edit2, X, Save } from "lucide-react";

export default function LabProjectEditor() {
    const [projects, setProjects] = useState<LabProject[]>([]);
    const [editing, setEditing] = useState<LabProject | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/lab-projects");
            const data = await res.json();
            setProjects(data);
        } catch (error) {
            console.error("Failed to fetch lab projects", error);
        }
        setLoading(false);
    };

    const handleSave = async () => {
        if (!editing) return;

        try {
            const method = editing._id ? "PUT" : "POST";
            const res = await fetch("/api/lab-projects", {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editing),
            });

            if (res.ok) {
                fetchProjects();
                setEditing(null);
            } else {
                alert("Failed to save lab project");
            }
        } catch (error) {
            console.error("Error saving lab project", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this lab project?")) return;
        try {
            const res = await fetch(`/api/lab-projects?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchProjects();
            } else {
                alert("Failed to delete lab project");
            }
        } catch (error) {
            console.error("Error deleting lab project", error);
        }
    };

    const handleTagsChange = (value: string) => {
        if (!editing) return;
        setEditing({
            ...editing,
            tags: value.split(",").map(t => t.trim()).filter(t => t)
        });
    };

    if (loading) return <div>Loading lab projects...</div>;

    if (editing) {
        return (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-4 mt-8">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold dark:text-white">{editing._id ? "Edit Lab Project" : "New Lab Project"}</h3>
                    <button onClick={() => setEditing(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                        <X className="w-5 h-5 dark:text-gray-400" />
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-4">
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
                        <label className="block text-sm font-medium mb-1 dark:text-gray-300">Image URL</label>
                        <input
                            type="text"
                            value={editing.image}
                            onChange={(e) => setEditing({ ...editing, image: e.target.value })}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-gray-300">Description</label>
                        <textarea
                            value={editing.desc}
                            onChange={(e) => setEditing({ ...editing, desc: e.target.value })}
                            className="w-full p-2 border rounded h-24 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-gray-300">Tags (comma separated)</label>
                        <input
                            type="text"
                            value={editing.tags.join(", ")}
                            onChange={(e) => handleTagsChange(e.target.value)}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                    <button onClick={() => setEditing(null)} className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2">
                        <Save className="w-4 h-4" /> Save Lab Project
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 mt-12">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold dark:text-white">Lab Projects</h2>
                <button
                    onClick={() => setEditing({ title: "", tags: [], image: "", desc: "" })}
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" /> Add Lab Project
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project) => (
                    <div key={project._id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700 flex flex-col">
                        <div className="relative h-40 mb-4 rounded overflow-hidden bg-gray-100 dark:bg-gray-900">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-70" />
                        </div>
                        <h3 className="font-bold text-lg dark:text-white mb-1">{project.title}</h3>
                        <div className="flex flex-wrap gap-1 mb-2">
                            {project.tags.map(tag => (
                                <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-gray-600 dark:text-gray-300">{tag}</span>
                            ))}
                        </div>
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
