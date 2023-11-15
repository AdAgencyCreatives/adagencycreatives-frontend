import { useEffect, useRef } from "react";

export const useScrollLoader = (loading, cb = false) => {
  const callbackFired = useRef(false);

  useEffect(() => {
    const darkContainer = document.querySelector(".dark-container");
    const handleScroll = () => {
      if (callbackFired.current) return;

      const containerRect = darkContainer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const headerHeight =
        document.querySelector("#top-nav-fixed").offsetHeight;

      const visibleHeight = viewportHeight - containerRect.top - headerHeight;

      if (
        visibleHeight >= darkContainer.offsetHeight - 300 &&
        visibleHeight <= darkContainer.offsetHeight
      ) {
        cb();
        callbackFired.current = true;
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, cb]);

  useEffect(() => {
    callbackFired.current = loading;
  }, [loading]);
};
