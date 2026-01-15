'use server';

import { revalidatePath } from 'next/cache';
import { ProjectSchema, ProjectInput } from '@/types';
import { prisma } from '@/lib/prisma';

export async function getProjects() {
    try {
        return await prisma.project.findMany({
            orderBy: { id: 'asc' }
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
}

export async function addProject(input: ProjectInput) {
    // Validate input
    const result = ProjectSchema.safeParse(input);
    if (!result.success) {
        throw new Error(result.error.issues[0].message);
    }

    const newProject = await prisma.project.create({
        data: result.data
    });

    revalidatePath('/');
    return newProject;
}

export async function updateProject(id: number, input: Partial<ProjectInput>) {
    // Validate partial input
    const result = ProjectSchema.partial().safeParse(input);
    if (!result.success) {
        throw new Error(result.error.issues[0].message);
    }

    // Check if project exists
    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) throw new Error('Project not found');

    const updatedProject = await prisma.project.update({
        where: { id },
        data: result.data
    });

    revalidatePath('/');
    return updatedProject;
}

export async function deleteProject(id: number) {
    await prisma.project.delete({
        where: { id }
    });
    revalidatePath('/');
}
