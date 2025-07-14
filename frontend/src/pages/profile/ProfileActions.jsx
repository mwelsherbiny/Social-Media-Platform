import userService from "../../services/userService";
import { UseNotification } from "../../contexts/NotificationContext";

export default function ProfileActions({ userId }) {
  const { setTimedNotification } = UseNotification();

  async function follow() {
    try {
      await userService.followUser(userId);
    } catch (error) {
      setTimedNotification({
        text: error.data?.response?.error || "Error fetching data",
        type: "error",
      });
    }
  }

  return (
    <div className="flex flex-row gap-2">
      <button className="bg-blue-500 text-white rounded-md px-4 py-1 font-semibold cursor-pointer">
        Follow
      </button>
      <button className="bg-gray-200 text-black rounded-md px-4 py-1 font-semibold cursor-pointer">
        Message
      </button>
    </div>
  );
}
