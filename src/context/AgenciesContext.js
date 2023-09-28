import api from "../api/api";
import createDataContext from "./createDataContext";

api.defaults.headers.common["Authorization"] =
  "Bearer 8|Gzdh4rjnn9cCa86aNj83yhJh3wUmxp0KmgFE64JGf8c00a62";

const state = { agencies: null };

const reducer = (state, action) => {
  switch (action.type) {
    case "set_agencies":
      return { agencies: action.payload.data };
    default:
      return state;
  }
};

const getAgencies = (dispatch) => {
  return async () => {
    try {
      const response  = await api.get("/agencies");
      dispatch({
        type: "set_agencies",
        payload: response.data,
      });
    } catch (error) {}
  };
};

export const { Context, Provider } = createDataContext(
  reducer,
  { getAgencies },
  state
);
