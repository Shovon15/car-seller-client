import { createContext, useEffect, useState } from "react";

export const DashboardContext = createContext();

export const DashboardContextProvider = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setOpenSidebar(window.innerWidth >= 920);
    };
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", updateWindowWidth);
    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

  const dashboardInfo = {
    openSidebar,
    setOpenSidebar,
    windowWidth,
  };
  return (
    <DashboardContext.Provider value={dashboardInfo}>
      {children}
    </DashboardContext.Provider>
  );
};
