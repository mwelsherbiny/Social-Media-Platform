import userService from "../../services/userService";
import { useState, useEffect, useRef } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { UseNotification } from "../../contexts/NotificationContext";
import safeFetch from "../../util/safeFetch";
import Modal from "@/components/Modals/Modal";
import PostModal from "@/components/Modals/PostModal";

export default function ProfilePosts({
  maxPosts,
  profileUser,
  isCurrentUserProfile,
}) {
  const { setTimedNotification } = UseNotification();
  const [postsData, setPostsData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const startId = useRef(0);
  const usedStartIds = useRef(new Set());
  const [openedPost, setOpenedPost] = useState(null);
  const [isPostOpen, setIsPostOpen] = useState(false);

  const userId = profileUser.id;

  useEffect(() => {
    setPostsData([]);
    setIsFetching(true);
    startId.current = 0;
    usedStartIds.current = new Set();
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
      if (isFetching && !usedStartIds.current.has(startId.current)) {
        usedStartIds.current.add(startId.current);

        let result = isCurrentUserProfile
          ? await userService.getCurrentUserPosts(startId.current)
          : await userService.getUserPostsById(userId, startId.current);

        setIsFetching(false);
        setPostsData((prev) => {
          const postIdSet = new Set(prev.map((post) => post.id));
          result = result.filter((post) => !postIdSet.has(post.id));

          if (!result || result.length === 0) return prev;

          startId.current = result.at(-1)?.id ?? prev.at(-1)?.id;

          return [...prev, ...result];
        });
      }
    }

    safeFetch(fetchData, (error) =>
      setTimedNotification({ text: error.response?.data?.error, type: "error" })
    );
  }, [
    isCurrentUserProfile,
    isFetching,
    maxPosts,
    setTimedNotification,
    userId,
  ]);

  if (maxPosts === 0) return null;
  if (postsData.length === 0) return <LoadingSpinner />;

  const postsEls = postsData.map((post) => (
    <img
      onClick={() => {
        setOpenedPost(post);
        setIsPostOpen(true);
      }}
      src={post.image_url}
      key={post.id}
      className="hover:brightness-50 object-cover w-full lg:min-w-72 xl:min-w-96"
    />
  ));

  return (
    <>
      <div className="flex justify-center w-full">
        <div className="grid grid-cols-3 gap-1">{postsEls}</div>
      </div>

      {isPostOpen && (
        <Modal isOpen={isPostOpen} setIsOpen={setIsPostOpen} zIndex={10}>
          <PostModal
            openedPost={openedPost}
            profileUser={profileUser}
            isCurrentUserProfile={isCurrentUserProfile}
          />
        </Modal>
      )}
    </>
  );
}
