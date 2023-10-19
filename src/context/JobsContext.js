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
  single_job: {},
  related_jobs: [],
  formSubmit: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "set_jobs":
      return { ...state, jobs: action.payload.data, meta: action.payload.meta };
    case "set_single_job":
      return { ...state, single_job: action.payload };
    case "delete_job":
      return {
        ...state,
        jobs: state.jobs.filter((job) => job.id != action.payload),
      };
    case "set_related_jobs":
      const related_jobs = action.payload.data.filter((item) => {
        return item.id !== state.single_job.id;
      });
      return { ...state, related_jobs: related_jobs };
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
    case "set_form_submit":
      return {
        ...state,
        formSubmit: action.payload,
      };
    default:
      return state;
  }
};

const getFeaturedJobs = (dispatch) => {
  return async () => {
    try {
      const response = await api.get(
        "/jobs?filter[is_featured]=1&filter[is_urgent]=1&filter[status]=1"
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
      const response = await api.get("/jobs?filter[status]=1");
      console.log({ response });
      dispatch({
        type: "set_jobs",
        payload: response.data,
      });
    } catch (error) {}
  };
};

const getJob = (dispatch) => {
  return async (slug) => {
    try {
      const response = await api.get("/jobs?filter[slug]=" + slug);
      getRelatedJobs(dispatch, response.data.data[0].category_id);
      dispatch({
        type: "set_single_job",
        payload: response.data.data[0],
      });
    } catch (error) {}
  };
};

const getJobById = (dispatch) => {
  return async (id) => {
    try {
      const response = await api.get("/jobs/" + id);
      dispatch({
        type: "set_single_job",
        payload: response.data.data,
      });
    } catch (error) {}
  };
};

const getRelatedJobs = async (dispatch, category) => {
  try {
    const response = await api.get(
      "/jobs?filter[status]=1&filter[category_id]=" + category
    );
    dispatch({
      type: "set_related_jobs",
      payload: response.data,
    });
  } catch (error) {}
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

const paginateJob = (dispatch) => {
  return async (page, filters) => {
    try {
      let filter = getFilters(filters);
      const response = await api.get(
        "/jobs?filter[status]=1&" + filter + "&page=" + page
      );
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
      const response = await api.get("/jobs?filter[status]=1&" + filter);
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
  if (filters.media_experience) {
    filter += "&filter[media_experience]=";
    filters.media_experience.forEach((element) => {
      filter += element.value + ",";
    });
  }

  return filter;
};

const requestNotifications = (dispatch) => {
  return async (uid, cat_id) => {
    try {
      const response = await api.post("/job-alerts", {
        user_id: uid,
        category_id: cat_id,
        status: 1,
      });
      alert("Job notifications enabled successfully");
    } catch (error) {}
  };
};

const saveJob = (dispatch) => {
  return async (uid, data) => {
    setFormSubmit(dispatch, true);
    try {
      const response = await api.patch("/jobs/" + uid, data);
    } catch (error) {}
    setFormSubmit(dispatch, false);
  };
};

const createJob = (dispatch) => {
  return async (data) => {
    setFormSubmit(dispatch, true);
    try {
      const response = await api.post("/jobs/", data);
    } catch (error) {}
    setFormSubmit(dispatch, false);
  };
};

const deleteJob = (dispatch) => {
  return async (id) => {
    try {
      const response = await api.delete("/jobs/" + id);
      dispatch({
        type: "delete_job",
        payload: id,
      });
    } catch (error) {}
  };
};

const setFormSubmit = (dispatch, state) => {
  dispatch({
    type: "set_form_submit",
    payload: state,
  });
};

export const { Context, Provider } = createDataContext(
  reducer,
  {
    getJobs,
    getJob,
    getJobById,
    deleteJob,
    getFeaturedJobs,
    getCategories,
    getStates,
    getCities,
    getEmploymentTypes,
    getMediaExperiences,
    filterJobs,
    paginateJob,
    requestNotifications,
    saveJob,
    createJob
  },
  state
);
