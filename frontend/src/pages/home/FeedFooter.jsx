import { CiCircleCheck } from "react-icons/ci";

export default function FeedFooter() {
  return (
    <div className="flex flex-col items-center min-w-[250px] max-w-[600px] mt-4">
      <CiCircleCheck size={"5rem"} />
      <p className="font-semibold text-lg">You're all caught up</p>
      <p>Follow more people to get more post suggestions</p>
    </div>
  );
}
