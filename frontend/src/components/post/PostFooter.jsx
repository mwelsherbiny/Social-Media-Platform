import getTimePointString from "../../util/geTimePoint";
import postService from "../../services/postService";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { useState } from "react";
import safeFetch from "../../util/safeFetch";
import { UseNotification } from "../../contexts/NotificationContext";
import { useEffect } from "react";

export default function PostFooter({ postId, postDate }) {
  const { setTimedNotification } = UseNotification();
  const [isLiked, setIsLiked] = useState(null);
  const [likesCount, setLikesCount] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const likesDetails = await postService.getPostLikeDetails(postId);
      setIsLiked(likesDetails.liked_by_logged_user);
      setLikesCount(likesDetails.likes_count);
    }

    safeFetch(fetchData, (error) =>
      setTimedNotification({
        text: error.response?.data?.error || "Error fetching profile details",
        type: "error",
      })
    );
  }, [postId, setTimedNotification]);

  async function likePost() {
    await postService.addPostLike(postId);
    setIsLiked(true);
    setLikesCount((prev) => prev + 1);
  }

  async function unlikePost() {
    await postService.deletePostLike(postId);
    setIsLiked(false);
    setLikesCount((prev) => prev - 1);
  }

  if (isLiked === null || likesCount === null) return "Loading...";

  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="flex flex-row">
        {isLiked ? (
          <GoHeartFill
            size={"2rem"}
            className="text-rose-600 cursor-pointer"
            onClick={unlikePost}
          />
        ) : (
          <GoHeart
            size={"2rem"}
            className="hover:text-gray-500 cursor-pointer"
            onClick={likePost}
          />
        )}
      </div>
      <div className="flex flex-col">
        <p className="font-semibold">{likesCount} likes</p>
        <p className="text-gray-500">
          {getTimePointString(new Date(postDate))}
        </p>
      </div>
    </div>
  );
}
