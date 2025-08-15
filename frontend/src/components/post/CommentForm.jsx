import postService from "../../services/postService";

export default function CommentForm({
  comment,
  setComment,
  setComments,
  post,
  setPost,
  user,
}) {
  const isEmpty = comment.content.trim().length === 0;

  function updateComment(newComment) {
    setComment((prev) => ({ ...prev, content: newComment }));
  }

  async function postComment() {
    const { id: newCommentId } = await postService.addPostComment({
      postId: post.id,
      content: comment.content,
      parentId: comment.parentId,
    });
    setComment({ content: "", parentId: null });

    setComments((prev) => {
      const updatedComments = new Map(prev);
      updatedComments.set(newCommentId, {
        content: comment.content,
        created_at: new Date(),
        id: newCommentId,
        liked_by_user: false,
        likes_count: 0,
        parent_id: comment.parentId,
        post_id: post.id,
        profile_picture_url: user.profile_picture_url,
        replies_count: 0,
        user_id: user.id,
        username: user.username,
      });

      if (comment.parentId) {
        const parentComment = updatedComments.get(comment.parentId);

        updatedComments.set(comment.parentId, {
          ...parentComment,
          replies_count: parseInt(parentComment.replies_count) + 1,
        });
      }

      return updatedComments;
    });

    setPost((prev) => {
      return { ...prev, comments_count: parseInt(prev.comments_count) + 1 };
    });
  }

  return (
    <div className="p-4 flex flex-row justify-between">
      <input
        type="text"
        className="focus:outline-none"
        placeholder="Add a comment..."
        value={comment.content}
        onChange={(e) => updateComment(e.target.value)}
      />
      <button
        className={`text-blue-500 font-semibold ${
          isEmpty ? "" : "cursor-pointer"
        } opacity-${isEmpty ? 50 : 100}`}
        onClick={postComment}
      >
        Post
      </button>
    </div>
  );
}
