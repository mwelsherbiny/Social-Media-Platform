export default function Post({ children }) {
  return (
    <div className="w-full h-full bg-white inset-0 flex flex-col overflow-y-auto sm:flex-row">
      {children}
    </div>
  );
}
