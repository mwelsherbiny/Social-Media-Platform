import ProfileIcon from "../../pages/profile/ProfileIcon";
import { SlOptions } from "react-icons/sl";

export default function PostHeader({
  profileUser,
  isCurrentUserProfile,
  setAreSettingsOpen,
}) {
  return (
    <div className="flex flex-row justify-between items-center p-4">
      <div className="flex flex-row gap-4 items-center">
        <ProfileIcon src={profileUser.profile_picture_url} />
        <p className="font-semibold">{profileUser.username}</p>
      </div>
      {isCurrentUserProfile && (
        <SlOptions
          style={{ cursor: "pointer" }}
          onClick={() => setAreSettingsOpen(true)}
        />
      )}
    </div>
  );
}
