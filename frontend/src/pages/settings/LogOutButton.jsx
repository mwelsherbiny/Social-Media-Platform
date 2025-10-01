import { useAuth } from "../../contexts/AuthContext";

export default function LogOutButton() {
  const { logout } = useAuth();

  return (
    <button
      className=" px-4 py-1 bg-blue-500 text-white rounded-lg cursor-pointer w-fit"
      onClick={logout}
    >
      Log Out
    </button>
  );
}
