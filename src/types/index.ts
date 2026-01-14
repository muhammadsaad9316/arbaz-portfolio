import { z } from 'zod';

// Validation Schemas
export const ProjectSchema = z.object({
    title: z.string().min(1, "Title is required"),
    category: z.string().min(1, "Category is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    color: z.string().startsWith("from-", "Invalid color format"),
    imageUrl: z.string().url("Must be a valid URL").nullable().optional().or(z.literal(""))
});

export type ProjectInput = z.infer<typeof ProjectSchema>;

export interface Project extends ProjectInput {
    id: number;
}

export interface OverlayContent {
    intro: {
        titleLine1: string;
        titleLine2: string;
        role: string;
    };
    craft: {
        textPrefix: string;
        highlight: string;
        textSuffix: string;
    };
    vision: {
        textPrefix: string;
        highlight: string;
        textSuffix: string;
    };
}
