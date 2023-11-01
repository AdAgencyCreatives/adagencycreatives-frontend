import { useContext, useEffect } from "react";
import { Context as AgenciesContext } from "../context/AgenciesContext";

const useAgencies = () => {
  const {
    state: { agencies, nextPage, loading },
    getAgencies,
    loadAgencies,
    searchAgencies,
  } = useContext(AgenciesContext);

  useEffect(() => {
    getAgencies();
  }, []);

  const loadMore = () => {
    if (nextPage) loadAgencies(nextPage);
  };

  return { agencies, loading, loadMore, searchAgencies };
};

export default useAgencies;
