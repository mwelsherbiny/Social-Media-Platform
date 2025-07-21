import { Outlet } from "react-router";
import NavBar from "@/components/Nav/NavBar";

export default function MainLayout() {
  return (
    <div className="flex flex row h-screen">
      <NavBar />
      <div className="ml-16 w-full">
        <Outlet />
      </div>
    </div>
  );
}
