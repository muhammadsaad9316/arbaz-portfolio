'use server';

import { prisma } from '@/lib/prisma';

export async function getExperience() {
    try {
        return await prisma.experience.findMany({
            orderBy: { year: 'desc' }
        });
    } catch (error) {
        console.error('Error fetching experience:', error);
        return [];
    }
}
