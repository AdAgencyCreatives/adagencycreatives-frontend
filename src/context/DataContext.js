import { api } from "../api/api";
import createDataContext from "./createDataContext";

const state = {
  categories: [],
  categories_creative_count:[],
  states: [],
  cities: [],
  employment_type: [],
  media_experiences: [],
  industry_experiences: [],
  strengths: [],
  years_experience: [],
  bookmarks: [],
  reviews: [],
  featured_cities: [],
  reviewsMeta: {},
  mentors: [],
  resources: [],
  publications: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case "set_categories":
      return { ...state, categories: action.payload.data };
      case "set_categories_creative_count":
      return { ...state, categories_creative_count: action.payload.data };
    case "set_states":
      return { ...state, states: action.payload.data };
    case "set_cities":
      return { ...state, cities: action.payload.data };
    case "set_featured_cities":
      return { ...state, featured_cities: action.payload };
    case "set_employment_type":
      return { ...state, employment_type: action.payload };
    case "set_media_experiences":
      return { ...state, media_experiences: action.payload.data };
    case "set_industry_experiences":
      return { ...state, industry_experiences: action.payload.data };
    case "set_strengths":
      return { ...state, strengths: action.payload.data };
    case "set_mentors":
      return { ...state, mentors: action.payload.data };
    case "set_resources":
      return { ...state, resources: action.payload.data };
    case "set_publications":
      return { ...state, publications: action.payload.data };
    case "set_years_experience":
      return { ...state, years_experience: action.payload.data };
    case "set_bookmarks":
      return { ...state, bookmarks: action.payload.data };
    case "add_bookmark":
      return { ...state, bookmarks: [...state.bookmarks, action.payload.data] };
    case "set_reviews":
      return { ...state, reviews: action.payload.data };
    case "set_reviews_meta":
      return { ...state, reviewsMeta: action.payload.meta };
    case "add_review":
      return { ...state, reviews: [...state.reviews, action.payload.data] };
    case "update_review":
      return {
        ...state,
        reviews: state.reviews.filter((item) =>
          item.user_id == action.payload.data.user_id
            ? action.payload.data
            : item
        ),
      };
    case "delete_review":
      return {
        ...state,
        reviews: state.reviews.filter(
          (item) => item.user_id != action.payload.data.user_id
        ),
      };
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


const getCategoriesCreativeCount = (dispatch) => {
  return async () => {
    try {
      const response = await api.get("/get_categories/creative_count");
      dispatch({
        type: "set_categories_creative_count",
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

const getFeaturedCities = (dispatch) => {
  return async () => {
    try {
      const response = await api.get("/featured_cities");
      dispatch({
        type: "set_featured_cities",
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
  return async (uuid,type) => {
    try {
      const response = await api.get("/bookmarks?filter[user_id]=" + uuid + "&resource_type=" + type);
      dispatch({
        type: "set_bookmarks",
        payload: response.data,
      });
    } catch (error) {}
  };
};

const checkShortlist = (dispatch) => {
  return async (uid, resource_id, type) => {
    try {
      const response = await api.get(
        `/bookmarks?filter[user_id]=${uid}&resource_id=${resource_id}&resource_type=${type}`
      );
      return response.data.data;
    } catch (error) {
      return false;
    }
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
      return response.data;
    } catch (error) {
      return false;
    }
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

const getReviews = (dispatch) => {
  return async (target_id) => {
    try {
      const response = await api.get(
        "/reviews?filter[target_id]=" + target_id + "&sort=-created_at"
      );
      // console.log(response);
      dispatch({
        type: "set_reviews",
        payload: response?.data ?? [],
      });
      dispatch({
        type: "set_reviews_meta",
        payload: response?.data ?? {},
      });
    } catch (error) {}
  };
};

const postReview = (dispatch) => {
  return async (review) => {
    try {
      const response = await api.post("/reviews", review);
      dispatch({
        type: "add_review",
        payload: response.data,
      });
    } catch (error) {}
  };
};

const updateReview = (dispatch) => {
  return async (target_id, review) => {
    try {
      const response = await api.patch("/reviews/" + target_id, review);
      dispatch({
        type: "update_review",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const deleteReview = (dispatch) => {
  return async (target_id, review) => {
    try {
      const response = await api.delete("/reviews/" + target_id);
      dispatch({
        type: "delete_review",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const getMentorTopics = (dispatch) => {
  return async (slug) => {
    try {
      const response = await api.get(`/topics?filter[slug]=${slug}`);
      dispatch({
        type: "set_mentors",
        payload: response.data,
      });
    } catch (error) {}
  };
};

const getMentorResources = (dispatch) => {
  return async (slug) => {
    try {
      const response = await api.get(`/mentor-resources?filter[topic]=${slug}`);
      dispatch({
        type: "set_resources",
        payload: response.data,
      });
    } catch (error) {}
  };
};

const getPublications = (dispatch) => {
  return async () => {
    try {
      const response = await api.get('/publication-resources');
      dispatch({
        type: "set_publications",
        payload: response.data,
      });
    } catch (error) {}
  };
};

export const { Context, Provider } = createDataContext(
  reducer,
  {
    getCategories,
    getCategoriesCreativeCount,
    getStates,
    getCities,
    getFeaturedCities,
    getEmploymentTypes,
    getMediaExperiences,
    getIndustryExperiences,
    getYearsExperience,
    getStrengths,
    getBookmarks,
    checkShortlist,
    createBookmark,
    removeBookmark,
    getReviews,
    postReview,
    updateReview,
    deleteReview,
    getMentorTopics,
    getMentorResources,
    getPublications
  },
  state
);
