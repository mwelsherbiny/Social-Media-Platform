import { useState } from "react";
import Modal from "./Modal";
import PostActionsModal from "./PostActionsModal";
import HLine from "../HLine";
import PostComments from "@/components/post/PostComments";
import PostCaption from "../post/PostCaption";
import CommentForm from "../post/CommentForm";
import PostImage from "../post/PostImage";
import PostDetails from "../post/PostDetails";
import PostHeader from "../post/PostHeader";
import PostMainContent from "../post/PostMainContent";
import PostFooter from "../post/PostFooter";
import Post from "../post/Post";

export default function PostModal({
  openedPost,
  profileUser,
  isCurrentUserProfile,
}) {
  const [comments, setComments] = useState(new Map());
  const [areSettingsOpen, setAreSettingsOpen] = useState(false);
  const [post, setPost] = useState(openedPost);
  const [comment, setComment] = useState({ content: "", replyTo: null });

  return (
    <>
      <Post>
        <PostImage imageUrl={post.image_url} />

        <PostDetails>
          <PostHeader
            profileUser={profileUser}
            isCurrentUserProfile={isCurrentUserProfile}
            setAreSettingsOpen={setAreSettingsOpen}
          />
          <HLine />

          <PostMainContent>
            <PostCaption profileUser={profileUser} post={post} />
            <PostComments
              comments={comments}
              setComments={setComments}
              postId={post.id}
              commentsCount={Number(post.comments_count)}
              setComment={setComment}
            />
          </PostMainContent>
          <HLine />

          <PostFooter
            postId={post.id}
            postDate={post.created_at}
            setPost={setPost}
          />
          <HLine />

          <CommentForm
            comment={comment}
            setComments={setComments}
            setComment={setComment}
            post={post}
            setPost={setPost}
            user={profileUser}
          />
        </PostDetails>
      </Post>

      {areSettingsOpen && (
        <Modal
          isOpen={areSettingsOpen}
          setIsOpen={setAreSettingsOpen}
          size={{ width: "30%", height: "50%" }}
          zIndex={20}
        >
          <PostActionsModal />
        </Modal>
      )}
    </>
  );
}
