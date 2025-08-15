import { GoHeartFill } from "react-icons/go";
import { GoHeart } from "react-icons/go";

export default function CommentLikeButton({
  isLiked,
  likeComment,
  unlikeComment,
}) {
  return (
    <button className="cursor-pointer self-center">
      {isLiked ? (
        <GoHeartFill onClick={unlikeComment} className="text-rose-600" />
      ) : (
        <div className="hover:text-gray-500">
          <GoHeart onClick={likeComment} />
        </div>
      )}
    </button>
  );
}
