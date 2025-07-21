import { Link } from "react-router-dom";
import HLine from "@/components/HLine";

export default function FormFooter({ children }) {
  return (
    <div className="w-full bottom-2 text-center">
      <HLine />
      {children}
    </div>
  );
}
