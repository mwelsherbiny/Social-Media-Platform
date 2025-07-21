import { Link } from "react-router";

export default function NavItem({ children, itemName, path, setActiveItem }) {
  if (path) {
    return (
      <button
        className="cursor-pointer"
        onClick={() => setActiveItem(itemName)}
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
