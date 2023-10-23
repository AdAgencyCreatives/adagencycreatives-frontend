import { api } from "../api/api";
import createDataContext from "./createDataContext";

const state = { messages: [], contacts: [], loading: false };

const reducer = (state, action) => {
  switch (action.type) {
    case "set_messages":
      return { ...state, messages: action.payload.data.messages };
    case "set_contacts":
      return { ...state, contacts: action.payload.contacts };
    case "set_loading":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const getMessages = (dispatch) => {
  return async (id) => {
    try {
      const response = await api.get("/messages/" + id);
      dispatch({
        type: "set_messages",
        payload: response.data,
      });
    } catch (error) {}
  };
};

const getContacts = (dispatch) => {
  return async (user_id) => {
    try {
      const response = await api.get("/my-contacts");
      dispatch({
        type: "set_contacts",
        payload: response.data,
      });
    } catch (error) {}
  };
};

const sendMessage = (dispatch) => {
  return async (sender_id, receiver_id, message, cb = () => {}) => {
    setLoading(dispatch, true);
    try {
      const response = await api.post("/messages", {
        sender_id,
        receiver_id,
        message,
      });
    } catch (error) {}
    setLoading(dispatch, false);
    cb();
  };
};

const setLoading = (dispatch, status) => {
  dispatch({
    type: "set_loading",
    payload: status,
  });
};

export const { Context, Provider } = createDataContext(
  reducer,
  { getMessages, getContacts, sendMessage },
  state
);
