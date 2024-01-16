import { IoReturnUpForwardOutline } from "react-icons/io5";
import { api, getAuthToken } from "../api/api";
import createDataContext from "./createDataContext";

const state = {
  jobs: [],
  meta: {},
  applicationMeta: {},
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
  isLoadingApp: false,
  notes: [],
  job_alerts: [],
  applicationsNextPage: null,
  notesNextPage: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "set_jobs":
      return { ...state, jobs: action.payload.data, meta: action.payload.meta };
    case "set_applications":
      return {
        ...state,
        applications: action.payload.data,
        applicationsNextPage: action.payload.links.next,
        applicationMeta: action.payload.meta
      };
    case "set_nextpage_applications":
      return {
        ...state,
        applications: [...state.applications, ...action.payload],
        // applicationsNextPage: action.payload.links.next
      };
    case "set_recent_applications":
      return { ...state, recent_applications: action.payload.data };
    case "delete_application": {
      const app_id = action.payload.app_id;
      const job_id = action.payload.job_id;
      let jobIndex = state.applications.findIndex((job) => job.id === job_id);
      console.log(app_id, job_id, jobIndex, state.applications);
      const updateJob = { ...state.applications[jobIndex] };
      let updatedApplications = updateJob.applications.filter(
        (app) => app.id !== app_id
      );
      updateJob.applications = updatedApplications;
      const updatedData = [...state.applications];
      updatedData[jobIndex] = { ...updateJob };
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
      return {
        ...state,
        notes: action.payload.data,
        notesNextPage: action.payload.links.next
      };
    case "set_nextpage_notes":
      return {
        ...state,
        notes: [...state.notes, ...action.payload.data],
        notesNextPage: action.payload.links.next
      };
    case "add_note":
      return { ...state, notes: [action.payload.data, ...state.notes] };
    case "set_job_alert":
      return { ...state, job_alerts: action.payload.data };
    case "set_form_submit":
      return { ...state, formSubmit: action.payload };
    case "set_loading":
      return { ...state, isLoading: action.payload };
    case "set_loading_app":
      return { ...state, isLoadingApp: action.payload };
    default:
      return state;
  }
};

const status = 1;

const getFeaturedJobs = (dispatch) => {
  return async () => {
    try {
      const response = await api.get(
        // "/jobs?filter[is_featured]=1&filter[is_urgent]=1&filter[status]="+status
        "/jobs?filter[is_featured]=1&filter[status]=1&per_page=30"
      );
      console.log({ response });
      dispatch({
        type: "set_jobs",
        payload: response.data,
      });
    } catch (error) { }
  };
};

const getJobs = (dispatch) => {
  return async () => {
    try {
      const response = await api.get(
        getJobEndpoint() + "?filter[status]=" + status + "&sort=-created_at"
      );
      dispatch({
        type: "set_jobs",
        payload: response.data,
      });
    } catch (error) { }
  };
};

const searchJobs = (dispatch) => {
  return async (q) => {
    try {
      const token = getAuthToken();
      const response = await api.get(
        "/home/jobs/search" +
        (token ? "/logged_in" : "") +
        "?search=" +
        q +
        "&filter[status]=" +
        status
      );
      dispatch({
        type: "set_jobs",
        payload: response.data,
      });
    } catch (error) { }
  };
};

const getJobEndpoint = () => {
  const token = getAuthToken();
  if (token) return "/jobs/logged_in";
  return "/jobs";
};

const getJob = (dispatch) => {
  return async (slug) => {
    try {
      const response = await api.get(
        getJobEndpoint() + "?filter[slug]=" + slug
      );
      getRelatedJobs(dispatch, response.data.data[0].category_id);
      dispatch({
        type: "set_single_job",
        payload: response.data.data[0],
      });
    } catch (error) { }
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
    } catch (error) { }
  };
};

const getRelatedJobs = async (dispatch, category) => {
  try {
    const response = await api.get(
      "/jobs?filter[status]=" + status + "&filter[category_id]=" + category
    );
    dispatch({
      type: "set_related_jobs",
      payload: response.data,
    });
  } catch (error) { }
};

const getApplications = (dispatch) => {
  return async (uid, applications_count = 0, page = false, status = 1) => {
    let applications = [];
    setLoadingApp(dispatch, true);
    try {
      const response = await api.get(
        "/jobs?sort=-created_at&filter[status]=" + status + "&filter[user_id]=" + uid + "&applications_count=" + applications_count + (page ? "&page=" + page : "")
      ); // have to set filter[status]=1 later
      // const jobs = response.data.data;
      // for (const job of jobs) {
      //   const response2 = await api.get(
      //     "applications?filter[job_id]=" + job.id
      //   );
      //   const data = response2.data.data;
      //   job.applications = data;
      //   applications.push(job);
      //   response2.data.data = applications;
      // }
      dispatch({
        type: "set_applications",
        payload: response.data,
      });
    } catch (error) { }
    setLoadingApp(dispatch, false);
  };
};

const getNextPageApplications = (dispatch) => {
  return async (uid, page) => {
    let applications = [];
    setLoading(dispatch, true);
    try {
      const response = await api.get(
        `${page}&filter[status]=${status}&filter[user_id]=${uid}`
      ); // have to set filter[status]=1 later
      const jobs = response.data.data;
      for (const job of jobs) {
        const response2 = await api.get(
          "applications?filter[job_id]=" + job.id
        );
        const data = response2.data.data;
        job.applications = data;
        applications.push(job);

        response2.data.data = applications;

        dispatch({
          type: "set_applications",
          payload: response2.data,
        });
      }
    } catch (error) { }
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
    } catch (error) { }
    setLoading(dispatch, false);
  };
};

const updateApplication = (dispatch) => {
  return async (id, data, cb = false) => {
    try {
      const response = await api.patch("/applications/" + id, data);
      cb && cb();
    } catch (error) { }
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
    } catch (error) { }
  };
};

const markFilled = (dispatch) => {
  return async (uuid, status) => {
    try {
      const response = await api.patch("/jobs/" + uuid, {status: status});
      return response.data.data;
    } catch (error) { 
      return null;
    }
    return null;
  };
};

const getJobAlerts = (dispatch) => {
  return async (id) => {
    setLoading(dispatch, true);
    try {
      const response = await api.get("/job-alerts/?filter[user_id]=" + id);
      dispatch({
        type: "set_job_alert",
        payload: response.data,
      });
    } catch (error) { }
    setLoading(dispatch, false);
  };
};

const setJobAlert = (dispatch) => {
  return async (uuid, user_id, category_id, status) => {
    try {
      const response = await api.patch(`/job-alerts/${uuid}`, {
        user_id,
        category_id,
        status,
      });
      dispatch({
        type: "set_job_alert",
        payload: response.data,
      });
    } catch (error) { }
  };
};

const addNote = (dispatch) => {
  return async (data) => {
    setLoading(dispatch, true);
    try {
      const response = await api.post("/notes", data);
      dispatch({
        type: "add_note",
        payload: response.data,
      });
    } catch (error) { }
    setLoading(dispatch, false);
  };
};

const getNotes = (dispatch) => {
  return async (uid, resource_id, type) => {
    setLoading(dispatch, true);
    try {
      const response = await api.get(
        `/notes?filter[user_id]=${uid}&resource_id=${resource_id}&resource_type=${type}&sort=-created_at`
      );
      dispatch({
        type: "set_notes",
        payload: response.data,
      });
    } catch (error) { }
    setLoading(dispatch, false);
  };
};

const getNextPageNotes = (dispatch) => {
  return async (uid, resource_id, type, page) => {
    setLoading(dispatch, true);
    try {
      const response = await api.get(
        `${page}&filter[user_id]=${uid}&resource_id=${resource_id}&resource_type=${type}`
      );
      dispatch({
        type: "set_nextpage_notes",
        payload: response.data,
      });
    } catch (error) { }
    setLoading(dispatch, false);
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
    } catch (error) { }
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
    } catch (error) { }
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
    } catch (error) { }
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
    } catch (error) { }
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
    } catch (error) { }
  };
};

const paginateJob = (dispatch) => {
  return async (page, filters) => {
    try {
      let filter = getFilters(filters);
      const response = await api.get(
        getJobEndpoint() + "?filter[status]=" + status + "&sort=-created_at&" + filter + "&page=" + page
      );
      dispatch({
        type: "set_jobs",
        payload: response.data,
      });
    } catch (error) { }
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
      const response = await api.get(
        "/jobs?filter[status]=" + status + "&" + filter
      );
      dispatch({
        type: "set_jobs",
        payload: response.data,
      });
    } catch (error) { }
  };
};

const getFilters = (filters) => {
  let filter =
    "filter[category_id]=" + (filters.title ? filters.title.value : "");
  filter += "&filter[state_id]=" + (filters.state ? filters.state.value : "");
  filter += "&filter[city_id]=" + (filters.city ? filters.city.value : "");
  filter +=
    "&filter[city_slug]=" + (filters.city_slug ? filters.city_slug.value : "");
  filter +=
    "&filter[category_slug]=" +
    (filters.category_slug ? filters.category_slug.value : "");
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

    } catch (error) { }
  };
};

const saveJob = (dispatch) => {
  return async (uid, data) => {
    setFormSubmit(dispatch, true);
    try {
      const response = await api.patch("/jobs/" + uid, data);
      dispatch({
        type: "set_single_job",
        payload: response.data.data,
      });
    } catch (error) { }
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
    } catch (error) {
      console.log(error);
     }
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
    } catch (error) { }
  };
};

const applyJob = (dispatch) => {
  return async (user_id, job_id, message, resume_id) => {
    setLoading(dispatch, true);
    try {
      const response = await api.post("/applications", {
        user_id,
        job_id,
        message,
        resume_id,
      });
      setLoading(dispatch, false);
      return response;
    } catch (error) {
      setLoading(dispatch, false);
      throw error;
    }
  };
};

const setFormSubmit = (dispatch, state) => {
  dispatch({
    type: "set_form_submit",
    payload: state,
  });
};

const loadNextPage = (dispatch) => {
  return async (page) => {
    if (!page) {
      return;
    }

    setLoading(dispatch, true);
    try {
      const response = await api.get(page);
      if (page.includes('publication-resources')) {
        dispatch({
          type: "load_publications",
          payload: response.data,
        });
      }
      if (page.includes('topics')) {
        dispatch({
          type: "load_mentors",
          payload: response.data,
        });
      }
    } catch (error) { }
    setLoading(dispatch, false);
  };
};

const setLoading = (dispatch, state) => {
  dispatch({
    type: "set_loading",
    payload: state,
  });
};

const setLoadingApp = (dispatch, state) => {
  dispatch({
    type: "set_loading_app",
    payload: state,
  });
};

export const { Context, Provider } = createDataContext(
  reducer,
  {
    getJobs,
    getJob,
    getJobById,
    searchJobs,
    getJobAlerts,
    setJobAlert,
    getApplications,
    getRecentApplications,
    updateApplication,
    deleteApplication,
    deleteJob,
    addNote,
    getNotes,
    getNextPageNotes,
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
    applyJob,
    markFilled,
  },
  state
);
