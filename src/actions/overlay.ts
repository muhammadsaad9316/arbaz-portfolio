'use server';

import { revalidatePath } from 'next/cache';
import { OverlayContent } from '@/types';
import { prisma } from '@/lib/prisma';

export async function getOverlayContent(): Promise<OverlayContent> {
    const result = await prisma.overlayContent.findFirst();

    if (!result) {
        return {
            introTitle1: 'Hello',
            introTitle2: 'World',
            introRole: 'Developer',
            craftPrefix: 'I craft',
            craftHighlight: 'digital experiences',
            craftSuffix: 'that inspire',
            visionPrefix: 'Building',
            visionHighlight: 'tomorrow',
            visionSuffix: 'today',
        };
    }

    return {
        introTitle1: result.introTitle1,
        introTitle2: result.introTitle2,
        introRole: result.introRole,
        craftPrefix: result.craftPrefix,
        craftHighlight: result.craftHighlight,
        craftSuffix: result.craftSuffix,
        visionPrefix: result.visionPrefix,
        visionHighlight: result.visionHighlight,
        visionSuffix: result.visionSuffix,
    };
}

export async function updateOverlayContent(content: OverlayContent) {
    // We assume there's only one overlay content record.
    // If it exists, update it. If not, create it.
    const existing = await prisma.overlayContent.findFirst();

    let result;
    if (existing) {
        result = await prisma.overlayContent.update({
            where: { id: existing.id },
            data: {
                introTitle1: content.introTitle1,
                introTitle2: content.introTitle2,
                introRole: content.introRole,

                craftPrefix: content.craftPrefix,
                craftHighlight: content.craftHighlight,
                craftSuffix: content.craftSuffix,

                visionPrefix: content.visionPrefix,
                visionHighlight: content.visionHighlight,
                visionSuffix: content.visionSuffix,
            }
        });
    } else {
        result = await prisma.overlayContent.create({
            data: {
                introTitle1: content.introTitle1,
                introTitle2: content.introTitle2,
                introRole: content.introRole,

                craftPrefix: content.craftPrefix,
                craftHighlight: content.craftHighlight,
                craftSuffix: content.craftSuffix,

                visionPrefix: content.visionPrefix,
                visionHighlight: content.visionHighlight,
                visionSuffix: content.visionSuffix,
            }
        });
    }

    revalidatePath('/');

    // Return flat structure
    return {
        introTitle1: result.introTitle1,
        introTitle2: result.introTitle2,
        introRole: result.introRole,
        craftPrefix: result.craftPrefix,
        craftHighlight: result.craftHighlight,
        craftSuffix: result.craftSuffix,
        visionPrefix: result.visionPrefix,
        visionHighlight: result.visionHighlight,
        visionSuffix: result.visionSuffix,
    };
}
