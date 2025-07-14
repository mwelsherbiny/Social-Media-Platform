import { UseNotification } from "../contexts/NotificationContext";
import notificationTypes from "../constants/notificationTypes";

export default function Notification() {
  const { notifications, deleteNotification } = UseNotification();

  if (notifications.length === 0) return null;

  const notificationElements = notifications.map((notification) => {
    let backgroundColor;
    switch (notification.type) {
      case notificationTypes.error:
        backgroundColor = "#dc2626";
        break;
      case notificationTypes.warning:
        backgroundColor = "#eab308";
        break;
      case notificationTypes.success:
        backgroundColor = "#16a34a";
        break;
      case notificationTypes.info:
        backgroundColor = "#2563eb";
        break;
      default:
        backgroundColor = "#1f2937";
    }

    return (
      <div
        className="fixed top-8 left-1/2 -translate-x-1/2 flex justify-between py-2 px-4 rounded-md text-white shadow-md flex items-center w-1/2"
        style={{ backgroundColor }}
        key={notification.id}
      >
        {notification.text}
        <button
          className="cursor-pointer text-xl"
          onClick={() => deleteNotification(notification.id)}
        >
          x
        </button>
      </div>
    );
  });

  return notificationElements;
}
