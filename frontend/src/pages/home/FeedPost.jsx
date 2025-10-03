import { useNavigate } from "react-router";
import ProfileIcon from "../profile/ProfileIcon";
import getTimeElapsedString from "../../util/getTimeElapsed";
import PostFooter from "../../components/post/PostFooter";

export default function FeedPost({ post, setOpenedPost, setIsPostOpen }) {
  const navigate = useNavigate();

  function navigateToPoster() {
    navigate(`/profile/${post.username}`);
  }

  function openPost() {
    setOpenedPost(post);
    setIsPostOpen(true);
  }

  return (
    <div className="mb-4">
      <header className="flex flex-row px-2 py-4 sm:py-4 gap-2">
        <ProfileIcon
          src={post.profile_picture_url}
          classes={["cursor-pointer"]}
          onClick={navigateToPoster}
        />
        <p className="cursor-pointer font-semibold" onClick={navigateToPoster}>
          {post.username}
        </p>
        <p>•</p>
        <p className="text-gray-500">{getTimeElapsedString(post.created_at)}</p>
      </header>
      <img
        onClick={openPost}
        src={post.image_url}
        key={post.id}
        className="hover:brightness-50 object-cover w-full h-full"
      />
      <PostFooter postId={post.id} />
      <div className="flex flex-row gap-2 px-4 -mt-2">
        <p className="cursor-pointer font-semibold" onClick={navigateToPoster}>
          {post.username}
        </p>
        <p>{post.caption}</p>
      </div>
      <p className="px-4 mt-1 text-gray-500 cursor-pointer" onClick={openPost}>
        View all {post.comments_count} comments
      </p>
    </div>
  );
}
