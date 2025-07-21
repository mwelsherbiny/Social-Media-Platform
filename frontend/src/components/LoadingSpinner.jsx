export default function LoadingSpinner({ size = 8 }) {
  return (
    <div className={`flex justify-center items-center`}>
      <div
        className={`h-${size} w-${size} border-4 border-t-transparent border-gray-400 rounded-full animate-spin`}
      ></div>
    </div>
  );
}
