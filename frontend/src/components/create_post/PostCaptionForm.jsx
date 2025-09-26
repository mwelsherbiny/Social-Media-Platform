import { useState } from "react";
import { UseNotification } from "@/contexts/NotificationContext";
import notificationTypes from "../../constants/notificationTypes";

const captionLimit = 1000;

export default function PostCaptionForm({ file, caption, setCaption }) {
  const { setTimedNotification } = UseNotification();
  const preview = URL.createObjectURL(file);

  function updateCaption(e) {
    const caption = e.target.value;
    console.log(caption.length);

    if (caption.length > captionLimit) {
      setTimedNotification({
        text: "caption must be less than or equal 1000 characters",
        type: notificationTypes.error,
      });
    } else {
      setCaption(caption);
    }
  }

  return (
    <div className="w-full h-full bg-white flex flex-col sm:flex-row rounded-b-4xl">
      <img src={preview} className="max-w-full sm:max-w-2/3 rounded-bl-4xl" />
      <div className="flex justify-center items-center w-full h-full">
        <textarea
          placeholder="caption"
          className=" flex w-full h-full p-4 rounded-br-4xl"
          value={caption}
          onChange={updateCaption}
        />
      </div>
    </div>
  );
}
