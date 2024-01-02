import { useEffect, useRef } from "react";

export const usePopupScrollLoader = (loading, cb = false) => {
  const callbackFired = useRef(false);

  useEffect(() => {
    const darkContainer = document.querySelector(".MuiDialog-container");
    if (!darkContainer) {
      return;
    }
    const handleScroll = () => {
      if (callbackFired.current) return;
      
      if (
        darkContainer.scrollTop > (darkContainer.scrollHeight - darkContainer.offsetHeight - 100)
      ) {
        cb();
        callbackFired.current = true;
        darkContainer.removeEventListener("scroll", handleScroll);
      }
    };

    darkContainer.addEventListener("scroll", handleScroll);

    return () => darkContainer.removeEventListener("scroll", handleScroll);
  }, [loading, cb]);

  useEffect(() => {
    callbackFired.current = loading;
  }, [loading]);
};


