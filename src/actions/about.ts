'use server';

import { prisma } from '@/lib/prisma';

export async function getAbout() {
    return await prisma.about.findFirst();
}
