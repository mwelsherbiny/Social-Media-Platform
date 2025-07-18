import React, { useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ isOpen, setIsOpen, children, size, zIndex }) {
  const modalBackgroundRef = useRef(null);

  function handleClick(e) {
    const clickedEl = e.target;
    if (modalBackgroundRef.current === clickedEl) setIsOpen(false);
  }

  if (!size) size = { width: "85%", height: "90%" };
  if (!isOpen) return null;

  return createPortal(
    <>
      <div
        onClick={handleClick}
        className="fixed w-screen h-screen inset-0 flex justify-center items-center"
      >
        <div
          ref={modalBackgroundRef}
          className="fixed w-full h-full bg-black inset-0 opacity-50"
        ></div>
        <button
          onClick={() => setIsOpen(false)}
          className="fixed text-4xl text-white right-4 top-0 cursor-pointer"
        >
          &times;
        </button>
        <div
          className="flex justify-center items-center"
          style={{ ...size, zIndex }}
        >
          {children}
        </div>
      </div>
    </>,
    document.getElementById("modal-root")
  );
}
