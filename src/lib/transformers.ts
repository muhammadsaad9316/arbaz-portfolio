import { CardStackItem } from "@/components/ui/card-stack";

// Using explicit types for DB models helps document the expected shape coming from the database/API.
// Ideally these would be generated from Prisma, but defining them here bridge the gap for now.

export interface ProjectDBModel {
    id: number | string;
    title: string;
    description?: string;
    imageUrl?: string | null;
    [key: string]: any; // Allow other properties to exist without breaking the contract
}

export interface ExpertiseDBModel {
    id: number;
    category: string;
    items: string[];
    [key: string]: any;
}

export interface ExpertiseUIModel {
    id: string;
    title: string;
    tags: string[];
}

/**
 * Transforms a raw Project DB object into a UI-ready CardStackItem.
 * Defaults null images to empty string as expected by certain components, 
 * or handles other display logic.
 */
export function transformProjectToCardItem(project: ProjectDBModel): CardStackItem {
    return {
        id: project.id,
        title: project.title,
        description: project.description || "",
        imageSrc: project.imageUrl || "",
    };
}

/**
 * Transforms an Expertise DB object into the specific UI format required by the Expertise section.
 * Handles the "01", "02" ID formatting logic.
 */
export function transformExpertiseToItem(item: ExpertiseDBModel, index: number): ExpertiseUIModel {
    return {
        id: `0${index + 1}`,
        title: item.category,
        tags: item.items,
    };
}
