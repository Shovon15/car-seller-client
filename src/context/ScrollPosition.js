import { createContext, useEffect, useState } from "react";

export const ScrollContext = createContext();
const ScrollPositionProvider = ({ children }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  // console.log(scrollPosition);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener("scroll", updatePosition);

    updatePosition();

    return () => window.removeEventListener("scroll", updatePosition);
  }, []);
  const scrollInfo = { scrollPosition };
  return (
    <ScrollContext.Provider value={scrollInfo}>
      {children}
    </ScrollContext.Provider>
  );
};
export default ScrollPositionProvider;