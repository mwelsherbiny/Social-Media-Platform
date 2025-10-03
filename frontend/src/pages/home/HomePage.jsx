import FeedFooter from "./FeedFooter";
import FeedPosts from "./FeedPosts";

export default function Home() {
  return (
    <div className="sm:px-8 sm:py-4 md:px-16 flex flex-col items-center">
      <FeedPosts />
      <FeedFooter />
    </div>
  );
}
