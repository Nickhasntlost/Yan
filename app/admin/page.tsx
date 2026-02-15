export default function AdminDashboard() {
    return (
        <div className="max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Welcome, Admin</h1>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <p className="text-lg text-gray-700 dark:text-gray-300">
                    Select a section from the sidebar to manage website content.
                </p>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a href="/admin/config" className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 transition-colors group">
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-500">Site Configuration</h3>
                        <p className="text-gray-500 dark:text-gray-400">Edit homepage hero section, titles, and valid descriptions.</p>
                    </a>

                    <a href="/admin/projects" className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 transition-colors group">
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-500">Projects</h3>
                        <p className="text-gray-500 dark:text-gray-400">Manage Portfolio and Lab Projects.</p>
                    </a>

                    <a href="/admin/team" className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 transition-colors group">
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-500">Core Team</h3>
                        <p className="text-gray-500 dark:text-gray-400">Manage team members, roles, and profiles.</p>
                    </a>
                </div>
            </div>
        </div>
    );
}
