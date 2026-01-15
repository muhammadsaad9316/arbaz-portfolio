'use server';

import { prisma } from '@/lib/prisma';

export async function getAbout() {
    try {
        const about = await prisma.about.findFirst();
        return about || {
            heading: "About Me",
            text: "I am a passionate developer...",
            stats: [
                { label: "Years Experience", value: "5+" },
                { label: "Projects", value: "40+" },
                { label: "Clients", value: "20+" }
            ]
        };
    } catch (error) {
        console.error('Error fetching about:', error);
        // Return fallback data on error
        return {
            heading: "About Me",
            text: "I am a passionate developer...",
            stats: [
                { label: "Years Experience", value: "5+" },
                { label: "Projects", value: "40+" },
                { label: "Clients", value: "20+" }
            ]
        };
    }
}
