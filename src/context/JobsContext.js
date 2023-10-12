import { api } from "../api/api";
import createDataContext from "./createDataContext";

const state = {
  jobs: [],
  meta: {},
  links: {},
  categories: [],
  states: [],
  cities: [],
  employment_type: [],
  media_experiences: [],
  filters: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "set_jobs":
      return { ...state, jobs: action.payload.data, meta: action.payload.meta };
    case "set_categories":
      return { ...state, categories: action.payload.data };
    case "set_filters":
      return { ...state, filters: action.payload };
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

const getFeaturedJobs = (dispatch) => {
  return async () => {
    try {
      const response = await api.get(
        "/jobs?filter[is_featured]=1&filter[is_urgent]=1"
      );
      console.log({ response });
      dispatch({
        type: "set_jobs",
        payload: response.data,
      });
    } catch (error) {}
  };
};

const getJobs = (dispatch) => {
  return async () => {
    try {
      const response = await api.get("/jobs");
      console.log({ response });
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
      const response = await api.get("/get_categories");
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

const paginateJob = (dispatch) => {
  return async (page) => {
    try {
      const response = await api.get("/jobs?page=" + page);
      dispatch({
        type: "set_jobs",
        payload: response.data,
      });
    } catch (error) {}
  };
};

const filterJobs = (dispatch) => {
  return async (filters) => {
    console.log({ filters });
    dispatch({
      type: "set_filters",
      payload: filters,
    });
    let filter = getFilters(filters);
    try {
      const response = await api.get("/jobs?" + filter);
      dispatch({
        type: "set_jobs",
        payload: response.data,
      });
    } catch (error) {}
  };
};

const getFilters = (filters) => {
  let filter =
    "filter[category_id]=" + (filters.title ? filters.title.value : "");
  filter += "&filter[state_id]=" + (filters.state ? filters.state.value : "");
  filter += "&filter[city_id]=" + (filters.city ? filters.city.value : "");
  filter +=
    "&filter[employment_type]=" +
    (filters.employment_type ? filters.employment_type.value : "");
  filter +=
    "&filter[is_remote]=" + (filters.remote ? filters.remote.value : "");
  // filter += "filter[media_experience]=" + filters.state.value;
  // filter += "filter[state_id]=" + filters.state.value;

  return filter;
};

export const { Context, Provider } = createDataContext(
  reducer,
  {
    getJobs,
    getFeaturedJobs,
    getCategories,
    getStates,
    getCities,
    getEmploymentTypes,
    getMediaExperiences,
    filterJobs,
    paginateJob,
  },
  state
);
