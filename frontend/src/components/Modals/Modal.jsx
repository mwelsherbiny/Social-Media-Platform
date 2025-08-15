import React, { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({ isOpen, setIsOpen, children, size, zIndex }) {
  const modalBackgroundRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  function handleClick(e) {
    const clickedEl = e.target;
    if (modalBackgroundRef.current === clickedEl) setIsOpen(false);
  }

  const sizeStyle = size
    ? `w-[${size.width}] h-[${size.height}] ]`
    : "w-[70%] h-[75%] md:w-[85%] md:h-[90%]";
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
          className={`flex justify-center items-center ${sizeStyle}`}
          style={{ zIndex }}
        >
          {children}
        </div>
      </div>
    </>,
    document.getElementById("modal-root")
  );
}
