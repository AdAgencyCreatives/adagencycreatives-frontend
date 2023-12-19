import { useContext, useEffect } from "react";
import { Context as NotificationsContext } from "../context/NotificationsContext";
import { Context as AuthContext } from "../context/AuthContext";

const useNotifications = () => {

  const {
    state: { role, user, token },
  } = useContext(AuthContext);

  const {
    state: { notifications, nextPage, loading },
    getNotifications, loadNotifications, updateNotifications,
  } = useContext(NotificationsContext);

  useEffect(() => {
    if(user) {
        getNotifications(user.uuid);
    }
  }, [user]);

  const loadMore = () => {
    if (nextPage) loadNotifications(nextPage);
  };

  return { notifications, loading, loadMore, updateNotifications };
};

export default useNotifications;
