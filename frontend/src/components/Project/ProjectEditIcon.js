import { useDispatch } from "react-redux";
import { projectFormActions } from "../../store/reducers/projectForm";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { openFormModal } from "../../util/modal";

export default function ProjectEditIcon({ projectId, projectName }) {
  const dispatch = useDispatch();

  const openEditProjectModal = () => {
    dispatch(
      projectFormActions.onEdit({
        itemToBeEdited: { id: projectId, name: projectName },
      })
    );
    openFormModal(dispatch);
  };

  return (
    <FontAwesomeIcon
      icon={faEdit}
      className="cursor-pointer w-4"
      onClick={(e) => {
        e.preventDefault();
        openEditProjectModal();
      }}
    />
  );
}
