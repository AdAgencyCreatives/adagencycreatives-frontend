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
  applications: [],
  recent_applications: [],
  formSubmit: false,
  isLoading: false,
  notes: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "set_jobs":
      return { ...state, jobs: action.payload.data, meta: action.payload.meta };
    case "set_applications":
      return { ...state, applications: action.payload };
    case "set_recent_applications":
      return { ...state, recent_applications: action.payload.data };
    case "delete_application": {
      const app_id = action.payload.app_id;
      const job_id = action.payload.job_id;
      let jobIndex = state.applications.findIndex((job) => job.id === job_id);
      const updatedJob = { ...state.applications[jobIndex] };
      let updatedApplications = updatedJob.applications.filter(
        (app) => app.id !== app_id
      );
      updatedJob.applications = updatedApplications;
      const updatedData = [...state.applications];
      updatedData[jobIndex] = { ...updatedJob };
      return { ...state, applications: updatedData };
    }
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
    case "set_notes":
      return { ...state, notes: action.payload.data };
    case "set_form_submit":
      return { ...state, formSubmit: action.payload };
    case "set_loading":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

const status = 0;

const getFeaturedJobs = (dispatch) => {
  return async () => {
    try {
      const response = await api.get(
        "/jobs?filter[is_featured]=1&filter[is_urgent]=1&filter[status]="+status
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
      const response = await api.get("/jobs?filter[status]="+status);
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
      "/jobs?filter[status]="+status+"&filter[category_id]=" + category
    );
    dispatch({
      type: "set_related_jobs",
      payload: response.data,
    });
  } catch (error) {}
};

const getApplications = (dispatch) => {
  return async (uid) => {
    let applications = [];
    setLoading(dispatch, true);
    try {
      const response = await api.get(
        "/jobs?filter[status]="+status+"&filter[user_id]=" + uid
      ); // have to set filter[status]=1 later
      const jobs = response.data.data;
      for (const job of jobs) {
        const response2 = await api.get(
          "applications?filter[job_id]=" + job.id
        );
        const data = response2.data.data;
        job.applications = data;
        applications.push(job);

        dispatch({
          type: "set_applications",
          payload: applications,
        });
      }
    } catch (error) {}
    setLoading(dispatch, false);
  };
};

const getRecentApplications = (dispatch) => {
  return async (uid) => {
    setLoading(dispatch, true);
    try {
      const response = await api.get("applications?filter[user_id]=" + uid);
      dispatch({
        type: "set_recent_applications",
        payload: response.data,
      });
    } catch (error) {}
    setLoading(dispatch, false);
  };
};

const updateApplication = (dispatch) => {
  return async (id, data, cb = false) => {
    try {
      const response = await api.patch("/applications/" + id, data);
      cb && cb();
    } catch (error) {}
  };
};

const deleteApplication = (dispatch) => {
  return async (id) => {
    try {
      const response = await api.delete("/applications/" + id);
      const job_id = response.data.data.job_id;
      dispatch({
        type: "delete_application",
        payload: { app_id: id, job_id },
      });
    } catch (error) {}
  };
};

const addNote = (dispatch) => {
  return async (data) => {
    try {
      const response = await api.post("/notes", data);
    } catch (error) {}
  };
};

const getNotes = (dispatch) => {
  return async (id) => {
    try {
      const response = await api.get("/notes/" + id);
      dispatch({
        type: "set_notes",
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
        "/jobs?filter[status]="+status+"&" + filter + "&page=" + page
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
      const response = await api.get("/jobs?filter[status]="+status+"&" + filter);
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

/* const publishJob = (dispatch) => {
  return async (uid, data) => {
    setFormSubmit(dispatch, true);
    try {
      const response = await api.patch("/subscription/status");
      if(response.data.message == "No subscription found"){

      }
    } catch (error) {}
    setFormSubmit(dispatch, false);
  };
}; */

const createJob = (dispatch) => {
  return async (data) => {
    setFormSubmit(dispatch, true);
    try {
      const response = await api.post("/jobs/", data);
      dispatch({
        type: "set_single_job",
        payload: response.data.data,
      });
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

const setLoading = (dispatch, state) => {
  dispatch({
    type: "set_loading",
    payload: state,
  });
};

export const { Context, Provider } = createDataContext(
  reducer,
  {
    getJobs,
    getJob,
    getJobById,
    getApplications,
    getRecentApplications,
    updateApplication,
    deleteApplication,
    deleteJob,
    addNote,
    getNotes,
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
    createJob,
  },
  state
);
