import profileImgSrc from "@/assets/profileImg.png";

export default function ProfileIcon({ src, size }) {
  const imgSize = size ?? "2rem";

  const styling = {
    width: imgSize,
    height: imgSize,
    objectFit: "cover",
  };

  return (
    <img src={src ?? profileImgSrc} className="rounded-full" style={styling} />
  );
}
