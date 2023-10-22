import { api } from "../api/api";
import createDataContext from "./createDataContext";

const state = { subscription: null, status: false };

const reducer = (state, action) => {
  switch (action.type) {
    case "set_subscription":
      return { ...state, subscription: action.payload };
    case "set_status":
      return { ...state, status: action.payload };
    default:
      return state;
  }
};

const getSubscription = (dispatch) => {
  return async () => {
    setStatus(dispatch, true);
    try {
      const response = await api.get("/subscription/status");
      if (response.data.message != "No subscription found")
        dispatch({
          type: "set_subscription",
          payload: response.data.data,
        });
      else {
        dispatch({
          type: "set_subscription",
          payload: [],
        });
      }
    } catch (error) {
      dispatch({
        type: "set_subscription",
        payload: [],
      });
    }
    setStatus(dispatch, false);
  };
};

const setStatus = (dispatch, status) => {
  dispatch({
    type: "set_status",
    payload: status,
  });
};

export const { Context, Provider } = createDataContext(
  reducer,
  { getSubscription },
  state
);
