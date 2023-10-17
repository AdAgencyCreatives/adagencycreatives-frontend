import { api } from "../api/api";
import createDataContext from "./createDataContext";

const state = {
  agencies: null,
  nextPage: null,
  loading: false,
  single_agency: {},
  open_positions: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "set_agencies":
      return {
        ...state,
        agencies: action.payload.data,
        nextPage: action.payload.links.next,
      };
    case "set_single_agency":
      return {
        ...state,
        single_agency: action.payload,
      };
    case "set_open_positions":
      return {
        ...state,
        open_positions: action.payload.data,
      };
    case "load_agencies":
      return {
        ...state,
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

const getAgency = (dispatch) => {
  return async (slug) => {
    try {
      const response = await api.get("/agencies?filter[slug]=" + slug);
      const data = response.data.data[0];
      const uid = data.user_id;
      getOpenPositions(dispatch, uid);
      dispatch({
        type: "set_single_agency",
        payload: data,
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

const getOpenPositions = async (dispatch, uid) => {
  try {
    const response = await api.get("/jobs?filter[user_id]=" + uid);
    const data = response.data;
    dispatch({
      type: "set_open_positions",
      payload: data,
    });
  } catch (error) {}
};

export const { Context, Provider } = createDataContext(
  reducer,
  { getAgencies, loadAgencies, getAgency },
  state
);
