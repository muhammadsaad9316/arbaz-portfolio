import Link from 'next/link';
import { getProjects } from '@/actions/projects';
import AdminProjectList from '@/components/admin/AdminProjectList';

export const dynamic = 'force-dynamic'; // Ensure latest data

export default async function AdminDashboard() {
    const projects = await getProjects();

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold">Admin Dashboard</h1>
                <div className="flex gap-3">
                    <Link href="/admin/overlay">
                        <button className="bg-orange-500 px-6 py-2 rounded hover:bg-orange-600 font-medium transition-colors">
                            Edit Hero Section
                        </button>
                    </Link>
                    <Link href="/admin/projects/new">
                        <button className="bg-green-500 px-6 py-2 rounded hover:bg-green-600 font-medium transition-colors">
                            Add New Project
                        </button>
                    </Link>
                </div>
            </div>

            <AdminProjectList initialProjects={projects} />
        </div>
    );
}
