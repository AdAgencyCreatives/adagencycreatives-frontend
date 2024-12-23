import { useContext, useEffect } from "react";
import { Context as CreativesContext } from "../context/CreativesContext";
import { Context as AuthContext } from "../context/AuthContext";

const useCreatives = (page) => {
  const {
    state: { creatives, home_creatives, search_creatives, nextPage, loading, },
    getCreatives,
    getHomeCreatives,
    loadCreatives,
    loadSearchCreatives,
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
    } else if (page == "creative") {
      //getCreatives();
    } else if (page == "creatives-search") {
      // do nothing
    }
  }, []);

  const loadMore = () => {
    if (nextPage) {
      if (page == "creatives-search") {
        loadSearchCreatives(nextPage);
      } else {
        loadCreatives(nextPage);
      }
    }
  };

  return { creatives, home_creatives, search_creatives, getCreatives, getHomeCreatives, loading, loadMore, searchCreatives, searchCreativesAdvanced, searchCreativesFull };
};

export default useCreatives;
