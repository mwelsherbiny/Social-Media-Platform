import userService from "../../services/userService";
import { useState, useEffect, useRef } from "react";
import { UseNotification } from "../../contexts/NotificationContext";
import safeFetch from "../../util/safeFetch";
import Modal from "@/components/Modals/Modal";
import PostModal from "@/components/Modals/PostModal";
import { useAuth } from "../../contexts/AuthContext";
import FeedPost from "./FeedPost";
import HLine from "../../components/HLine";

export default function FeedPosts() {
  const { setTimedNotification } = UseNotification();
  const [postsData, setPostsData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const createdAt = useRef(null);
  const prevCreatedAt = useRef(new Set());
  const [openedPost, setOpenedPost] = useState(null);
  const [isPostOpen, setIsPostOpen] = useState(false);
  const { user: profileUser } = useAuth();

  function removePostById(postId) {
    setPostsData(postsData.filter((post) => post.id != postId));
  }

  const userId = profileUser.id;

  useEffect(() => {
    setPostsData([]);
    setIsFetching(true);
    createdAt.current = null;
    prevCreatedAt.current = new Set();
  }, [userId]);

  useEffect(() => {
    function handleScroll() {
      if (
        window.scrollY + window.innerHeight >=
        document.body.scrollHeight - 100
      ) {
        setIsFetching(true);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (isFetching && !prevCreatedAt.current.has(createdAt.current)) {
        prevCreatedAt.current.add(createdAt.current);

        let result = await userService.getUserFeed(createdAt.current);

        setIsFetching(false);
        setPostsData((prev) => {
          const postIdSet = new Set(prev.map((post) => post.id));
          result = result.filter((post) => !postIdSet.has(post.id));

          if (!result || result.length === 0) return prev;

          createdAt.current =
            result.at(-1)?.created_at ?? prev.at(-1)?.created_at;

          return [...prev, ...result];
        });
      }
    }

    safeFetch(fetchData, (error) =>
      setTimedNotification({ text: error.response?.data?.error, type: "error" })
    );
  }, [isFetching, setTimedNotification]);

  if (postsData.length === 0) return null;

  const postsEls = postsData.map((post) => {
    return (
      <div key={post.id}>
        <FeedPost
          post={post}
          setOpenedPost={setOpenedPost}
          setIsPostOpen={setIsPostOpen}
        />
        <HLine />
      </div>
    );
  });

  return (
    <>
      <div className="flex flex-col gap-1 max-w-[600px] w-full">{postsEls}</div>

      {isPostOpen && (
        <Modal isOpen={isPostOpen} setIsOpen={setIsPostOpen} zIndex={10}>
          <PostModal
            openedPost={openedPost}
            profileUser={profileUser}
            isCurrentUserProfile={false}
            setIsPostOpen={setIsPostOpen}
            removePostById={removePostById}
          />
        </Modal>
      )}
    </>
  );
}
