import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="flex justify-start w-full">
      <p className="mt-16 ml-8 text-lg">
        <br />
        Sorry, we couldn't find that page. Try going back to JDTodo's{" "}
        <Link to="/" className="text-blue-600">
          home page
        </Link>
        .
      </p>
    </div>
  );
}
