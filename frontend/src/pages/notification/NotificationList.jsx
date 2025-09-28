import getTimeElapsedString from "../../util/getTimeElapsed";
import ProfileIcon from "../profile/ProfileIcon";
import getNotificationMessage from "../../util/getNotificationMessage";
import { Link } from "react-router";
import userNotificationTypes from "../../constants/userNotificationTypes";

export default function NotificationList({ notifications }) {
  function getNotifcationPath(notification) {
    switch (notification.type) {
      case userNotificationTypes.POST_COMMENT:
      case userNotificationTypes.POST_LIKE:
        return `/post/${notification.post_id}`;
      case userNotificationTypes.FOLLOW:
        return `/profile/${notification.actor_username}`;
    }
  }

  const notificationsEls = notifications.map((notification) => {
    return (
      <Link to={getNotifcationPath(notification)} key={notification.id}>
        <li className="flex flex-row w-full p-6 hover:bg-gray-200 items-center justify-between">
          <div className="flex flex-row items-center gap-8">
            <ProfileIcon
              src={notification.actor_profile_picture_url}
              size={"3rem"}
            />
            <div className="flex flex-col justify-center">
              <p className="text-lg">{notification.actor_username}</p>
              <p>{getNotificationMessage(notification)}</p>
            </div>
          </div>
          <div>
            <p className="text-gray-400 mb-8">
              {getTimeElapsedString(new Date(notification.created_at))}
            </p>
          </div>
        </li>
      </Link>
    );
  });

  return <ul>{[...notificationsEls]}</ul>;
}
