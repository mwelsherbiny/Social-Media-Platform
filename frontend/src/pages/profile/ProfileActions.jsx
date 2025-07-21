import userService from "../../services/userService";
import { UseNotification } from "../../contexts/NotificationContext";
import { useState, useEffect } from "react";
import ActionsSkeleton from "../../components/Skeletons/ActionsSkeleton";
import safeFetch from "../../util/safeFetch";
import followService from "../../services/followService";

export default function ProfileActions({ userId, setFollowersCount }) {
  const { setTimedNotification } = UseNotification();
  const [isFollowing, setIsFollowing] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const isFollowing = await userService.isFollowing(userId);

      setIsFollowing(isFollowing);
    }

    safeFetch(fetchData, (error) =>
      setTimedNotification({
        text: error.message || "Error during loading profile actions",
        type: "error",
      })
    );
  }, [setTimedNotification, userId]);

  const isLoading = !(typeof isFollowing === "boolean");
  const buttonStyle = isFollowing
    ? {
        backgroundColor: "#E5E7EB",
        color: "black",
      }
    : {
        backgroundColor: "#3B82F6",
        color: "white",
      };

  async function follow() {
    try {
      await followService.followUser(userId);

      setIsFollowing(true);
      setFollowersCount((prev) => prev + 1);
    } catch (error) {
      setTimedNotification({
        text: error.data?.response?.error || "Error during following",
        type: "error",
      });
    }
  }

  async function unfollow() {
    try {
      await followService.unfollowUser(userId);

      setIsFollowing(false);
      setFollowersCount((prev) => prev - 1);
    } catch (error) {
      setTimedNotification({
        text: error.data?.response?.error || "Error during unfollowing",
        type: "error",
      });
    }
  }

  if (isLoading) return <ActionsSkeleton />;

  return (
    <div className="flex flex-row gap-2">
      <button
        onClick={() => {
          isFollowing ? unfollow() : follow();
        }}
        className="text-white rounded-md px-4 py-1 font-semibold cursor-pointer"
        style={buttonStyle}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
      <button className="bg-gray-200 text-black rounded-md px-4 py-1 font-semibold cursor-pointer">
        Message
      </button>
    </div>
  );
}
