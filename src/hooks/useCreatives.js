import { useContext, useEffect } from "react";
import { Context as CreativesContext } from "../context/CreativesContext";
import { Context as AuthContext } from "../context/AuthContext";

const useCreatives = (page) => {
  const {
    state: { creatives, nextPage, loading, },
    getCreatives,
    getHomeCreatives,
    loadCreatives,
    searchCreatives,
    searchCreativesAdvanced,
    searchCreativesFull,
  } = useContext(CreativesContext);

  const {
    state: { role, user, token },
  } = useContext(AuthContext);

  useEffect(() => {
    if (page == "home") {
      getHomeCreatives();
    } else if (page == "creatives-search") {
      // do nothing
    }
  }, []);

  const loadMore = () => {
    if (nextPage) loadCreatives(nextPage);
  };

  return { creatives, getCreatives, loading, loadMore, searchCreatives, searchCreativesAdvanced, searchCreativesFull };
};

export default useCreatives;
