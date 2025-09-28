import { createContext, useEffect, useState } from "react";
import userService from "../services/userService";
import { useAuth } from "./AuthContext.js";
import { useLocation } from "react-router";

const UserNotificationContext = createContext();

export default function UserNotificationProvider({ children }) {
  const path = useLocation();
  const isViewing = path.pathname.startsWith("/notification");
  const [hasNotifications, setHasNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      async function hasNotifications() {
        const hasNotifications = await userService.hasNotifications();
        setHasNotifications(hasNotifications);
      }

      hasNotifications();

      const socket = new WebSocket(
        `${import.meta.env.VITE_WEB_SOCKET_URL}?userId=${user.id}`
      );

      socket.onmessage = async (e) => {
        const data = JSON.parse(e.data);
        if (data.messageType === "notification") {
          if (isViewing) {
            setNotifications((prev) => [data, ...prev]);
            await userService.readNotification(data);
          } else {
            setHasNotifications(true);
          }
        }
      };
    }
  }, [isViewing, notifications, user]);

  return (
    <UserNotificationContext.Provider
      value={{
        hasNotifications,
        setHasNotifications,
        notifications,
        setNotifications,
      }}
    >
      {children}
    </UserNotificationContext.Provider>
  );
}

export { UserNotificationContext };
