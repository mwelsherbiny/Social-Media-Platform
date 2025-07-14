import { useEffect, useState, useRef } from "react";
import { ResponsiveContext } from "../contexts/ResponsiveContext";

const mobileSize = 768;

export default function ResponsiveProvider({ children }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= mobileSize);
  const isMobileRef = useRef(isMobile);

  useEffect(() => {
    isMobileRef.current = isMobile;
  }, [isMobile]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > mobileSize && isMobileRef.current) {
        setIsMobile(false);
      } else if (window.innerWidth <= mobileSize && !isMobileRef.current) {
        setIsMobile(true);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ResponsiveContext.Provider value={{ isMobile }}>
      {children}
    </ResponsiveContext.Provider>
  );
}
