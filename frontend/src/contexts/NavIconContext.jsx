import { IconContext } from "react-icons";

export const NavIconProvider = ({ children }) => (
  <IconContext.Provider value={{ size: "2rem" }}>
    {children}
  </IconContext.Provider>
);
