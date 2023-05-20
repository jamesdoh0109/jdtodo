export default function Message({ errorMsg, successMsg }) {
  if (errorMsg) {
    return (
      <div
        className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 text-left mb-6"
        role="alert"
      >
        {errorMsg}
      </div>
    );
  }
  if (successMsg) {
    return (
      <div
        className="bg-teal-100 border-t-4 border-teal-500 text-teal-900 p-4 text-left mb-6"
        role="alert"
      >
        {successMsg}
      </div>
    );
  }
}
