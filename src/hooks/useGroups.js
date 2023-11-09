import { useContext, useEffect } from "react";
import { Context as GroupsContext } from "../context/GroupsContext";
import { Context as AuthContext } from "../context/AuthContext";

const useGroups = (page) => {
  const {
    state: { groups, nextPage, loading },
    getGroups,
    loadGroups,
    searchGroups,
  } = useContext(GroupsContext);

  const {
    state: { role, user, token },
  } = useContext(AuthContext);

  useEffect(() => {
    getGroups();
  }, []);

  const loadMore = () => {
    if (nextPage) loadGroups(nextPage);
  };

  return { groups, loading, loadMore, searchGroups };
};

export default useGroups;
