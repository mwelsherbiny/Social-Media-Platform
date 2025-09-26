import { useState } from "react";
import NavItem from "./NavItem.jsx";
import { NavIconProvider } from "@/contexts/NavIconContext.jsx";
import ProfileIcon from "@/pages/profile/ProfileIcon.jsx";
import { GoHome } from "react-icons/go";
import { GoHomeFill } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";
import { MdOutlineAddBox } from "react-icons/md";
import { MdAddBox } from "react-icons/md";
import { useAuth } from "../../contexts/AuthContext";

export default function NavBar() {
  let { user } = useAuth();
  let [activeItem, setActiveItem] = useState("home");

  return (
    <div className="flex flex-row fixed left-0 top-0 w-17 h-screen ">
      <NavIconProvider>
        <div className="flex flex-col my-8 mx-4 items-center gap-5">
          <NavItem itemName="home" path="/" setActiveItem={setActiveItem}>
            {activeItem === "home" ? <GoHomeFill /> : <GoHome />}
          </NavItem>
          <NavItem
            itemName="search"
            path="/search"
            setActiveItem={setActiveItem}
          >
            {activeItem === "search" ? <IoSearchSharp /> : <IoSearchOutline />}
          </NavItem>
          <NavItem
            itemName="notification"
            path="/notification"
            setActiveItem={setActiveItem}
          >
            {activeItem === "notification" ? (
              <IoMdNotifications />
            ) : (
              <IoMdNotificationsOutline />
            )}
          </NavItem>
          {/* <NavItem
            itemName="messages"
            path="/messages"
            setActiveItem={setActiveItem}
          >
            {activeItem === "messages" ? (
              <IoPaperPlane />
            ) : (
              <IoPaperPlaneOutline />
            )}
          </NavItem> */}
          <NavItem
            itemName="create"
            setActiveItem={setActiveItem}
            path={"/create"}
          >
            {activeItem === "create" ? <MdAddBox /> : <MdOutlineAddBox />}
          </NavItem>
          <NavItem
            itemName="profile"
            path={`/profile/${user.username}`}
            setActiveItem={setActiveItem}
          >
            <ProfileIcon />
          </NavItem>
        </div>
      </NavIconProvider>
      <div className="bg-gray-300 w-[1px]"></div>
    </div>
  );
}
