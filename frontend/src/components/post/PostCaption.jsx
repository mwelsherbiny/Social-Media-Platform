import getTimeElapsedString from "../../util/getTimeElapsed";
import ProfileIcon from "../../pages/profile/ProfileIcon";

export default function PostCaption({ post, profileUser }) {
  return (
    <div className="flex flex-row gap-4">
      <ProfileIcon src={profileUser.profile_picture_url} />
      <div className="flex flex-col justify-start">
        <p>
          <span className="font-semibold">{profileUser.username} </span>
          {post.caption}
        </p>
        <div className="flex flex-row gap-4 items-center">
          <p className="text-gray-500">
            {getTimeElapsedString(post.created_at)}
          </p>
        </div>
      </div>
    </div>
  );
}
