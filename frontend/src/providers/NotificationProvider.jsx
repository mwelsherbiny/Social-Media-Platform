import { useState } from "react";
import { NotificationContext } from "../contexts/NotificationContext";
import { v4 as uuidv4 } from "uuid";

const maxNotifications = 20;

export default function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const setTimedNotification = (notification, time = 5000) => {
    if (notifications.length < maxNotifications) {
      notification.id = uuidv4();
      setNotifications((notifications) => [...notifications, notification]);
      setTimeout(() => {
        setNotifications((notifications) =>
          notifications.filter((n) => n.id != notification.id)
        );
      }, time);
    }
  };

  const deleteNotification = (id) => {
    setNotifications((notifications) =>
      notifications.filter((n) => n.id != id)
    );
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setTimedNotification,
        deleteNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
