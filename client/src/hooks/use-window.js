import { useState, useEffect } from "react";

const useWindow = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
    };

    window.addEventListener("resize", updateWindowDimensions);

    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth > 768 && windowWidth < 1200;
  const isDesktop = windowWidth > 1200;

  return { isMobile, isTablet, isDesktop };
};

export default useWindow;
