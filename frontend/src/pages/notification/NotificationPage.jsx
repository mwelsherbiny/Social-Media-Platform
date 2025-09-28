import { useContext, useEffect, useState } from "react";
import userService from "../../services/userService";
import EmptyNotificationList from "./EmptyNotificationList";
import NotificationList from "./NotificationList";
import { UserNotificationContext } from "../../contexts/UserNotificationContext";

export default function NotificationPage() {
  const { notifications, setNotifications } = useContext(
    UserNotificationContext
  );

  useEffect(() => {
    async function getNotifications() {
      const notifications = await userService.getNotifications();
      setNotifications(notifications);
    }

    getNotifications();
  }, [setNotifications]);

  if (notifications.length === 0) {
    return <EmptyNotificationList />;
  }

  return <NotificationList notifications={notifications} />;
}
