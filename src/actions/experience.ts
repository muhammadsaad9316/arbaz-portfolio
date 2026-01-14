'use server';

import { prisma } from '@/lib/prisma';

export async function getExperience() {
    return await prisma.experience.findMany({
        orderBy: { id: 'desc' } // Newest first
    });
}
