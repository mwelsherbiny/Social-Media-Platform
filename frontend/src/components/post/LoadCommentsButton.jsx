import { IconContext } from "react-icons/lib";
import { IoIosAddCircleOutline } from "react-icons/io";

export default function LoadCommentsButton({ loadComments }) {
  return (
    <IconContext.Provider
      value={{
        size: "2rem",
        style: { alignSelf: "center", cursor: "pointer" },
      }}
    >
      <IoIosAddCircleOutline
        onClick={loadComments}
        className="hover:text-gray-500"
      />
    </IconContext.Provider>
  );
}
