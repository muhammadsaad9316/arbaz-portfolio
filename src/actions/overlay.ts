'use server';

import { revalidatePath } from 'next/cache';
import { OverlayContent } from '@/types';
import { prisma } from '@/lib/prisma';

export async function getOverlayContent(): Promise<OverlayContent> {
    const result = await prisma.overlayContent.findFirst();

    if (!result) {
        return {
            intro: { titleLine1: '', titleLine2: '', role: '' },
            craft: { textPrefix: '', highlight: '', textSuffix: '' },
            vision: { textPrefix: '', highlight: '', textSuffix: '' },
        };
    }

    return {
        intro: {
            titleLine1: result.introTitle1,
            titleLine2: result.introTitle2,
            role: result.introRole
        },
        craft: {
            textPrefix: result.craftPrefix,
            highlight: result.craftHighlight,
            textSuffix: result.craftSuffix
        },
        vision: {
            textPrefix: result.visionPrefix,
            highlight: result.visionHighlight,
            textSuffix: result.visionSuffix
        }
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
                introTitle1: content.intro.titleLine1,
                introTitle2: content.intro.titleLine2,
                introRole: content.intro.role,

                craftPrefix: content.craft.textPrefix,
                craftHighlight: content.craft.highlight,
                craftSuffix: content.craft.textSuffix,

                visionPrefix: content.vision.textPrefix,
                visionHighlight: content.vision.highlight,
                visionSuffix: content.vision.textSuffix,
            }
        });
    } else {
        result = await prisma.overlayContent.create({
            data: {
                introTitle1: content.intro.titleLine1,
                introTitle2: content.intro.titleLine2,
                introRole: content.intro.role,

                craftPrefix: content.craft.textPrefix,
                craftHighlight: content.craft.highlight,
                craftSuffix: content.craft.textSuffix,

                visionPrefix: content.vision.textPrefix,
                visionHighlight: content.vision.highlight,
                visionSuffix: content.vision.textSuffix,
            }
        });
    }

    revalidatePath('/');

    // Map back to the structured object expected by the frontend
    return {
        intro: {
            titleLine1: result.introTitle1,
            titleLine2: result.introTitle2,
            role: result.introRole
        },
        craft: {
            textPrefix: result.craftPrefix,
            highlight: result.craftHighlight,
            textSuffix: result.craftSuffix
        },
        vision: {
            textPrefix: result.visionPrefix,
            highlight: result.visionHighlight,
            textSuffix: result.visionSuffix
        }
    };
}
