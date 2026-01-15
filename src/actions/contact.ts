'use server';

import { prisma } from '@/lib/prisma';

export async function getContact() {
    try {
        const contact = await prisma.contact.findFirst();
        return contact || {
            heading: "Get In Touch",
            text: "Let's work together",
            email: "hello@example.com",
            socials: []
        };
    } catch (error) {
        console.error('Error fetching contact:', error);
        return {
            heading: "Get In Touch",
            text: "Let's work together",
            email: "hello@example.com",
            socials: []
        };
    }
}
