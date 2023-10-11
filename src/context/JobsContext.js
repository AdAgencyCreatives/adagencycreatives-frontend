import api from "../api/api";
import createDataContext from "./createDataContext";

const state = {
  jobs: [],
  categories: [],
  states: [],
  cities: [],
  employment_type: [],
  media_experiences: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "set_jobs":
      return { ...state, jobs: action.payload.data };
    case "set_categories":
      return { ...state, categories: action.payload.data };
    case "set_states":
      return { ...state, states: action.payload.data };
    case "set_cities":
      return { ...state, cities: action.payload.data };
    case "set_employment_type":
      return { ...state, employment_type: action.payload };
    case "set_media_experiences":
      return { ...state, media_experiences: action.payload.data };
    default:
      return state;
  }
};

const getJobs = (dispatch) => {
  return async () => {
    try {
      const response = await api.get(
        "/jobs?filter[is_featured]=1&filter[is_urgent]=1"
      );
      dispatch({
        type: "set_jobs",
        payload: response.data,
      });
    } catch (error) {}
  };
};

const getCategories = (dispatch) => {
  return async () => {
    try {
      const response = await api.get("/categories");
      dispatch({
        type: "set_categories",
        payload: response.data,
      });
    } catch (error) {}
  };
};

const getStates = (dispatch) => {
  return async () => {
    try {
      const response = await api.get("/locations");
      dispatch({
        type: "set_states",
        payload: response.data,
      });
    } catch (error) {}
  };
};

const getCities = (dispatch) => {
  return async (uuid) => {
    try {
      const response = await api.get("/locations?filter[state_id]=" + uuid);
      dispatch({
        type: "set_cities",
        payload: response.data,
      });
    } catch (error) {}
  };
};

const getEmploymentTypes = (dispatch) => {
  return async (uuid) => {
    try {
      const response = await api.get("/employment_types");
      dispatch({
        type: "set_employment_type",
        payload: response.data,
      });
    } catch (error) {}
  };
};

const getMediaExperiences = (dispatch) => {
  return async (uuid) => {
    try {
      const response = await api.get("/media-experiences");
      dispatch({
        type: "set_media_experiences",
        payload: response.data,
      });
    } catch (error) {}
  };
};

export const { Context, Provider } = createDataContext(
  reducer,
  {
    getJobs,
    getCategories,
    getStates,
    getCities,
    getEmploymentTypes,
    getMediaExperiences,
  },
  state
);
