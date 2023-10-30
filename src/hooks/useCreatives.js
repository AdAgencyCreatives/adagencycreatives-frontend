import { useContext, useEffect } from "react";
import { Context as CreativesContext } from "../context/CreativesContext";

const useCreatives = () => {
  const {
    state: { creatives, nextPage, loading },
    getCreatives,
    loadCreatives,
    searchCreatives,
  } = useContext(CreativesContext);

  useEffect(() => {
    getCreatives();
  }, []);

  const loadMore = () => {
    if (nextPage) loadCreatives(nextPage);
  };

  return { creatives, loading, loadMore, searchCreatives };
};

export default useCreatives;
