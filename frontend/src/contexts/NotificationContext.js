import { useContext, createContext } from "react";

export const NotificationContext = createContext();
export const UseNotification = () => useContext(NotificationContext);
