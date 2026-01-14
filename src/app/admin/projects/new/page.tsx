'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addProject } from '@/actions/projects';
import ProjectForm from '@/components/admin/ProjectForm';

export default function NewProjectPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (data: any) => {
        setLoading(true);
        try {
            await addProject(data);
            alert('Project added successfully!');
            router.push('/admin');
            router.refresh();
        } catch (error: any) {
            alert(error.message || 'Error adding project');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Add New Project</h1>
            <ProjectForm
                onSubmit={handleSubmit}
                submitLabel="Add Project"
                isSubmitting={loading}
            />
        </div>
    );
}
