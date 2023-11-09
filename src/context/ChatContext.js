import { api } from "../api/api";
import createDataContext from "./createDataContext";

const state = { messages: [], contacts: [], loading: false };

const reducer = (state, action) => {
  switch (action.type) {
    case "set_messages":
      return { ...state, messages: action.payload.data };
    case "add_message":
      return { ...state, messages: [...state.messages, action.payload.data] };
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
    setLoading(dispatch, true);
    try {
      const response = await api.get("/messages/" + id);
      dispatch({
        type: "set_messages",
        payload: response.data,
      });
    } catch (error) {}
    setLoading(dispatch, false);
  };
};

const getContacts = (dispatch) => {
  return async (type) => {
    try {
      const response = await api.get("/my-contacts?type=" + type);
      dispatch({
        type: "set_contacts",
        payload: response.data,
      });
    } catch (error) {}
  };
};

const sendMessage = (dispatch) => {
  return async (sender_id, receiver_id, message, type, cb = () => {}) => {
    try {
      const response = await api.post("/messages", {
        sender_id,
        receiver_id,
        message,
        type,
      });
      addMessage(dispatch)(response.data);
    } catch (error) {}
    cb();
  };
};

const addMessage = (dispatch) => {
  return (data) => {
    dispatch({
      type: "add_message",
      payload: data,
    });
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
  { getMessages, getContacts, sendMessage, addMessage },
  state
);
