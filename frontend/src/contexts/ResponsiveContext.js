import { createContext, useContext } from "react";

export const ResponsiveContext = createContext();
export const useResponsive = () => useContext();
