import { useContext, createContext } from "react";

export const HeroContext = createContext(null);

export const useMyContext = () => useContext(HeroContext);
