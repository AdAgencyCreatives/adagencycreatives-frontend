import { useContext, useEffect } from "react";
import { Context as CreativesContext } from "../context/CreativesContext";
import { Context as AuthContext } from "../context/AuthContext";

const useCreatives = (page) => {
  const {
    state: { creatives, nextPage, loading },
    getCreatives,
    getHomeCreatives,
    loadCreatives,
    searchCreatives,
    searchCreativesAdvanced
  } = useContext(CreativesContext);

  const {
    state: { role, user, token },
  } = useContext(AuthContext);

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

  return { creatives, loading, loadMore, searchCreatives, searchCreativesAdvanced };
};

export default useCreatives;
