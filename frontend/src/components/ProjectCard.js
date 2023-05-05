import Router from 'next/router';

export default function ProjectCard({ id, name, dateCreated, userid}) {
  function toProject() {
    Router.push(`/projects/${id}`)
  }

  return (
    <li className="flex flex-row cursor-pointer" onClick={toProject}>
      <div className="select-none hover:bg-gray-50 flex flex-1 items-center p-4">
        <div className="text-left flex-1 pl-1">
          <div className="font-medium dark:text-white">{name}</div>
        </div>
        <div className="text-right flex flex-row justify-center">
          <div className="text-gray-600 dark:text-gray-200 text-xs">{`Created ${dateCreated}`}</div>
        </div>
      </div>
    </li>
  )
}