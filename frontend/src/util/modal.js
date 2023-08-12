import { modalActions } from "../store/reducers/modal";
import { projectFormActions } from "../store/reducers/projectForm";
import { taskFormActions } from "../store/reducers/taskForm";

export function openFormModal(dispatch) {
  dispatch(
    modalActions.toggle({
      modalOpen: true,
      modalType: "form",
    })
  );
}

export function openDetailsModal(dispatch) {
  dispatch(
    modalActions.toggle({
      modalOpen: true,
      modalType: "details",
    })
  );
}

export function closeModal(dispatch, formResetRequired) {
  dispatch(
    modalActions.toggle({
      modalOpen: false,
      modalType: "",
    })
  );
  if (formResetRequired?.required && formResetRequired.for === "project") {
    dispatch(projectFormActions.onReset());
  } else if (formResetRequired?.required && formResetRequired.for === "task") {
    dispatch(taskFormActions.onReset());
  }
}
