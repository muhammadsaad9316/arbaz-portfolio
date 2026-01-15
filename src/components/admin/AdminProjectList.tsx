'use client';

import Link from 'next/link';
import { deleteProject } from '@/actions/projects'; // Ensure this action is compatible with client-side invocation or wrapped
import { Project } from '@/types';
import { useRouter } from 'next/navigation';

export default function AdminProjectList({ initialProjects }: { initialProjects: Project[] }) {
    const router = useRouter();

    async function handleDelete(id: number) {
        if (!confirm('Are you sure you want to delete this project?')) return;

        try {
            await deleteProject(id);
            router.refresh(); // Refresh server component
        } catch (error) {
            alert('Failed to delete project');
        }
    }

    return (
        <div className="space-y-4">
            {initialProjects.map((project) => (
                <div
                    key={project.id}
                    className="bg-white/5 p-6 rounded-lg border border-white/10 flex justify-between items-start"
                >
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
                        <div className="flex gap-4 text-white/60 mb-2">
                            <span className="uppercase text-sm tracking-wider font-medium">{project.category}</span>
                        </div>
                        <p className="text-white/80">{project.description}</p>
                    </div>

                    <div className="flex gap-2 ml-4">
                        <Link href={`/admin/projects/${project.id}/edit`}>
                            <button className="bg-orange-500 px-4 py-2 rounded hover:bg-orange-600 transition-colors">
                                Edit
                            </button>
                        </Link>
                        <button
                            onClick={() => handleDelete(project.id)}
                            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
            {initialProjects.length === 0 && (
                <p className="text-white/40 text-center py-8">No projects found. Add one to get started.</p>
            )}
        </div>
    );
}
