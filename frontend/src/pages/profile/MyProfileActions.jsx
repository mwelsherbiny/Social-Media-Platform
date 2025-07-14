import { IoIosSettings } from "react-icons/io";
import { IconContext } from "react-icons/lib";
import { Link } from "react-router";

export default function MyProfileActions() {
  return (
    <Link to="/settings">
      <IconContext.Provider
        value={{ size: "1.5rem", style: { cursor: "pointer" } }}
      >
        <IoIosSettings />
      </IconContext.Provider>
    </Link>
  );
}
