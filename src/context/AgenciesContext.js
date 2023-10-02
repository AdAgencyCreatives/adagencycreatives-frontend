import api from "../api/api";
import createDataContext from "./createDataContext";

api.defaults.headers.common["Authorization"] =
  "Bearer 8|Gzdh4rjnn9cCa86aNj83yhJh3wUmxp0KmgFE64JGf8c00a62";

const state = { agencies: null, nextPage: null, loading: false };

const reducer = (state, action) => {
  switch (action.type) {
    case "set_agencies":
      return {
        agencies: action.payload.data,
        nextPage: action.payload.links.next,
      };
    case "load_agencies":
      return {
        agencies: [...state.agencies, ...action.payload.data],
        nextPage: action.payload.links.next,
      };
    case "set_loading":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

const getAgencies = (dispatch) => {
  return async () => {
    try {
      const response = await api.get("/agencies");
      dispatch({
        type: "set_agencies",
        payload: response.data,
      });
    } catch (error) {}
  };
};

const loadAgencies = (dispatch) => {
  return async (page) => {
    dispatch({
      type: "set_loading",
      payload: true,
    });
    try {
      const response = await api.get(page);
      dispatch({
        type: "load_agencies",
        payload: response.data,
      });
      dispatch({
        type: "set_loading",
        payload: false,
      });
    } catch (error) {}
  };
};

export const { Context, Provider } = createDataContext(
  reducer,
  { getAgencies, loadAgencies },
  state
);
