import { MdOutlineNotificationsActive } from "react-icons/md";

export default function EmptyNotificationList() {
  return (
    <div className="flex items-center w-full p-8 mt-8 flex-col gap-2">
      <MdOutlineNotificationsActive size={"50px"} />
      <div>Recent Activity</div>
      <div className="text-center">
        When someone likes or comments on one of your posts, you'll see it here.
      </div>
    </div>
  );
}
