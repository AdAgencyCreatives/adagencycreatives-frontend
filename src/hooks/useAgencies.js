import { useContext, useEffect } from "react";
import { Context as AgenciesContext } from "../context/AgenciesContext";

const useAgencies = () => {
  const {
    state: { agencies },
    getAgencies,
  } = useContext(AgenciesContext);

  useEffect(() => {
    getAgencies();
  }, []);

  return agencies;
};

export default useAgencies;