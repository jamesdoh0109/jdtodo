import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TaskOverdueWarningIcon() {
  return <FontAwesomeIcon icon={faExclamationCircle} className="w-4 mr-2" />;
}
