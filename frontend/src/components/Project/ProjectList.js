import { sortById } from "util/display";
import ProjectCard from "components/Project/ProjectCard";

export default function ProjectList({ projects }) {
  if (projects.length > 0) {
    return (
      <ul className="w-full grid pt-4 pb-12 gap-y-7 pl-xl:grid-cols-g-xl pl-lg:grid-cols-g-lg pl-md:grid-cols-g-md pl-sm:grid-cols-g-sm pl-xs:grid-cols-g-xs justify-start">
        {sortById(projects).map((project) => (
          <li key={project.id} className="mr-8">
            <ProjectCard
              projectId={project.id}
              projectName={project.name}
              projectDateUpdated={project.dateUpdated}
            />
          </li>
        ))}
      </ul>
    );
  } else {
    return <p className="mt-4">You currently don't have any projects.</p>;
  }
}
