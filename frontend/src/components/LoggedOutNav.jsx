import Header from "./Header";

export default function LoggedOutNav() {
  return (
    <>
      <nav className="flex flex-row px-[10%] py-4 justify-between items-center">
        <Header />
        <button className="py-1 px-4 bg-blue-400 text-white rounded-md flex cursor-pointer">
          Log In
        </button>
      </nav>
      <hr className="border-gray-300"></hr>
    </>
  );
}
