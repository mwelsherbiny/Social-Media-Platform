import getTimeElapsedString from "../../util/getTimeElapsed";
import ProfileIcon from "../../pages/profile/ProfileIcon";

export default function PostEntry({ entry, profileUser, entryType }) {
  let entryText;

  if (entryType === "post") {
    entryText = entry.caption;
  } else {
    entryText = entry.content;
  }

  return (
    <div className="flex flex-row gap-4">
      <ProfileIcon src={profileUser.profile_picture_url} />
      <div className="flex flex-col justify-start">
        <p>
          <span className="font-semibold">{profileUser.username} </span>
          {entryText}
        </p>
        <div className="flex flex-row gap-4 items-center">
          <p className="text-gray-500">
            {getTimeElapsedString(entry.created_at)}
          </p>
          {entryType === "comment" ? (
            <>
              <p className="text-gray-500 font-medium text-sm">
                {entry.likes_count} likes
              </p>
              <button className="text-gray-500 font-medium text-sm cursor-pointer">
                reply
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
