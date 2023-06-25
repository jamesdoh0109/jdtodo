import { Spinner } from "flowbite-react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Spinner aria-label="Default status example" />
    </div>
  );
}
