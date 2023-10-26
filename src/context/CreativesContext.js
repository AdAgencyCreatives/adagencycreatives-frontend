import { api } from "../api/api";
import createDataContext from "./createDataContext";

const state = {
  creatives: null,
  nextPage: null,
  loading: false,
  single_creative: {},
  creative_experience: [],
  creative_education: [],
  stats: null,
  formSubmit: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "set_creatives":
      return {
        ...state,
        creatives: action.payload.data,
        nextPage: action.payload.links.next,
      };
    case "set_single_creative":
      return { ...state, single_creative: action.payload };
    case "set_creative_experience":
      return { ...state, creative_experience: action.payload.data };
    case "set_creative_education":
      return { ...state, creative_education: action.payload.data };
    case "load_creatives":
      return {
        ...state,
        creatives: [...state.creatives, ...action.payload.data],
        nextPage: action.payload.links.next,
      };
    case "set_loading":
      return { ...state, loading: action.payload };
    case "set_form_submit":
      return { ...state, formSubmit: action.payload };
    case "set_stats":
      return { ...state, stats: action.payload.stats };
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

const getCreative = (dispatch) => {
  return async (slug) => {
    try {
      const response = await api.get("/creatives?filter[slug]=" + slug);
      const data = response.data.data[0];
      const uid = data.user_id;
      getCreativeEducation(dispatch, uid);
      getCreativeExperience(dispatch, uid);
      dispatch({
        type: "set_single_creative",
        payload: data,
      });
    } catch (error) {}
  };
};

const getCreativeById = (dispatch) => {
  return async (id) => {
    try {
      const response = await api.get("/creatives?filter[user_id]=" + id);
      const data = response.data.data[0];
      const uid = data.user_id;
      getCreativeEducation(dispatch, uid);
      getCreativeExperience(dispatch, uid);
      dispatch({
        type: "set_single_creative",
        payload: data,
      });
    } catch (error) {}
  };
};

const getCreativeEducation = async (dispatch, uid) => {
  try {
    const response = await api.get("/educations?filter[user_id]=" + uid);
    dispatch({
      type: "set_creative_education",
      payload: response.data,
    });
  } catch (error) {}
};

const getCreativeExperience = async (dispatch, uid) => {
  try {
    const response = await api.get("/experiences?filter[user_id]=" + uid);
    dispatch({
      type: "set_creative_experience",
      payload: response.data,
    });
  } catch (error) {}
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

const saveCreative = (dispatch) => {
  return async (uid, data) => {
    dispatch({
      type: "set_form_submit",
      payload: true,
    });
    try {
      const response = await api.patch("/creative_profile/" + uid, data);
    } catch (error) {}
    dispatch({
      type: "set_form_submit",
      payload: false,
    });
  };
};

const saveResume = (dispatch) => {
  return async (uid, data) => {
    dispatch({
      type: "set_form_submit",
      payload: true,
    });
    try {
      const response = await api.patch("/creative_resume/" + uid, data);
    } catch (error) {}
    dispatch({
      type: "set_form_submit",
      payload: false,
    });
  };
};

const saveCreativeImage = (dispatch) => {
  return async (data) => {
    try {
      const response = await api.post("/attachments", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {}
  };
};

const getStats = (dispatch) => {
  return async () => {
    try {
      const response = await api.get("/creative_stats");
      dispatch({
        type: "set_stats",
        payload: response.data,
      });
    } catch (error) {}
  };
};


export const { Context, Provider } = createDataContext(
  reducer,
  {
    getCreatives,
    getStats,
    loadCreatives,
    getCreative,
    getCreativeById,
    saveCreative,
    saveResume,
    saveCreativeImage,
  },
  state
);
