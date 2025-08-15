export default function PostMainContent({children}) {
  return (
    <div className="flex flex-col gap-2 p-4 overflow-y-scroll">
      {children}
    </div>
  );
}
