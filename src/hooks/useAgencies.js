import { useContext, useEffect } from "react";
import { Context as AgenciesContext } from "../context/AgenciesContext";

const useAgencies = (page) => {
  const {
    state: { agencies, nextPage, loading },
    getAgencies,
    loadAgencies,
    searchAgencies,
  } = useContext(AgenciesContext);

  useEffect(() => {
    getAgencies(page);
  }, []);

  const loadMore = () => {
    if (nextPage) loadAgencies(nextPage);
  };

  return { agencies, loading, loadMore, searchAgencies };
};

export default useAgencies;
