import { Outlet } from "react-router";
import NavBar from "@/components/Nav/NavBar";

export default function MainLayout() {
  return (
    <div className="flex">
      <NavBar />
      <div className="pb-16 sm:pb-0 sm:ml-16 w-full">
        <Outlet />
      </div>
    </div>
  );
}
