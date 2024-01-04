import { useContext, useEffect } from "react";
import { Context as NotificationsContext } from "../context/NotificationsContext";
import { Context as AuthContext } from "../context/AuthContext";

const useNotifications = () => {

  const { state: { user } } = useContext(AuthContext);

  const {
    state: { notifications, nextPage, loading, meta },
    getNotifications, loadNotifications, updateNotifications,
  } = useContext(NotificationsContext);

  useEffect(() => {
    user && getNotifications(user.uuid);
  }, [user]);

  const loadMore = () => {
    nextPage && loadNotifications(nextPage);
  };

  return { notifications, loading, meta, loadMore, updateNotifications, getNotifications };
};

export default useNotifications;
