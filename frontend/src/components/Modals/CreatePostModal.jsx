import { useEffect, useState } from "react";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import notificationTypes from "../../constants/notificationTypes";
import { UseNotification } from "@/contexts/NotificationContext";
import PostImageForm from "../create_post/PostImageForm";
import PostCaptionForm from "../create_post/PostCaptionForm";
import HLine from "../HLine";
import { IoIosArrowRoundBack } from "react-icons/io";
import postService from "../../services/postService";
import supportedTypes from "../../constants/supportedImageTypes";

export default function CreatePostModal() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const { setTimedNotification } = UseNotification();
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");

  function handleFile(e) {
    const file = e.target.files[0];
    if (supportedTypes.includes(file.type)) {
      setFile(file);
    } else {
      setTimedNotification({
        text: "Please upload a supported file type",
        type: notificationTypes.error,
      });
    }
  }

  async function uploadImage() {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("caption", caption);

    await postService.addPost(formData);

    setIsOpen(false);
  }

  useEffect(() => {
    if (!isOpen) {
      navigate(-1);
    }
  }, [isOpen, navigate]);

  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} zIndex={10}>
        <div className="bg-white w-full h-full rounded-4xl flex flex-col">
          <div className="flex flex-row items-center justify-between px-4 md:px-8">
            {file ? (
              <>
                <button
                  className="font-semibold text-5xl cursor-pointer"
                  onClick={() => {
                    setCaption("");
                    setFile(null);
                  }}
                >
                  <IoIosArrowRoundBack />
                </button>

                <h2 className="font-semibold p-2">Create new post</h2>

                <button
                  className="font-semibold cursor-pointer text-blue-500"
                  onClick={uploadImage}
                >
                  Share
                </button>
              </>
            ) : (
              <h2 className="font-semibold p-2">Create new post</h2>
            )}
          </div>
          <HLine></HLine>
          {file ? (
            <PostCaptionForm
              file={file}
              caption={caption}
              setCaption={setCaption}
            />
          ) : (
            <PostImageForm handleFile={handleFile} />
          )}
        </div>
      </Modal>
    </>
  );
}
