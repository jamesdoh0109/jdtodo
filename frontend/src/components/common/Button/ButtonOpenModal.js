import { useDispatch, useSelector } from "react-redux";
import { taskFormActions } from "../../../store/reducers/taskForm";
import { dropdownActions } from "../../../store/reducers/dropdown";
import { openFormModal } from "../../../util/modal";
import ButtonOnClick from "./ButtonOnClick";

export default function ButtonOpenModal({ btnTxt, modalFor }) {
  const taskToBeShown = useSelector((state) => state.taskDetail.itemToBeShown);

  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(
      modalFor === "task" && btnTxt === "Edit"
        ? dispatch(
            taskFormActions.onEdit({
              itemToBeEdited: {
                id: taskToBeShown.id,
                name: taskToBeShown.name,
                deadline: taskToBeShown.deadline,
                description: taskToBeShown.description,
                status: taskToBeShown.status,
              },
            })
          )
        : dispatch(
            dropdownActions.toggleDropdown({
              dropdownId: -1,
            })
          )
    );
    openFormModal(dispatch);
  };

  return btnTxt !== "Edit" ? (
    <div className="l-lg-h:mt-32 l-md-h:mt-24 l-sm-h:mt-16">
      <ButtonOnClick text={btnTxt} onClick={openModal} />
    </div>
  ) : (
    <ButtonOnClick text={btnTxt} onClick={openModal} />
  );
}
