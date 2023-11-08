import { api } from "../api/api";
import createDataContext from "./createDataContext";

const state = { message: "" };

const reducer = (state, action) => {
  switch (action.type) {
    case "set_message":
      return { ...state, message: action.payload };
    default:
      return state;
  }
};

const showAlert = (dispatch) => {
  return async (message) => {
    dispatch({
      type: "set_message",
      payload: message,
    });
  };
};

const hideAlert = (dispatch) => {
  return async () => {
    dispatch({
      type: "set_message",
      payload: "",
    });
  };
};

export const { Context, Provider } = createDataContext(
  reducer,
  { showAlert,hideAlert },
  state
);
