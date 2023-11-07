import { useContext, useEffect } from "react";
import { Context as CreativesContext } from "../context/CreativesContext";

const useCreatives = (page) => {
  const {
    state: { creatives, nextPage, loading },
    getCreatives,
    getHomeCreatives,
    loadCreatives,
    searchCreatives,
  } = useContext(CreativesContext);

  useEffect(() => {
    if (page == "home") {
      getHomeCreatives();
    } else {
      getCreatives();
    }
  }, []);

  const loadMore = () => {
    if (nextPage) loadCreatives(nextPage);
  };

  return { creatives, loading, loadMore, searchCreatives };
};

export default useCreatives;
