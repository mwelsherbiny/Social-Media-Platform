import getTimeElapsedString from "../../util/getTimeElapsed";
import ProfileIcon from "../../pages/profile/ProfileIcon";
import CommentLikeButton from "./CommentLikeButton";
import { useState } from "react";
import commentService from "../../services/commentService";

export default function PostComment({ comment, setComment }) {
  const [isLiked, setIsLiked] = useState(comment.liked_by_user);
  const [likesCount, setLikesCount] = useState(Number(comment.likes_count));

  async function likeComment() {
    setIsLiked(true);
    setLikesCount((prev) => prev + 1);
    comment.liked_by_user = true;
    comment.likes_count += 1;

    await commentService.addCommentLike(comment.id);
  }

  async function unlikeComment() {
    setIsLiked(false);
    setLikesCount((prev) => prev - 1);
    comment.liked_by_user = false;
    comment.likes_count -= 1;

    await commentService.deleteCommentLike(comment.id);
  }

  return (
    <div className="flex flex-row justify-between w-full">
      <div className="flex flex-row gap-4">
        <ProfileIcon src={comment.profile_picture_url} />
        <div className="flex flex-col justify-start">
          <p>
            <span className="font-semibold">{comment.username} </span>
            {comment.content}
          </p>
          <div className="flex flex-row gap-4 items-center">
            <p className="text-gray-500">
              {getTimeElapsedString(comment.created_at)}
            </p>
            <p className="text-gray-500 font-medium text-sm">
              {likesCount} likes
            </p>
            <button
              className="text-gray-500 font-medium text-sm cursor-pointer"
              onClick={() =>
                setComment({
                  content: `@${comment.username} `,
                  parentId: comment.id,
                })
              }
            >
              reply
            </button>
          </div>
        </div>
      </div>
      <CommentLikeButton
        isLiked={isLiked}
        likeComment={likeComment}
        unlikeComment={unlikeComment}
      />
    </div>
  );
}
