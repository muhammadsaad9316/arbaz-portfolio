'use server';

import { prisma } from '@/lib/prisma';

export async function getSkills() {
    try {
        return await prisma.skill.findMany({
            orderBy: { category: 'asc' }
        });
    } catch (error) {
        console.error('Error fetching skills:', error);
        return [];
    }
}
