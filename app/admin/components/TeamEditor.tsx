"use client";

import { useState, useEffect } from "react";
import { TeamMember } from "@/types";
import { Plus, Trash2, Edit2, X, Save } from "lucide-react";

export default function TeamEditor() {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [editing, setEditing] = useState<TeamMember | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/core-team");
            const data = await res.json();
            setMembers(data);
        } catch (error) {
            console.error("Failed to fetch team members", error);
        }
        setLoading(false);
    };

    const handleSave = async () => {
        if (!editing) return;

        try {
            const method = editing._id ? "PUT" : "POST";
            // Note: API for CoreTeam might need update to support PUT if not already there, 
            // but we follow same pattern as projects for now.
            // Actually, core-team route has DELETE (all) but not specific DELETE or PUT.
            // I will probably need to update the route handlers later. 
            // For now, I'll build the UI assuming the API exists or will be fixed.

            const res = await fetch("/api/core-team", {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editing),
            });

            if (res.ok) {
                fetchMembers();
                setEditing(null);
            } else {
                alert("Failed to save team member");
            }
        } catch (error) {
            console.error("Error saving team member", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this member?")) return;
        try {
            const res = await fetch(`/api/core-team?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchMembers();
            } else {
                alert("Failed to delete team member");
            }
        } catch (error) {
            console.error("Error deleting team member", error);
        }
    };

    if (loading) return <div>Loading team members...</div>;

    if (editing) {
        return (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-4 mt-8">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold dark:text-white">{editing._id ? "Edit Team Member" : "New Team Member"}</h3>
                    <button onClick={() => setEditing(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                        <X className="w-5 h-5 dark:text-gray-400" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-gray-300">Name</label>
                        <input
                            type="text"
                            value={editing.name}
                            onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-gray-300">Role</label>
                        <input
                            type="text"
                            value={editing.role}
                            onChange={(e) => setEditing({ ...editing, role: e.target.value })}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-gray-300">Department</label>
                        <input
                            type="text"
                            value={editing.department}
                            onChange={(e) => setEditing({ ...editing, department: e.target.value })}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-gray-300">Order Priority</label>
                        <input
                            type="number"
                            value={editing.roleOrder}
                            onChange={(e) => setEditing({ ...editing, roleOrder: parseInt(e.target.value) || 0 })}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
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
                        <label className="block text-sm font-medium mb-1 dark:text-gray-300">Bio</label>
                        <textarea
                            value={editing.bio}
                            onChange={(e) => setEditing({ ...editing, bio: e.target.value })}
                            className="w-full p-2 border rounded h-24 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h4 className="font-medium mb-2 dark:text-gray-300">Stats</h4>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs mb-1 dark:text-gray-400">Experience</label>
                            <input
                                type="text"
                                value={editing.stats.exp}
                                onChange={(e) => setEditing({ ...editing, stats: { ...editing.stats, exp: e.target.value } })}
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-xs mb-1 dark:text-gray-400">Projects</label>
                            <input
                                type="text"
                                value={editing.stats.projects}
                                onChange={(e) => setEditing({ ...editing, stats: { ...editing.stats, projects: e.target.value } })}
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-xs mb-1 dark:text-gray-400">Awards</label>
                            <input
                                type="text"
                                value={editing.stats.awards}
                                onChange={(e) => setEditing({ ...editing, stats: { ...editing.stats, awards: e.target.value } })}
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h4 className="font-medium mb-2 dark:text-gray-300">Socials</h4>
                    <div className="grid grid-cols-1 gap-2">
                        <div>
                            <label className="block text-xs mb-1 dark:text-gray-400">LinkedIn</label>
                            <input
                                type="text"
                                value={editing.socials.linkedin || ""}
                                onChange={(e) => setEditing({ ...editing, socials: { ...editing.socials, linkedin: e.target.value } })}
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-xs mb-1 dark:text-gray-400">GitHub</label>
                            <input
                                type="text"
                                value={editing.socials.github || ""}
                                onChange={(e) => setEditing({ ...editing, socials: { ...editing.socials, github: e.target.value } })}
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-xs mb-1 dark:text-gray-400">Email</label>
                            <input
                                type="text"
                                value={editing.socials.mail || ""}
                                onChange={(e) => setEditing({ ...editing, socials: { ...editing.socials, mail: e.target.value } })}
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                    <button onClick={() => setEditing(null)} className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2">
                        <Save className="w-4 h-4" /> Save Team Member
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 mt-12">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold dark:text-white">Core Team</h2>
                <button
                    onClick={() => setEditing({
                        name: "", role: "", roleOrder: 99, department: "", image: "", bio: "",
                        socials: { linkedin: "", github: "", mail: "" },
                        stats: { exp: "1", projects: "5", awards: "0" }
                    })}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" /> Add Member
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {members.map((member) => (
                    <div key={member._id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700 flex flex-col">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg dark:text-white">{member.name}</h3>
                                <p className="text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wide">{member.role}</p>
                            </div>
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4 flex-grow">{member.bio}</p>

                        <div className="flex justify-between items-center mt-auto border-t border-gray-100 dark:border-gray-700 pt-2">
                            <span className="text-xs text-gray-400">Order: {member.roleOrder}</span>
                            <div className="flex gap-2">
                                <button onClick={() => setEditing(member)} className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button onClick={() => member._id && handleDelete(member._id)} className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
