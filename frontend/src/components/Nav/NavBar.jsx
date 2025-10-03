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
import SocialNotificationIcon from "../SocialNotificationIcon.jsx";

import { useLocation } from "react-router-dom";

export default function NavBar() {
  const { user } = useAuth();
  const location = useLocation();

  const currentPath = location.pathname;

  return (
    <div className="flex flex-col h-12 justify-center bg-white fixed bottom-0 w-screen sm:flex-row sm:left-0 sm:top-0 sm:w-fit sm:h-screen">
      <NavIconProvider>
        <div className="flex flex-row my-2 mx-2 w-full justify-center sm:justify-start sm:flex-col sm:my-8 sm:mx-4 items-center gap-8 sm:gap-4">
          <NavItem itemName="home" path="/">
            {currentPath === "/" ? <GoHomeFill /> : <GoHome />}
          </NavItem>

          <NavItem itemName="search" path="/search">
            {currentPath.startsWith("/search") ? (
              <IoSearchSharp />
            ) : (
              <IoSearchOutline />
            )}
          </NavItem>

          <NavItem itemName="notification" path="/notification">
            {currentPath.startsWith("/notification") ? (
              <IoMdNotifications />
            ) : (
              <SocialNotificationIcon />
            )}
          </NavItem>

          <NavItem itemName="create" path="/create">
            {currentPath.startsWith("/create") ? (
              <MdAddBox />
            ) : (
              <MdOutlineAddBox />
            )}
          </NavItem>

          <NavItem itemName="profile" path={`/profile/${user.username}`}>
            {currentPath.startsWith(`/profile/${user.username}`) ? (
              <ProfileIcon src={user.profile_picture_url} />
            ) : (
              <ProfileIcon src={user.profile_picture_url} />
            )}
          </NavItem>
        </div>
      </NavIconProvider>
      <div className="bg-gray-300 w-[1px]"></div>
    </div>
  );
}
