import {api} from "../api/api";
import createDataContext from "./createDataContext";

const state = { creatives: null, nextPage: null, loading: false };

const reducer = (state, action) => {
  switch (action.type) {
    case "set_creatives":
      return {
        creatives: action.payload.data,
        nextPage: action.payload.links.next,
      };
    case "load_creatives":
      return {
        creatives: [...state.creatives, ...action.payload.data],
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

const getCreatives = (dispatch) => {
  return async () => {
    try {
      const response = await api.get("/creatives");
      dispatch({
        type: "set_creatives",
        payload: response.data,
      });
    } catch (error) {}
  };
};

const loadCreatives = (dispatch) => {
  return async (page) => {
    dispatch({
      type: "set_loading",
      payload: true,
    });
    try {
      const response = await api.get(page);
      dispatch({
        type: "load_creatives",
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
  { getCreatives, loadCreatives },
  state
);
