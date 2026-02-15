"use client";

import HeroEditor from "./HeroEditor";

export default function HomeEditor({ data, onChange }: { data: any; onChange: (d: any) => void }) {
    const handleArrayChange = (field: string, index: number, value: any) => {
        const newArray = [...(data[field] || [])];
        newArray[index] = value;
        onChange({ ...data, [field]: newArray });
    };

    const addArrayItem = (field: string) => {
        onChange({ ...data, [field]: [...(data[field] || []), ""] });
    };

    const removeArrayItem = (field: string, index: number) => {
        const newArray = [...(data[field] || [])];
        newArray.splice(index, 1);
        onChange({ ...data, [field]: newArray });
    };

    return (
        <div className="space-y-8">
            <HeroEditor
                data={data.hero || {}}
                onChange={(newHero) => onChange({ ...data, hero: newHero })}
            />

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Sponsors</h3>
                {data.sponsors?.map((sponsor: string, index: number) => (
                    <div key={index} className="flex gap-2 mb-2">
                        <input
                            type="text"
                            value={sponsor}
                            onChange={(e) => handleArrayChange("sponsors", index, e.target.value)}
                            className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                        <button onClick={() => removeArrayItem("sponsors", index)} className="text-red-500 hover:text-red-700">Remove</button>
                    </div>
                ))}
                <button onClick={() => addArrayItem("sponsors")} className="mt-2 text-blue-600 hover:text-blue-800">+ Add Sponsor</button>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Events</h3>
                <div className="space-y-4">
                    {data.events?.map((event: any, index: number) => (
                        <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded relative">
                            <button onClick={() => removeArrayItem("events", index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">Remove</button>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                <div>
                                    <label className="block text-xs mb-1 dark:text-gray-400">Title</label>
                                    <input
                                        type="text"
                                        value={event.title}
                                        onChange={(e) => {
                                            const newEvents = [...(data.events || [])];
                                            newEvents[index] = { ...event, title: e.target.value };
                                            onChange({ ...data, events: newEvents });
                                        }}
                                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs mb-1 dark:text-gray-400">Date</label>
                                    <input
                                        type="text"
                                        value={event.date}
                                        onChange={(e) => {
                                            const newEvents = [...(data.events || [])];
                                            newEvents[index] = { ...event, date: e.target.value };
                                            onChange({ ...data, events: newEvents });
                                        }}
                                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs mb-1 dark:text-gray-400">Type</label>
                                    <input
                                        type="text"
                                        value={event.type}
                                        onChange={(e) => {
                                            const newEvents = [...(data.events || [])];
                                            newEvents[index] = { ...event, type: e.target.value };
                                            onChange({ ...data, events: newEvents });
                                        }}
                                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={() => onChange({ ...data, events: [...(data.events || []), { title: "New Event", date: "01 / 01", type: "Type" }] })}
                        className="text-blue-600 hover:text-blue-800"
                    >
                        + Add Event
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Testimonials</h3>
                <div className="space-y-4">
                    {data.testimonials?.map((item: any, index: number) => (
                        <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded relative">
                            <button onClick={() => removeArrayItem("testimonials", index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">Remove</button>
                            <div className="grid grid-cols-1 gap-2">
                                <div>
                                    <label className="block text-xs mb-1 dark:text-gray-400">Quote</label>
                                    <textarea
                                        value={item.quote}
                                        onChange={(e) => {
                                            const newItems = [...(data.testimonials || [])];
                                            newItems[index] = { ...item, quote: e.target.value };
                                            onChange({ ...data, testimonials: newItems });
                                        }}
                                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="block text-xs mb-1 dark:text-gray-400">Name</label>
                                        <input
                                            type="text"
                                            value={item.name}
                                            onChange={(e) => {
                                                const newItems = [...(data.testimonials || [])];
                                                newItems[index] = { ...item, name: e.target.value };
                                                onChange({ ...data, testimonials: newItems });
                                            }}
                                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs mb-1 dark:text-gray-400">Role</label>
                                        <input
                                            type="text"
                                            value={item.role}
                                            onChange={(e) => {
                                                const newItems = [...(data.testimonials || [])];
                                                newItems[index] = { ...item, role: e.target.value };
                                                onChange({ ...data, testimonials: newItems });
                                            }}
                                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={() => onChange({ ...data, testimonials: [...(data.testimonials || []), { quote: "Amazing experience.", name: "John Doe", role: "Member" }] })}
                        className="text-blue-600 hover:text-blue-800"
                    >
                        + Add Testimonial
                    </button>
                </div>
            </div>

        </div >
    );
}
