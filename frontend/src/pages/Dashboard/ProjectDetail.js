import { useParams } from "react-router-dom";

export default function ProjectDetail() {
  const id = useParams().projectId;

  return (
    <div className="mt-12">
      Project {id}
    </div>
  )
}