'use server';

import { prisma } from '@/lib/prisma';

export async function getSkills() {
    return await prisma.skill.findMany({
        orderBy: { id: 'asc' }
    });
}
