import { useContext, useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { UserNotificationContext } from "../contexts/UserNotificationContext";

export default function SocialNotificationIcon() {
  const { hasNotifications, setHasNotifications } = useContext(
    UserNotificationContext
  );

  return (
    <div
      className="relative"
      onClick={() => {
        setHasNotifications(false);
      }}
    >
      <IoMdNotificationsOutline />
      {hasNotifications ? (
        <div className="bg-red-500 rounded-full size-[14px] absolute right-0 top-0 border-white border-2"></div>
      ) : null}
    </div>
  );
}
