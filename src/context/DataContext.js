import { api } from "../api/api";
import createDataContext from "./createDataContext";

const state = {
  categories: [],
  states: [],
  cities: [],
  employment_type: [],
  media_experiences: [],
  industry_experiences: [],
  strengths: [],
  years_experience: [],
  bookmarks: [],
};

const reducer = (state, action) => {
  switch (action.type) {
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
    case "set_industry_experiences":
      return { ...state, industry_experiences: action.payload.data };
    case "set_strengths":
      return { ...state, strengths: action.payload.data };
    case "set_years_experience":
      return { ...state, years_experience: action.payload.data };
    case "set_bookmarks":
      return { ...state, bookmarks: action.payload.data };
    case "add_bookmark":
      return { ...state, bookmarks: [...state.bookmarks, action.payload.data] };
    case "remove_bookmark":
      return {
        ...state,
        bookmarks: state.bookmarks.filter((item) => item.id != action.payload),
      };
    default:
      return state;
  }
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
      const response = await api.get("/locations?per_page=-1");
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
      const response = await api.get(
        "/locations?per_page=-1&filter[state_id]=" + uuid
      );
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

const getYearsExperience = (dispatch) => {
  return async (uuid) => {
    try {
      const response = await api.get("/years-of-experience");
      dispatch({
        type: "set_years_experience",
        payload: response.data,
      });
    } catch (error) {}
  };
};

const getMediaExperiences = (dispatch) => {
  return async (uuid) => {
    try {
      const response = await api.get("/get_media-experiences");
      dispatch({
        type: "set_media_experiences",
        payload: response.data,
      });
    } catch (error) {}
  };
};

const getStrengths = (dispatch) => {
  return async () => {
    try {
      const response = await api.get("/get_strengths");
      dispatch({
        type: "set_strengths",
        payload: response.data,
      });
    } catch (error) {}
  };
};

const getIndustryExperiences = (dispatch) => {
  return async (uuid) => {
    try {
      const response = await api.get("/get_industry-experiences");
      dispatch({
        type: "set_industry_experiences",
        payload: response.data,
      });
    } catch (error) {}
  };
};

const getBookmarks = (dispatch) => {
  return async (uuid) => {
    try {
      const response = await api.get("/bookmarks?filter[user_id]="+uuid);
      dispatch({
        type: "set_bookmarks",
        payload: response.data,
      });
    } catch (error) {}
  };
};

const createBookmark = (dispatch) => {
  return async (user_id, resource_type, resource_id) => {
    try {
      const response = await api.post("/bookmarks", {
        user_id,
        resource_type,
        resource_id,
      });
      dispatch({
        type: "add_bookmark",
        payload: response.data,
      });
    } catch (error) {}
  };
};

const removeBookmark = (dispatch) => {
  return async (id) => {
    try {
      const response = await api.delete("/bookmarks/" + id);
      dispatch({
        type: "remove_bookmark",
        payload: id,
      });
    } catch (error) {}
  };
};

export const { Context, Provider } = createDataContext(
  reducer,
  {
    getCategories,
    getStates,
    getCities,
    getEmploymentTypes,
    getMediaExperiences,
    getIndustryExperiences,
    getYearsExperience,
    getStrengths,
    getBookmarks,
    createBookmark,
    removeBookmark,
  },
  state
);
