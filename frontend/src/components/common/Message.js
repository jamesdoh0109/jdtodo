import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faWarning } from "@fortawesome/free-solid-svg-icons";

export default function Message({ messageObj }) {
  const message = messageObj.message;
  const isError = messageObj.error;

  if (isError) {
    return (
      <div className="flex">
        <FontAwesomeIcon
          icon={faWarning}
          className="cursor-pointer w-3 mr-1"
          style={{ color: "#dc2626" }}
        />
        <div className="text-red-600 text-xs text-left">{message}</div>
      </div>
    );
  }
  if (message) {
    return (
      <div className="flex">
        <FontAwesomeIcon
          icon={faCheck}
          className="cursor-pointer w-3 mr-1"
          style={{ color: "16a349" }}
        />
        <div className="text-green-600 text-xs text-left">{message}</div>
      </div>
    );
  }
}
