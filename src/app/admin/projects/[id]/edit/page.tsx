import { getProjects } from '@/actions/projects';
import { notFound } from 'next/navigation';
import EditProjectForm from '../../EditProjectForm';

export const dynamic = 'force-dynamic';

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const projectId = parseInt(id);
    const projects = await getProjects();
    const project = projects.find(p => p.id === projectId);

    if (!project) {
        notFound();
    }

    const initialData = {
        title: project.title,
        category: project.category,
        description: project.description,
        color: project.color
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Edit Project</h1>
            <EditProjectForm projectId={projectId} initialData={initialData} />
        </div>
    );
}
