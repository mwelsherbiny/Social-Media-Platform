import { useState } from "react";
import { UseNotification } from "@/contexts/NotificationContext";
import notificationTypes from "../../constants/notificationTypes";
import commentService from "../../services/commentService";
import safeFetch from "@/util/safeFetch.js";
import PostComment from "./PostComment";

// if a reply is added to a reply, it's considered a reply to the parent comment
export default function CommentReplies({ parentId, commentRepliesCount }) {
  const { setTimedNotification } = UseNotification();
  const [replies, setReplies] = useState([]);
  const [repliesVisible, setRepliesVisible] = useState(false);

  async function fetchReplies() {
    const replies = await commentService.getCommentReplies(parentId);

    setReplies(replies);
  }

  function toggleVisiblity() {
    setRepliesVisible((prev) => {
      if (prev === false && replies.length === 0) {
        safeFetch(fetchReplies, (error) =>
          setTimedNotification({
            text: error.data?.response?.error ?? "Error during loading replies",
            type: notificationTypes.error,
          })
        );
      }
      return !prev;
    });
  }

  return commentRepliesCount > 0 ? (
    <>
      <div className="flex flex-row items-center gap-2 ml-12">
        <hr className="w-6"></hr>
        <button
          className="text-gray-500 font-medium text-sm cursor-pointer"
          onClick={toggleVisiblity}
        >
          {repliesVisible
            ? "Hide replies"
            : `View replies (${commentRepliesCount})`}
        </button>
      </div>

      {repliesVisible &&
        replies.map((reply) => {
          return (
            <div className="flex flex-col gap-4 ml-12" key={reply.id}>
              <div className="flex flex-row justify-between">
                <PostComment comment={reply} />
              </div>
            </div>
          );
        })}
    </>
  ) : null;
}
