import { useState } from "react";
import Modal from "./Modal";
import { SlOptions } from "react-icons/sl";
import PostActionsModal from "./PostActionsModal";
import ProfileIcon from "../ProfileIcon";
import HLine from "../HLine";
import PostComments from "../PostComments";

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
          <PostComments post={post} user={profileUser} />
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
