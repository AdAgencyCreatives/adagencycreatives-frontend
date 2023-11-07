import { useContext, useEffect } from "react";
import { Context as CreativesContext } from "../context/CreativesContext";
import { Context as AuthContext } from "../context/AuthContext";

const useCreatives = () => {
  const {
    state: { creatives, nextPage, loading },
    getCreatives,
    loadCreatives,
    searchCreatives,
  } = useContext(CreativesContext);

  const {
    state: { role, user, token },
  } = useContext(AuthContext);

  useEffect(() => {
    getCreatives();
  }, [user]);

  const loadMore = () => {
    if (nextPage) loadCreatives(nextPage);
  };

  return { creatives, loading, loadMore, searchCreatives };
};

export default useCreatives;
