import { useState } from "react";

export default function ExpandableText({ text, limit = 100, classes }) {
  const [expanded, setExpanded] = useState(false);

  if (!text) {
    return null;
  }

  let modifiedText = text;
  let expandEl = null;

  if (!expanded && modifiedText.length > limit) {
    modifiedText = modifiedText.substring(0, limit);
    expandEl = (
      <span
        className="text-gray-400 cursor-pointer"
        onClick={() => setExpanded(true)}
      >
        ... more
      </span>
    );
  }

  return (
    <span
      className={`break-words break-all whitespace-normal ${classes.join(
        " "
      )}`}
    >
      {modifiedText}
      {expandEl}
    </span>
  );
}
