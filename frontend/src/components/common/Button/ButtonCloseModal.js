import { useDispatch } from "react-redux";
import { closeModal } from "util/modal";
import ButtonOnClick from "components/common/Button/ButtonOnClick";

export default function ButtonCloseModal({ disabled, formResetRequired, color }) {
  const dispatch = useDispatch();

  return (
    <ButtonOnClick
      text="Close"
      onClick={() => closeModal(dispatch, formResetRequired)}
      disabled={disabled}
      color={color}
    />
  );
}