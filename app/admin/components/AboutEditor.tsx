"use client";

export default function AboutEditor({ data, onChange }: { data: any; onChange: (data: any) => void }) {
    const handleHeroChange = (field: string, value: string) => {
        onChange({
            ...data,
            hero: { ...data.hero, [field]: value }
        });
    };

    const handleMissionChange = (field: string, value: string) => {
        onChange({
            ...data,
            mission: { ...data.mission, [field]: value }
        });
    };

    return (
        <div className="space-y-6">
            {/* Hero Section */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-4 dark:text-white">Hero Section</h3>
                <div className="grid gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-gray-300">Tag</label>
                        <input type="text" value={data.hero?.tag || ""} onChange={(e) => handleHeroChange("tag", e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-gray-300">Title</label>
                        <input type="text" value={data.hero?.title || ""} onChange={(e) => handleHeroChange("title", e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-gray-300">Subtitle</label>
                        <input type="text" value={data.hero?.subTitle || ""} onChange={(e) => handleHeroChange("subTitle", e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-gray-300">Description</label>
                        <textarea value={data.hero?.description || ""} onChange={(e) => handleHeroChange("description", e.target.value)} className="w-full p-2 border rounded h-24 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    </div>
                </div>
            </div>

            {/* Mission Section */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-4 dark:text-white">Mission Section</h3>
                <div className="grid gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-gray-300">Title</label>
                        <input type="text" value={data.mission?.title || ""} onChange={(e) => handleMissionChange("title", e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-gray-300">Content</label>
                        <textarea value={data.mission?.content || ""} onChange={(e) => handleMissionChange("content", e.target.value)} className="w-full p-2 border rounded h-24 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                    </div>
                </div>
            </div>
        </div>
    );
}
