import { Metadata } from "next";
import { getProjects } from "@/lib/mdx";
import { generateSEO } from "@/lib/seo";
import { ProjectCard } from "@/components/project-card";
import { Section, SectionHeader } from "@/components/section";

export const metadata: Metadata = generateSEO({
  title: "Projects",
  description: "A showcase of my recent work and case studies",
  url: "/projects",
});

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="pt-24">
      <Section>
        <SectionHeader
          title="Projects"
          description="A showcase of my recent work and case studies"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              title={project.title}
              description={project.description}
              image={project.image}
              tags={project.tags}
              href={`/projects/${project.slug}`}
            />
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12 text-muted">
            No projects found. Check back soon!
          </div>
        )}
      </Section>
    </div>
  );
}

