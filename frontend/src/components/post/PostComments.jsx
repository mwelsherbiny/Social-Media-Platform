import { useEffect, useRef, useState } from "react";
import postService from "../../services/postService";
import safeFetch from "@/util/safeFetch.js";
import { UseNotification } from "@/contexts/NotificationContext";
import LoadingSpinner from "./../LoadingSpinner";
import LoadCommentsButton from "./LoadCommentsButton";
import CommentReplies from "./CommentReplies";
import PostComment from "./PostComment";

export default function PostComments({
  comments,
  setComments,
  postId,
  commentsCount,
  setComment,
}) {
  const { setTimedNotification } = UseNotification();
  const [isFetching, setIsFetching] = useState(true);
  const offset = useRef(0);

  useEffect(() => {
    if (isFetching) {
      async function fetchData() {
        const result = await postService.getPostComments(
          postId,
          offset.current
        );

        setComments((prev) => {
          const newComments = new Map(prev);

          for (let comment of result) {
            newComments.set(comment.id, comment);
          }

          offset.current = newComments.size;
          return newComments;
        });
        setIsFetching(false);
      }

      safeFetch(fetchData, (error) =>
        setTimedNotification({
          text: error.response?.data?.error ?? "Error loading comment",
        })
      );
    }
  }, [
    comments.size,
    commentsCount,
    isFetching,
    postId,
    setComments,
    setTimedNotification,
  ]);

  function loadComments() {
    if (comments.size < commentsCount) {
      setIsFetching(true);
    }
  }

  if (commentsCount === 0) return null;
  if (comments.size === 0) return <LoadingSpinner />;

  const commentsEls = Array.from(comments.values()).map((comment) => {
    return (
      <div className="flex flex-col gap-4" key={comment.id}>
        <PostComment comment={comment} setComment={setComment} />
        <CommentReplies
          parentId={comment.id}
          commentRepliesCount={comment.replies_count}
        />
      </div>
    );
  });

  return (
    <div className="flex flex-col gap-4">
      {commentsEls}
      {comments.size === commentsCount ? null : isFetching ? (
        <LoadingSpinner />
      ) : (
        <LoadCommentsButton loadComments={loadComments} />
      )}
    </div>
  );
}
