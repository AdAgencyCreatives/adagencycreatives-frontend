import { useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToHash = () => {
  let location = useLocation();

  let hashElement = useMemo(() => {
    let hash = location.hash;
    const removeHashCharacter = (str) => {
      const result = str.slice(1);
      return result;
    };

    if (hash) {
      let element = document.getElementById(removeHashCharacter(hash));
      return element;
    } else {
      return null;
    }
  }, [location]);

  useEffect(() => {
    if (hashElement) {
      const headerHeight = document.querySelector("#top-nav-fixed").offsetHeight;
      const targetPosition = hashElement.getBoundingClientRect().top + window.scrollY - headerHeight;
  
      window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
      });
    }
  }, [hashElement]);

  return null;
};

export default ScrollToHash;