import profileImgSrc from "@/assets/profileImg.png";

export default function ProfileIcon({ src, size, classes, onClick }) {
  const imgSize = size ?? "2rem";

  const styling = {
    width: imgSize,
    height: imgSize,
    objectFit: "cover",
  };

  return (
    <img
      src={src ?? profileImgSrc}
      className={`rounded-full border-1 border-gray-300 ${
        classes ? classes.join(" ") : ""
      }`}
      style={styling}
      onClick={onClick}
    />
  );
}
