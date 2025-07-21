import { Outlet } from "react-router";
import LoggedOutNav from "../components/Nav/LoggedOutNav";

export default function LoggedOutLayout() {
  return (
    <>
      <LoggedOutNav />
      <Outlet />
    </>
  );
}
