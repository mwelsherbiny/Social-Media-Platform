import { useEffect, useRef, useState } from "react";
import postService from "../../services/postService";
import safeFetch from "@/util/safeFetch.js";
import { UseNotification } from "@/contexts/NotificationContext";
import { IconContext } from "react-icons/lib";
import { IoIosAddCircleOutline } from "react-icons/io";
import PostEntry from "./PostEntry";
import LoadingSpinner from "./../LoadingSpinner";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";

export default function PostComments({ post, profileUser, commentsCount }) {
  const { setTimedNotification } = UseNotification();
  const [comments, setComments] = useState(new Map());
  const [repliesVisible, setRepliesVisible] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const offset = useRef(0);
  const postId = post.id;

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
    comments.length,
    comments.size,
    commentsCount,
    isFetching,
    postId,
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
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between" key={comment.id}>
          <PostEntry
            entry={comment}
            profileUser={profileUser}
            entryType={"comment"}
          />
          <button className="cursor-pointer self-start">
            {comment.liked_by_user ? (
              <GoHeartFill color="#ed4956" />
            ) : (
              <div className="hover:text-gray-500">
                <GoHeart />
              </div>
            )}
          </button>
        </div>
        {comment.replies_count > 0 ? (
          <div className="flex flex-row items-center gap-2 ml-12">
            <hr className="w-6"></hr>
            <button
              className="text-gray-500 font-medium text-sm cursor-pointer"
              onClick={() => setRepliesVisible(true)}
            >
              View replies ({comment.replies_count})
            </button>{" "}
          </div>
        ) : null}
      </div>
    );
  });

  return (
    <div className="flex flex-col gap-4">
      {commentsEls}
      {comments.size === commentsCount ? null : isFetching ? (
        <LoadingSpinner />
      ) : (
        <IconContext.Provider
          value={{
            size: "2rem",
            style: { alignSelf: "center", cursor: "pointer" },
          }}
        >
          <IoIosAddCircleOutline
            onClick={loadComments}
            className="hover:text-gray-500"
          />
        </IconContext.Provider>
      )}
    </div>
  );
}
