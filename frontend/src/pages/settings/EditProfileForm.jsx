import { UseNotification } from "@/contexts/NotificationContext";
import supportedTypes from "../../constants/supportedImageTypes";
import { useAuth } from "../../contexts/AuthContext";
import ProfilIcon from "../profile/ProfileIcon";
import notificationTypes from "../../constants/notificationTypes";
import { useState } from "react";
import userService from "../../services/userService";
import { useNavigate } from "react-router";

export default function EditProfileForm() {
  const navigate = useNavigate();
  const { setTimedNotification } = UseNotification();
  const { user, setUser } = useAuth();
  const [profileImg, setProfileImg] = useState(null);
  const [bio, setBio] = useState(user.bio);

  function handleFile(e) {
    const file = e.target.files[0];
    if (supportedTypes.includes(file.type)) {
      setProfileImg(file);
    } else {
      setTimedNotification({
        text: "Please upload a supported file type",
        type: notificationTypes.error,
      });
    }
  }

  function hasChanged() {
    return profileImg || bio !== user.bio;
  }

  async function submitChanges(e) {
    e.preventDefault();

    const formData = new FormData();
    if (profileImg) {
      formData.append("file", profileImg);
    }
    formData.append("bio", bio);

    const result = await userService.updateUser(formData);
    console.log(result);
    setTimedNotification({
      text: result.message,
      type: notificationTypes.success,
    });

    setUser({
      ...user,
      bio: result.bio,
      profile_picture_url: result.profilePictureUrl,
    });

    navigate(-1);
  }

  return (
    <form
      onSubmit={submitChanges}
      className="flex flex-col gap-2 w-fit min-w-1/3 max-w-[500px]"
    >
      <h1 className="text-xl font-bold mb-4">Edit Profile</h1>
      <div className="bg-[#EFEFEF] flex flex-row p-4 gap-y-2 gap-x-8 justify-between rounded-xl items-center flex-wrap">
        <div className="flex flex-row gap-4 items-center">
          <ProfilIcon
            src={
              profileImg
                ? URL.createObjectURL(profileImg)
                : user.profile_picture_url
            }
            size={"3rem"}
          />
          <div>
            <p>{user.username}</p>
            <p>{user.name}</p>
          </div>
        </div>
        <div>
          <label
            htmlFor="profile_image_input"
            className="bg-blue-500 text-white px-3 py-1 rounded-lg cursor-pointer"
          >
            Change Photo
          </label>
          <input
            type="file"
            id="profile_image_input"
            className="hidden"
            onChange={handleFile}
          />
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Bio</h2>
        <textarea
          className="w-full max-w-[500px] border-2 border-black rounded-xl p-2"
          onChange={(e) => setBio(e.target.value)}
          value={bio}
        ></textarea>
      </div>
      <button
        type="submit"
        className={`bg-blue-500 px-4 py-1 rounded-lg text-white self-end cursor-pointer ${
          hasChanged() ? "" : "disabled opacity-50"
        }`}
      >
        Submit
      </button>
    </form>
  );
}
