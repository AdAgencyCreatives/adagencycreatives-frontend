import { useContext, useEffect } from "react";
import { Context as AgenciesContext } from "../context/AgenciesContext";
import { useState } from "react";

const useAgencies = (page, role) => {
  const {
    state: { agencies, nextPage, loading },
    getAgencies,
    loadAgencies,
    searchAgencies,
    agencySearch2,
    getAgencieRoles,
  } = useContext(AgenciesContext);

  const [loadedAll, setLoadedAll] = useState(false)

  useEffect(() => {
    if(page == 'agency-search') {
      return;
    }

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

  return { agencies, loading, loadMore, loadedAll, searchAgencies, agencySearch2 };
};

export default useAgencies;
