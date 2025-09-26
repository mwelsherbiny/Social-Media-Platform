import { IoImagesOutline } from "react-icons/io5";

export default function PostImageForm({ handleFile }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <IoImagesOutline size={"100px"} />
      <label
        htmlFor="image_input"
        className="py-2 px-4 bg-blue-500 text-white rounded-lg cursor-pointer mt-4"
      >
        Upload image
      </label>
      <input
        onChange={handleFile}
        type="file"
        className="hidden"
        id="image_input"
      />
    </div>
  );
}
