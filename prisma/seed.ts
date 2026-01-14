const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    console.log('Starting migration...')

    try {
        // Clear existing data
        await prisma.project.deleteMany()
        await prisma.overlayContent.deleteMany()
        await prisma.about.deleteMany()
        await prisma.skill.deleteMany()
        await prisma.experience.deleteMany()
        await prisma.contact.deleteMany()

        // Seed Projects (Reality-Based from Projects.tsx)
        console.log('Seeding projects...')
        await prisma.project.createMany({
            data: [
                {
                    title: "Luxury Performance",
                    category: "WebGL Experience",
                    description: "Experience the thrill of precision engineering",
                    imageUrl: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2672&auto=format&fit=crop",
                    color: "from-pink-500 to-violet-500"
                },
                {
                    title: "Elegant Design",
                    category: "Design System",
                    description: "Where beauty meets functionality",
                    imageUrl: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2670&auto=format&fit=crop",
                    color: "from-cyan-500 to-blue-500"
                },
                {
                    title: "Power & Speed",
                    category: "Interactive",
                    description: "Unleash the true potential of the road",
                    imageUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2898&auto=format&fit=crop",
                    color: "from-amber-500 to-orange-500"
                },
                {
                    title: "Timeless Craftsmanship",
                    category: "Branding",
                    description: "Built with passion, driven by excellence",
                    imageUrl: "https://images.unsplash.com/photo-1583121274602-3e284029fac1?q=80&w=2670&auto=format&fit=crop",
                    color: "from-emerald-500 to-teal-500"
                },
                {
                    title: "Future of Mobility",
                    category: "R&D",
                    description: "Innovation that moves you forward",
                    imageUrl: "https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2670&auto=format&fit=crop",
                    color: "from-indigo-500 to-purple-500"
                }
            ]
        })

        // Seed Overlay Content
        console.log('Seeding overlay content...')
        await prisma.overlayContent.create({
            data: {
                introTitle1: "ARBAZ",
                introTitle2: "SHAH",
                introRole: "Senior Creative Developer",
                craftPrefix: "Constructing ",
                craftHighlight: "digital reality",
                craftSuffix: "from code.",
                visionPrefix: "Bridging the gap between",
                visionHighlight: "design",
                visionSuffix: "& engineering."
            }
        })

        console.log('Seeding about...')
        await prisma.about.create({
            data: {
                heading: "About Me",
                text: "I am a Senior Creative Developer with a passion for building immersive digital experiences. My journey began with a curiosity for how things work on the web, evolving into a career where I blend technical expertise with artistic vision. I specialize in high-performance interactve web applications.",
                stats: [
                    { label: "Years Experience", value: "5+" },
                    { label: "Projects Completed", value: "40+" },
                    { label: "Awards Won", value: "3" }
                ]
            }
        })

        console.log('Seeding skills...')
        const skills = [
            {
                category: "Frontend",
                items: ["React", "Next.js", "TypeScript", "TailwindCSS", "Framer Motion", "Three.js", "WebGL"]
            },
            {
                category: "Backend",
                items: ["Node.js", "PostgreSQL", "Prisma", "Python", "GraphQL", "Serverless"]
            },
            {
                category: "Design",
                items: ["Figma", "Blender", "Adobe Suite", "UI/UX Principles", "Motion Design"]
            }
        ]

        for (const skill of skills) {
            await prisma.skill.create({ data: skill })
        }

        console.log('Seeding experience...')
        const experiences = [
            {
                year: "2024",
                role: "Senior Creative Developer",
                company: "Tech Innovators Inc.",
                description: "Leading the frontend team in building next-gen web applications using 3D technologies."
            },
            {
                year: "2022",
                role: "Frontend Developer",
                company: "Digital Agency",
                description: "Developed award-winning marketing sites for Fortune 500 clients."
            },
            {
                year: "2020",
                role: "Junior Developer",
                company: "StartUp Lab",
                description: "Collaborated on rapid prototyping and MVP development for various startups."
            }
        ]

        for (const exp of experiences) {
            await prisma.experience.create({ data: exp })
        }

        console.log('Seeding contact...')
        await prisma.contact.create({
            data: {
                heading: "Let's Create Together",
                text: "I'm always open to new opportunities and collaborations. Whether you have a question or just want to say hi, I'll try my best to get back to you!",
                email: "hello@arbazshah.dev",
                socials: [
                    { name: "GitHub", url: "https://github.com", icon: "github" },
                    { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
                    { name: "Twitter", url: "https://twitter.com", icon: "twitter" }
                ]
            }
        })

        console.log('Migration completed successfully.')
    } catch (error) {
        console.error('Error migrating data:', error)
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
