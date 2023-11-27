import { api } from "../api/api";
import createDataContext from "./createDataContext";

const state = {
  agencies: null,
  nextPage: null,
  loading: false,
  single_agency: {},
  open_positions: [],
  stats: null,
  formSubmit: false,
  subscription: null,
  video: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "set_agencies":
      console.log(action.payload.data);
      return {
        ...state,
        agencies: action.payload.data,
        nextPage: action.payload.links.next,
      };
    case "set_single_agency":
      return { ...state, single_agency: action.payload };
    case "set_video":
      return { ...state, video: action.payload.data[0] };
    case "set_open_positions":
      return { ...state, open_positions: action.payload.data };
    case "delete_job":
      return {
        ...state,
        open_positions: state.open_positions.filter(
          (job) => job.id != action.payload
        ),
      };
    case "load_agencies":
      return {
        ...state,
        agencies: [...state.agencies, ...action.payload.data],
        nextPage: action.payload.links.next,
      };
    case "set_loading":
      return { ...state, loading: action.payload };
    case "set_form_submit":
      return { ...state, formSubmit: action.payload };
    case "set_stats":
      return { ...state, stats: action.payload.stats };
    case "set_subscription":
      return { ...state, subscription: action.payload };
    default:
      return state;
  }
};

const getAgencies = (dispatch) => {
  return async () => {
    try {
      const response = await api.get("/agencies?filter[status]=1&filter[is_visible]=1");
      dispatch({
        type: "set_agencies",
        payload: response.data,
      });
    } catch (error) {}
  };
};

const getAgency = (dispatch) => {
  return async (slug, self=false) => {
    try {
      const response = await api.get(
        "/agencies?filter[status]=1&filter[slug]=" + slug + (self ? "" : "&filter[is_visible]=1")
      );
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

const getAgencyById = (dispatch) => {
  return async (id, self=false) => {
    try {
      const response = await api.get(
        "/agencies?filter[status]=1&filter[user_id]=" + id + (self ? "" : "&filter[is_visible]=1")
      );
      const data = response.data.data[0];
      const uid = data.user_id;
      getOpenPositions(dispatch)(uid);
      dispatch({
        type: "set_single_agency",
        payload: data,
      });
    } catch (error) {}
  };
};

const loadAgencies = (dispatch) => {
  return async (page) => {
    setLoading(dispatch, true);
    try {
      const response = await api.get(page);
      dispatch({
        type: "load_agencies",
        payload: response.data,
      });
      setLoading(dispatch, false);
    } catch (error) {}
  };
};

const getOpenPositions = (dispatch) => {
  return async (uid) => {
    setLoading(dispatch, true);
    try {
      const response = await api.get(
        "/jobs?sort=-created_at&filter[status]=1&filter[user_id]=" + uid
      );
      const data = response.data;
      dispatch({
        type: "set_open_positions",
        payload: data,
      });
    } catch (error) {}
    setLoading(dispatch, false);
  };
};

const sendJobInvite = (dispatch) => {
  return async (receiver_id, job_id) => {
    setLoading(dispatch, true);
    const response = await api.post("/job-invitation", {
      receiver_id,
      job_id,
    });
    setLoading(dispatch, false);
    return response;
  };
};

const getStats = (dispatch) => {
  return async () => {
    try {
      const response = await api.get("/agency_stats");
      dispatch({
        type: "set_stats",
        payload: response.data,
      });
    } catch (error) {}
  };
};

const saveAgency = (dispatch) => {
  return async (uid, data) => {
    setFormSubmit(dispatch, true);
    try {
      const response = await api.patch("/agency_profile/" + uid, data);
    } catch (error) {}
    setFormSubmit(dispatch, false);
  };
};

const uploadAttachment = (dispatch) => {
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

const removeAttachment = (dispatch) => {
  return async (id) => {
    try {
      const response = await api.delete("/attachments/" + id);
    } catch (error) {}
  };
};

const getVideo = (dispatch) => {
  return async (uid) => {
    try {
      const response = await api.get(
        "/attachments?filter[user_id]=" +
          uid +
          "&filter[resource_type]=agency_reel"
      );
      dispatch({
        type: "set_video",
        payload: response.data,
      });
    } catch (error) {}
  };
};

const searchAgencies = (dispatch) => {
  return async (query) => {
    try {
      const response = await api.get(
        "/agencies?filter[status]=1&filter[is_visible]=1&filter[name]=" + query
      );
      dispatch({
        type: "set_agencies",
        payload: response.data,
      });
    } catch (error) {}
  };
};

const requestPackage = (dispatch) => {
  return async (data) => {
    setFormSubmit(dispatch, true);
    try {
      console.log(data);
      const response = await api.post("/package-requests", data);
    } catch (error) {}
    setFormSubmit(dispatch, false);
  };
};

const getSubscriptionStatus = (dispatch) => {
  return async () => {
    try {
      const response = await api.get("/subscription/status");
      if (response.data.data.status == "active") {
        dispatch({
          type: "set_subscription",
          payload: true,
        });
      }
    } catch (error) {
      dispatch({
        type: "set_subscription",
        payload: false,
      });
    }
  };
};

const setFormSubmit = (dispatch, status) => {
  dispatch({
    type: "set_form_submit",
    payload: status,
  });
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

const setLoading = (dispatch, state) => {
  dispatch({
    type: "set_loading",
    payload: state,
  });
};

export const { Context, Provider } = createDataContext(
  reducer,
  {
    getAgencies,
    loadAgencies,
    getAgency,
    getStats,
    getAgencyById,
    saveAgency,
    searchAgencies,
    getOpenPositions,
    uploadAttachment,
    removeAttachment,
    getVideo,
    deleteJob,
    requestPackage,
    getSubscriptionStatus,
    sendJobInvite,
  },
  state
);
