import { api } from "../api/api";
import createDataContext from "./createDataContext";

const state = {
  notifications: null,
  nextPage: null,
  loading: false,
  meta: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "set_notifications":
      return {
        ...state,
        notifications: action.payload.data,
        nextPage: action.payload.links.next,
        meta: action.payload.meta,
      };
    case "update_notifications":
      return {
        ...state,
        notifications: action.payload,
      };
    case "load_notifications":
      return {
        ...state,
        notifications: [...state.notifications, ...action.payload.data],
        nextPage: action.payload.links.next,
      };
    case "set_loading":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const getNotifications = (dispatch) => {
  return async (user_id, page = false) => {
    setLoading(dispatch, true);
    try {
      const response = await api.get("/notifications?sort=-created_at&status=0&filter[type]=job_alert,job_board&filter[user_id]=" + user_id + (page ? "&page=" + page : ""));
      dispatch({
        type: "set_notifications",
        payload: response.data,
      });
    } catch (error) { }
    setLoading(dispatch, false);
  };
};

const getLoungeNotifications = (dispatch) => {
  return async (user_id, page = false) => {
    setLoading(dispatch, true);
    try {
      const response = await api.get("/notifications?sort=-created_at&status=0&filter[type]=lounge_friendship_requested,lounge_friendship_responded,lounge_group_request_responded,lounge_mention&filter[user_id]=" + user_id + (page ? "&page=" + page : ""));
      dispatch({
        type: "set_notifications",
        payload: response.data,
      });
    } catch (error) { }
    setLoading(dispatch, false);
  };
};

const loadNotifications = (dispatch) => {
  return async (page) => {
    setLoading(dispatch, true);
    try {
      const response = await api.get(page);
      dispatch({
        type: "load_notifications",
        payload: response.data,
      });
    } catch (error) { }
    setLoading(dispatch, false);
  };
};

const setLoading = (dispatch, status) => {
  dispatch({
    type: "set_loading",
    payload: status,
  });
};

const updateNotifications = (dispatch) => {
  return async (notification_id) => {
    setLoading(dispatch, true);
    try {
      const response = await api.patch(`/notifications/${notification_id}`);
      // dispatch({
      //   type: "set_notifications",
      //   payload: response.data,
      // });
    } catch (error) { }
    setLoading(dispatch, false);
  };
};

export const { Context, Provider } = createDataContext(
  reducer,
  {
    getNotifications,
    loadNotifications,
    updateNotifications,
    getLoungeNotifications,
  },
  state
);
