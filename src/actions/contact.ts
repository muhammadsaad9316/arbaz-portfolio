'use server';

import { prisma } from '@/lib/prisma';

export async function getContact() {
    const contact = await prisma.contact.findFirst();
    return contact || {
        heading: "Let's Create Together",
        text: "Have a project in mind?",
        email: "hello@example.com",
        socials: []
    };
}
