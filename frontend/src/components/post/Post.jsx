export default function Post({ children }) {
  return (
    <div className="w-full h-full bg-white inset-0 flex flex-col overflow-y-scroll md:overflow-y-hidden md:flex-row">
      {children}
    </div>
  );
}
