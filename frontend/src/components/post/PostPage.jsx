import { useParams } from "react-router";
import { useState, useEffect } from "react";
import Post from "./Post";
import PostImage from "./PostImage";
import PostDetails from "./PostDetails";
import PostHeader from "./PostHeader";
import HLine from "@/components/HLine";
import PostMainContent from "./PostMainContent";
import PostCaption from "./PostCaption";
import PostComments from "./PostComments";
import PostFooter from "./PostFooter";
import CommentForm from "./CommentForm";
import postService from "../../services/postService";
import userService from "./../../services/userService";
import { useAuth } from "../../contexts/AuthContext";

export default function PostPage() {
  const { user: currentUser } = useAuth();
  const { id: postId } = useParams();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState(new Map());
  const [areSettingsOpen, setAreSettingsOpen] = useState(false);
  const [comment, setComment] = useState({ content: "", replyTo: null });

  async function getUserData(userId) {
    const user = await userService.getUserById(userId);
    setUser(user);
  }

  useEffect(() => {
    async function fetchData() {
      const post = await postService.getPost(postId);
      if (parseInt(currentUser.id) === parseInt(post.user_id))
        setUser(currentUser);
      else await getUserData(post.user_id);
      setPost(post);
    }

    fetchData();
  }, [postId]);

  if (!post || !user) return <p>Loading...</p>;

  return (
    <Post>
      <PostImage imageUrl={post.image_url} />

      <PostDetails>
        <PostHeader
          profileUser={user}
          isCurrentUserProfile={user.id === currentUser.id}
          areSettingsOpen={areSettingsOpen}
          setAreSettingsOpen={setAreSettingsOpen}
        />
        <HLine />

        <PostMainContent>
          <PostCaption profileUser={user} post={post} />
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
          user={user}
        />
      </PostDetails>
    </Post>
  );
}
