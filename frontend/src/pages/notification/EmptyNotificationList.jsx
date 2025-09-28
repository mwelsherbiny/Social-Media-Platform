import { MdOutlineNotificationsActive } from "react-icons/md";

export default function EmptyNotificationList() {
  return (
    <div className="flex items-center w-full mt-8 flex-col gap-2">
      <MdOutlineNotificationsActive size={"50px"} />
      <div>Recent Activity</div>
      <div>
        When someone likes or comments on one of your posts, you'll see it here.
      </div>
    </div>
  );
}
