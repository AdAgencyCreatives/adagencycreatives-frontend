import { useContext, useEffect } from "react";
import { Context as CreativesContext } from "../context/CreativesContext";

const useCreatives = () => {
  const {
    state: { creatives },
    getCreatives,
  } = useContext(CreativesContext);

  useEffect(() => {
    getCreatives();
  }, []);

  return creatives;
};

export default useCreatives;