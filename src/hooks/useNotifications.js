import { useContext, useEffect } from "react";
import { Context as NotificationsContext } from "../context/NotificationsContext";
import { Context as AuthContext } from "../context/AuthContext";

const useNotifications = (page) => {

  const { state: { user } } = useContext(AuthContext);

  const {
    state: { notifications, nextPage, loading, meta },
    getNotifications, loadNotifications, updateNotifications, getLoungeNotifications,
  } = useContext(NotificationsContext);

  useEffect(() => {
    if(user) {
      if(page && page=='lounge') {
        getLoungeNotifications(user.uuid);
      } else {
        getNotifications(user.uuid);
      }
    }
    
  }, [user]);

  const loadMore = () => {
    nextPage && loadNotifications(nextPage);
  };

  return { notifications, loading, meta, loadMore, updateNotifications, getNotifications, getLoungeNotifications };
};

export default useNotifications;
