import { Outlet } from "react-router";
import LoggedOutNav from "../components/LoggedOutNav";

export default function LoggedOutLayout() {
  return (
    <>
      <LoggedOutNav />
      <Outlet />
    </>
  );
}
