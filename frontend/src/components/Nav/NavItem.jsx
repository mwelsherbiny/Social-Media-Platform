import { Link } from "react-router";

export default function NavItem({ children, itemName, path }) {
  if (path) {
    return (
      <button
        className="cursor-pointer"
      >
        <Link to={path}>{children}</Link>
      </button>
    );
  }
  return (
    <button className="cursor-pointer" onClick={() => setActiveItem(itemName)}>
      {children}
    </button>
  );
}
