import postService from "../../services/postService";

export default function PostActionsModal({
  postId,
  setAreSettingsOpen,
  setIsPostOpen,
  removePostById,
  decrementPostCount,
}) {
  async function deletePost() {
    await postService.deletePost(postId);
    setAreSettingsOpen(false);
    setIsPostOpen(false);
    removePostById(postId);
    decrementPostCount();
  }

  return (
    <div className="w-full h-full flex flex-col bg-white py-2 px-4 rounded-xl">
      <button className="cursor-pointer" onClick={deletePost}>
        Delete Post
      </button>
    </div>
  );
}
