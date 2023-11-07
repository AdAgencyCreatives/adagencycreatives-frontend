import {api} from "../api/api";
import createDataContext from "./createDataContext";

const state = { screatives: null, nextPage: null, loading: false };

const reducer = (state, action) => {
  switch (action.type) {
    case "set_screatives":
      return {
        screatives: action.payload.data,
        nextPage: action.payload.links.next,
      };
    case "load_screatives":
      return {
        screatives: [...state.screatives, ...action.payload.data],
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

const getSCreatives = (dispatch) => {
  return async () => {
    try {
      const response = await api.get("/creative-spotlights");
      dispatch({
        type: "set_screatives",
        payload: response.data,
      });
    } catch (error) {}
  };
};

const loadSCreatives = (dispatch) => {
  return async (page) => {
    dispatch({
      type: "set_loading",
      payload: true,
    });
    try {
      const response = await api.get(page);
      dispatch({
        type: "load_screatives",
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
  { getSCreatives, loadSCreatives },
  state
);
