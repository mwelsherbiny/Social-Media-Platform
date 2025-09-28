import userNotificationTypes from "../constants/userNotificationTypes";

export default function getNotificationMessage(notification) {
  switch (notification.type) {
    case userNotificationTypes.POST_LIKE:
      return `Liked your post`;
    case userNotificationTypes.POST_COMMENT:
      return `commented your post`;
    case userNotificationTypes.FOLLOW:
      return `started following you`;
  }
}
