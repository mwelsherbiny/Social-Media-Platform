import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center px-4">
      <h1 className="text-3xl font-bold mb-4">
        Sorry, this page isn't available.
      </h1>
      <p className="text-lg">
        Go back to{" "}
        <Link to="/" className="text-blue-600 underline">
          Instaclone
        </Link>
      </p>
    </div>
  );
}
