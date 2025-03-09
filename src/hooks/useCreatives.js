import { useContext, useEffect } from "react";
import { Context as CreativesContext } from "../context/CreativesContext";
import { Context as AuthContext } from "../context/AuthContext";

const useCreatives = (page) => {
  const {
    state: {
      creatives,
      home_creatives,
      search_creatives,
      group_invite_members,
      group_invite_members_nextPage,
      nextPage,
      loading
    },
    getCreatives,
    getHomeCreatives,
    loadCreatives,
    loadSearchCreatives,
    searchCreatives,
    searchCreativesAdvanced,
    searchCreativesFull,
    getGroupInviteMembers,
    searchGroupInviteMember,
    loadGroupInviteMember
  } = useContext(CreativesContext);

  const {
    state: { role, user, token },
  } = useContext(AuthContext);

  useEffect(() => {
    if (page == "home") {
      getHomeCreatives();
    } else if (page == "creative") {
      //getCreatives();
    } else if (page == "creatives-search") {
      // do nothing
    }
  }, []);

  const loadMore = () => {
    if (page == "invite-members") {
      if (group_invite_members_nextPage) {
        loadGroupInviteMember(group_invite_members_nextPage);
      }
    } else if (nextPage) {
      if (page == "creatives-search") {
        loadSearchCreatives(nextPage);
      } else {
        loadCreatives(nextPage);
      }
    }
  };

  return {
    creatives,
    home_creatives,
    search_creatives,
    getCreatives,
    getHomeCreatives,
    loading,
    loadMore,
    searchCreatives,
    searchCreativesAdvanced,
    searchCreativesFull,
    group_invite_members,
    getGroupInviteMembers,
    searchGroupInviteMember
  };
};

export default useCreatives;
