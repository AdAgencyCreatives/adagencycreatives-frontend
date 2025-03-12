import { useContext, useEffect } from "react";
import { Context as AgenciesContext } from "../context/AgenciesContext";
import { useState } from "react";

const useAgencies = (page, role) => {
  const {
    state: { agencies, home_agencies, nextPage, loading },
    getAgencies,
    getHomeAgencies,
    loadAgencies,
    searchAgencies,
    agencySearch1,
    agencySearch2,
    getAgencyRoles,
  } = useContext(AgenciesContext);

  const [loadedAll, setLoadedAll] = useState(false)

  useEffect(() => {
    if (page == 'agency-search') {
      return;
    }

    if (role) {
      getAgencyRoles(page, role);
    } else if (page == "home") {
      getHomeAgencies();
    }
  }, [role]);

  const loadMore = () => {
    if (nextPage) loadAgencies(nextPage);
    else setLoadedAll(true)
  };

  return { agencies, home_agencies, getAgencies, loading, loadMore, loadedAll, searchAgencies, agencySearch1, agencySearch2 };
};

export default useAgencies;
