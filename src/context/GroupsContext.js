import { api } from "../api/api";
import createDataContext from "./createDataContext";

const state = {
  groups: null,
  group_members: null,
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
      case "set_group_members":
      return {
        ...state,
        group_members: action.payload.data,
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
      case "save_group":
      return {
        ...state,
        groups: (action.payload.reflect ? [action.payload.data, ...state.groups] : state.groups),
      };
      case "update_group":
      return {
        ...state,
        groups: state.groups.map((item, index) => item.id == action.payload.data.id ? action.payload.data : item),
      };
      case "delete_group":
      return {
        ...state,
        groups: state.groups.filter((item) => item.id != action.payload.data.id),
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
      const response = await api.get("/groups?sort=-created_at&filter[status]=0");
      dispatch({
        type: "set_groups",
        payload: response.data,
      });
    } catch (error) {}
  };
};

const getGroupMembers = (dispatch) => {
  return async (group_id) => {
    try {
      const response = await api.get("/group-members?filter[group_id]=" + group_id);
      dispatch({
        type: "set_group_members",
        payload: response.data,
      });
    } catch (error) {}
  };
};

const getMembershipGroups = (dispatch) => {
  return async (user_id) => {
    try {
      const response = await api.get("/groups?filter[member_id]=" + user_id + "&sort=-created_at");
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
      const response = await api.get("/groups?filter[uuid]=" + uuid);
      const data = response.data.data[0];
      dispatch({
        type: "set_single_group",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const getUserGroups = (dispatch) => {
  return async (id) => {
    try {
      const response = await api.get("/groups?sort=-created_at&filter[user_id]=" + id);
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
      const response = await api.get("groups/?sort=-created_at&filter[status]=0&filter[name]=" + query);
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
  return async (data) => {
    dispatch({
      type: "set_form_submit",
      payload: true,
    });
    try {
      const response = await api.post("/groups", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      var rdata = response.data;
      rdata.reflect = data.reflect ? data.reflect : false;
      dispatch({
        type: "save_group",
        payload: rdata,
      });
    } catch (error) {
      console.log(error);
    }
    dispatch({
      type: "set_form_submit",
      payload: false,
    });
  };
};

const updateGroup = (dispatch) => {
  return async (id, data) => {
    dispatch({
      type: "set_form_submit",
      payload: true,
    });
    try {
      const response = await api.post("/groups/update/"+id, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      var rdata = response.data;
      rdata.reflect = data.reflect ? data.reflect : false;
      dispatch({
        type: "update_group",
        payload: rdata,
      });
    } catch (error) {
      console.log(error);
    }
    dispatch({
      type: "set_form_submit",
      payload: false,
    });
  };
};

const deleteGroup = (dispatch) => {
  return async (id) => {
    try {
      const response = await api.delete("/groups/"+id);
      dispatch({
        type: "delete_group",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const { Context, Provider } = createDataContext(
  reducer,
  {
    getGroups,
    getGroupMembers,
    loadGroups,
    getGroup,
    getUserGroups,
    searchGroups,
    saveGroup,
    updateGroup,
    deleteGroup,
    getMembershipGroups,
  },
  state
);
