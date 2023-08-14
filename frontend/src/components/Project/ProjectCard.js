import { Link } from "react-router-dom";
import { splitNameIntoLines } from "util/form";
import { formatDate } from "util/display";
import { Card } from "flowbite-react";
import ProjectDeleteIcon from "components/Project/ProjectDeleteIcon";
import ProjectEditIcon from "components/Project/ProjectEditIcon";

export default function ProjectCard({
  projectId,
  projectName,
  projectDateUpdated,
}) {
  const formattedName = splitNameIntoLines(projectName);
  const formattedDate = formatDate(
    projectDateUpdated,
    true // show time
  );

  return (
    <Link className="cursor-default" to={"/dashboard/" + projectId}>
      <Card className="hover:opacity-70 w-60 h-52">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white w-48 mb-auto mt-2.5">
          {formattedName}
        </h5>
        <div className="mt-auto mb-2.5">
          <p className="font-normal text-gray-700 dark:text-gray-400 text-sm">
            <i>Last updated: {formattedDate}</i>
          </p>
          <div className="flex mt-2">
            <ProjectDeleteIcon projectId={projectId} />
            <ProjectEditIcon projectId={projectId} projectName={projectName} />
          </div>
        </div>
      </Card>
    </Link>
  );
}
