import { api } from "../api/api";
import createDataContext from "./createDataContext";

const state = {
  groups: null,
  nextPage: null,
  loading: false,
  single_group: {},
  stats: null,
  formSubmit: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "set_groups":
      return {
        ...state,
        groups: action.payload.data,
        nextPage: action.payload.links.next,
      };
    case "set_single_group":
      return { ...state, single_group: action.payload };
    case "load_groups":
      return {
        ...state,
        groups: [...state.groups, ...action.payload.data],
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

const getGroups = (dispatch) => {
  return async () => {
    try {
      const response = await api.get("/groups?filter[status]=0");
      dispatch({
        type: "set_groups",
        payload: response.data,
      });
    } catch (error) {}
  };
};

const getGroup = (dispatch) => {
  return async (uuid) => {
    try {
      const response = await api.get("/groups/" + uuid);
      const data = response.data.data[0];
      dispatch({
        type: "set_single_group",
        payload: data,
      });
    } catch (error) {}
  };
};

const getUserGroups = (dispatch) => {
  return async (id) => {
    try {
      const response = await api.get("/groups?filter[user_id]=" + id);
      const data = response.data;
      dispatch({
        type: "set_groups",
        payload: data,
      });
    } catch (error) {}
  };
};

const searchGroups = (dispatch) => {
  return async (query) => {
    try {
      const response = await api.get("groups/?filter[name]=" + query);
      dispatch({
        type: "set_groups",
        payload: response.data,
      });
    } catch (error) {}
  };
};

const loadGroups = (dispatch) => {
  return async (page) => {
    setLoading(dispatch, true);
    try {
      const response = await api.get(page);
      dispatch({
        type: "load_groups",
        payload: response.data,
      });
    } catch (error) {}
    setLoading(dispatch, false);
  };
};

const setLoading = (dispatch, status) => {
  dispatch({
    type: "set_loading",
    payload: status,
  });
};

const saveGroup = (dispatch) => {
  return async (uid, data) => {
    dispatch({
      type: "set_form_submit",
      payload: true,
    });
    try {
      const response = await api.patch("/group_profile/" + uid, data);
    } catch (error) {}
    dispatch({
      type: "set_form_submit",
      payload: false,
    });
  };
};

const saveAttachment = (dispatch) => {
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

const saveGroupImage = (dispatch) => {
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
      const response = await api.get("/group_stats");
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
    getGroups,
    getStats,
    loadGroups,
    getGroup,
    getUserGroups,
    searchGroups,
    saveGroup,
    saveAttachment,
    saveGroupImage,
    removeAttachment,
  },
  state
);
