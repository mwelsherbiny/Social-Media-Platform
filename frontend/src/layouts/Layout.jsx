import { Outlet } from "react-router";
import Notification from "../components/Notification";

export default function Layout() {
  return (
    <>
      <Notification />
      <Outlet />
    </>
  );
}
