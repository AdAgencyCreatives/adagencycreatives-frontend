import api from "../api/api";
import createDataContext from "./createDataContext";

api.defaults.headers.common["Authorization"] =
  "Bearer 8|Gzdh4rjnn9cCa86aNj83yhJh3wUmxp0KmgFE64JGf8c00a62";

const state = { creatives: null };

const reducer = (state, action) => {
  switch (action.type) {
    case "set_creatives":
      return { creatives: action.payload.data };
    default:
      return state;
  }
};

const getCreatives = (dispatch) => {
  return async () => {
    try {
      const response  = await api.get("/creatives");
      dispatch({
        type: "set_creatives",
        payload: response.data,
      });
    } catch (error) {}
  };
};

export const { Context, Provider } = createDataContext(
  reducer,
  { getCreatives },
  state
);
