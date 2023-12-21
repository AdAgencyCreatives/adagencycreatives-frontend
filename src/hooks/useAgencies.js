import { useContext, useEffect } from "react";
import { Context as AgenciesContext } from "../context/AgenciesContext";
import { useState } from "react";

const useAgencies = (page, role) => {
  const {
    state: { agencies, nextPage, loading },
    getAgencies,
    loadAgencies,
    searchAgencies,
    getAgencieRoles,
  } = useContext(AgenciesContext);

  const [loadedAll, setLoadedAll] = useState(false)

  useEffect(() => {
    if (role) {
      getAgencieRoles(page, role);
    } else {
      getAgencies(page);
    }
  }, [role]);

  const loadMore = () => {
    if (nextPage) loadAgencies(nextPage);
    else setLoadedAll(true)
  };

  return { agencies, loading, loadMore, loadedAll, searchAgencies };
};

export default useAgencies;
