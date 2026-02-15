"use client";

import { HeroConfig } from "@/types";

interface HeroEditorProps {
    data: HeroConfig;
    onChange: (data: HeroConfig) => void;
}

export default function HeroEditor({ data, onChange }: HeroEditorProps) {
    const handleChange = (field: keyof HeroConfig, value: string) => {
        onChange({ ...data, [field]: value });
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Hero Section</h3>
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1 dark:text-gray-300">Tag Line</label>
                    <input
                        type="text"
                        value={data.tag || ""}
                        onChange={(e) => handleChange("tag", e.target.value)}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-gray-300">Title</label>
                        <input
                            type="text"
                            value={data.title || ""}
                            onChange={(e) => handleChange("title", e.target.value)}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-gray-300">Subtitle</label>
                        <input
                            type="text"
                            value={data.subTitle || ""}
                            onChange={(e) => handleChange("subTitle", e.target.value)}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1 dark:text-gray-300">Description</label>
                    <textarea
                        value={data.description || ""}
                        onChange={(e) => handleChange("description", e.target.value)}
                        className="w-full p-2 border rounded h-24 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1 dark:text-gray-300">Scroll Text</label>
                    <input
                        type="text"
                        value={data.scrollText || ""}
                        onChange={(e) => handleChange("scrollText", e.target.value)}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>
            </div>
        </div>
    );
}
