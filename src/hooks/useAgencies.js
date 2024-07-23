import { useContext, useEffect } from "react";
import { Context as AgenciesContext } from "../context/AgenciesContext";
import { useState } from "react";

const useAgencies = (page, role) => {
  const {
    state: { agencies, nextPage, loading },
    getAgencies,
    getFeaturedAgencies,
    loadAgencies,
    searchAgencies,
    agencySearch1,
    agencySearch2,
    getAgencieRoles,
  } = useContext(AgenciesContext);

  const [loadedAll, setLoadedAll] = useState(false)

  useEffect(() => {
    if (page == 'agency-search') {
      return;
    }

    if (role) {
      getAgencieRoles(page, role);
    } else if (page == "home") {
      getFeaturedAgencies();
    }
  }, [role]);

  const loadMore = () => {
    if (nextPage) loadAgencies(nextPage);
    else setLoadedAll(true)
  };

  return { agencies, getAgencies, loading, loadMore, loadedAll, searchAgencies, agencySearch1, agencySearch2 };
};

export default useAgencies;
