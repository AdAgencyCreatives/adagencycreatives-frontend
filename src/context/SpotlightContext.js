import { api } from "../api/api";
import createDataContext from "./createDataContext";

const state = { screatives: null, sreel: null, nextPage: null, loading: false };

const reducer = (state, action) => {
  switch (action.type) {
    case "set_screatives":
      return {
        screatives: action.payload.data,
        nextPage: action.payload.links.next,
      };
    case "set_spotlight_reel":
      return {
        sreel: action.payload.data,
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
  return async (keyword = '') => {
    try {
      const response = await api.get(`/creative-spotlights?sort=-updated_at&filter[status]=1&per_page=30&filter[title]=${keyword}`);
      dispatch({
        type: "set_screatives",
        payload: response.data,
      });
    } catch (error) { }
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
    } catch (error) { }
  };
};

const getSpotlight = (dispatch) => {
  return async (slug) => {
    try {
      const response = await api.get(`/creative-spotlights/${slug}`);
      dispatch({
        type: "set_spotlight_reel",
        payload: response.data,
      });
    } catch (error) { 
      dispatch({
        type: "set_spotlight_reel",
        payload: { data: { error: true } }
      });
    }
  };
};

export const { Context, Provider } = createDataContext(
  reducer,
  { getSCreatives, loadSCreatives, getSpotlight },
  state
);
