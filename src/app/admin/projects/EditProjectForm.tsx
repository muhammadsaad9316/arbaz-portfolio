'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateProject } from '@/actions/projects';
import ProjectForm from '@/components/admin/ProjectForm';

export default function EditProjectForm({ projectId, initialData }: { projectId: number, initialData: any }) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (data: any) => {
        setSaving(true);
        try {
            await updateProject(projectId, data);
            alert('Project updated successfully!');
            router.push('/admin');
            router.refresh();
        } catch (error: any) {
            alert(error.message || 'Error updating project');
        } finally {
            setSaving(false);
        }
    };

    return (
        <ProjectForm
            initialData={initialData}
            onSubmit={handleSubmit}
            submitLabel="Save Changes"
            isSubmitting={saving}
        />
    );
}
