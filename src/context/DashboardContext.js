import { createContext, useEffect, useState } from "react";

export const DashboardContext = createContext();

export const DashboardContextProvider = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false);

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

  const dashboardInfo = {
    openSidebar,
    setOpenSidebar,
  };
  return (
    <DashboardContext.Provider value={dashboardInfo}>
      {children}
    </DashboardContext.Provider>
  );
};
