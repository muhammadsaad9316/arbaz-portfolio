import ProjectsClient from "./ProjectsClient";
import { ProjectDBModel, transformProjectToCardItem } from "@/lib/transformers";

interface ProjectsProps {
    data: ProjectDBModel[];
}

export default function Projects({ data }: ProjectsProps) {
    const projects = data || [];
    const items = projects.map(transformProjectToCardItem);

    return (
        <section className="relative z-20 bg-[#121212] py-32 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                {/* Title animation needs to be client side. Pass it to client or make a client wrapper for title?
                    I will move the WHOLE render to ProjectsClient to keep animations working effortlessly.
                */}
                <ProjectsClient items={items} />
            </div>
        </section>
    );
}
