'use server';

import { prisma } from '@/lib/prisma';

export async function getContact() {
    return await prisma.contact.findFirst();
}
