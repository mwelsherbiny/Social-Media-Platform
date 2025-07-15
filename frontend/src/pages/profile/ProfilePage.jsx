import { useParams } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import userService from "../../services/userService";
import ProfileHeader from "./ProfileHeader";
import MyProfileActions from "./MyProfileActions";
import ProfileActions from "./ProfileActions";
import ProfilePosts from "./ProfilePosts";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useEffect, useState } from "react";
import { UseNotification } from "../../contexts/NotificationContext";
import safeFetch from "../../util/safeFetch";
import HLine from "../../components/HLine";

export default function ProfilePage() {
  const { user } = useAuth();
  const { username } = useParams();
  const isCurrentUserProfile = user.username === username;

  const { setTimedNotification } = UseNotification();
  const [profileUser, setProfileUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const result = isCurrentUserProfile
        ? await userService.getCurrentUser()
        : await userService.getUserByUsername(username);

      setProfileUser(result);
    }

    safeFetch(fetchData, (error) =>
      setTimedNotification({
        text: error.response?.data?.error || "Error fetching data",
        type: "error",
      })
    );
  }, [isCurrentUserProfile, setTimedNotification, username]);

  if (!profileUser) return <LoadingSpinner />;

  return (
    <div className="flex flex-col p-4 lg:p-8 gap-8 w-full">
      <ProfileHeader
        profileUser={profileUser}
        isCurrentUserProfile={isCurrentUserProfile}
      >
        {isCurrentUserProfile ? <MyProfileActions /> : <ProfileActions />}
      </ProfileHeader>
      <HLine />
      <ProfilePosts
        profileUser={profileUser}
        maxPosts={profileUser.postsCount}
        isCurrentUserProfile={isCurrentUserProfile}
      />
    </div>
  );
}
