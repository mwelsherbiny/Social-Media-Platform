import ProfileIcon from "./ProfileIcon";
import MyProfileActions from "./MyProfileActions";
import ProfileActions from "./ProfileActions";
import { useState } from "react";
import ExpandableText from "../../components/ExpandableText";

export default function ProfileHeader({ profileUser, isCurrentUserProfile }) {
  const [followersCount, setFollowersCount] = useState(
    profileUser.followersCount
  );

  console.log(profileUser);

  return (
    <div className="flex flex-row gap-8">
      <ProfileIcon size="6rem" src={profileUser.profile_picture_url} />
      <div className="flex flex-col gap-4">
        <div className="flex flex-row flex-wrap items-center gap-4">
          <p className="text-xl">{profileUser.username}</p>
          {isCurrentUserProfile ? (
            <MyProfileActions />
          ) : (
            <ProfileActions
              userId={profileUser.id}
              setFollowersCount={setFollowersCount}
            />
          )}
        </div>
        <div className="flex flex-col md:flex-row items-start gap-4">
          <p>
            <strong>{profileUser.postsCount}</strong> posts
          </p>
          <p>
            <strong>{followersCount}</strong> followers
          </p>
          <p>
            <strong>{profileUser.followingCount}</strong> following
          </p>
        </div>
        <div>
          <p className="font-semibold">{profileUser.name}</p>
          <ExpandableText
            text={profileUser.bio}
            classes={["max-w-[150px] sm:max-w-[300px] inline-block"]}
          />
        </div>
      </div>
    </div>
  );
}
