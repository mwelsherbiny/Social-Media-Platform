import { useState } from "react";
import Modal from "./Modal";
import { SlOptions } from "react-icons/sl";
import PostActionsModal from "./PostActionsModal";
import ProfileIcon from "@/pages/profile/ProfileIcon";
import HLine from "../HLine";
import PostComments from "@/components/post/PostComments";
import PostCaption from "../post/PostCaption";

export default function PostModal({ post, profileUser, isCurrentUserProfile }) {
  const [areSettingsOpen, setAreSettingsOpen] = useState(false);

  return (
    <>
      <div className="w-full h-full bg-white inset-0 flex flex-row">
        <img src={post.image_url} className="max-w-[55%]" />
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between items-center p-4">
            <div className="flex flex-row gap-4 items-center">
              <ProfileIcon src={profileUser.profile_picture_url} />
              <p className="font-semibold">{profileUser.username}</p>
            </div>
            {isCurrentUserProfile && (
              <SlOptions
                style={{ cursor: "pointer" }}
                onClick={() => setAreSettingsOpen(true)}
              />
            )}
          </div>
          <HLine />
          {post.comments_count === 0 && !post.caption ? (
            <p className="flex justify-center items-center font-semibold text-4xl">
              No comments on this post
            </p>
          ) : (
            <div className="flex flex-col gap-2 p-4 overflow-y-scroll">
              <PostCaption profileUser={profileUser} post={post} />
              <PostComments
                post={post}
                profileUser={profileUser}
                commentsCount={Number(post.comments_count)}
              />
            </div>
          )}
          <HLine />
          <div>Like</div>
          <div>Comment</div>
          <HLine />
          <div>Add a comment</div>
        </div>
      </div>

      <Modal
        isOpen={areSettingsOpen}
        setIsOpen={setAreSettingsOpen}
        size={{ width: "30%", height: "50%" }}
        zIndex={20}
      >
        <PostActionsModal />
      </Modal>
    </>
  );
}
