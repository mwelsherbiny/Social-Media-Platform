import ProfileIcon from "./../../pages/profile/ProfileIcon";
import PostEntry from "./PostEntry";

export default function PostCaption({ post, profileUser }) {
  return (
    <PostEntry entry={post} profileUser={profileUser} entryType={"post"} />
  );
}
