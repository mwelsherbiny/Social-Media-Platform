import { Link } from "react-router-dom";

export default function FormFooter({ children }) {
  return (
    <div className="w-full bottom-2 text-center">
      <hr className="w-full my-4 border-gray-300"></hr>
      {children}
    </div>
  );
}
