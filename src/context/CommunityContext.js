import { api } from "../api/api";
import createDataContext from "./createDataContext";

const state = {
  feed_group: "",
  posts: [],
  nextPage: null,
  loading: false,
  single_post: {},
  formSubmit: false,
  post_likes: { "post_id": "", "data": {} },
  like_action: { "post_id": "", "action": "", error: null },
  new_members: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "set_posts":
      return {
        ...state,
        posts: action.payload.data,
        nextPage: action.payload.links.next,
      };
    case "set_new_members":
      return {
        ...state,
        new_members: action.payload.data,
        nextPage: action.payload.links.next,
      };
      case "set_feed_group":
      return {
        ...state,
        feed_group: action.payload.data[0].uuid,
      };
    case "set_single_post":
      return {
        ...state,
        single_post: action.payload,
      };
    case "set_post_comments":
      return {
        ...state,
        post_comments: action.payload.data,
      };
    case "delete_post":
      return {
        ...state,
        post_comments: state.post_comments.filter(
          (job) => job.id != action.payload
        ),
      };
    case "load_posts":
      return {
        ...state,
        posts: [...state.posts, ...action.payload.data],
        nextPage: action.payload.links.next,
      };
    case "set_loading":
      return {
        ...state,
        loading: action.payload,
      };
    case "set_form_submit":
      return {
        ...state,
        formSubmit: action.payload,
      };
    case "set_post_likes":
      return {
        ...state,
        post_likes: action.payload,
      };
    case "set_like_action":
      return {
        ...state,
        like_action: action.payload,
      };
    default:
      return state;
  }
};

const getPosts = (dispatch) => {
  return async (group_id) => {
    try {
      const response = await api.get("/posts?filter[group_id]=" + group_id + "&sort=-created_at&filter[status]=1"); // only published posts in Feeds
      //console.log("fetched new posts at: " + (new Date()).toString());
      dispatch({
        type: "set_posts",
        payload: response.data,
      });
    } catch (error) { }
  };
};

const getNewMembers = (dispatch) => {
  return async () => {
    try {
      const response = await api.get("/creatives?sort=-created_at&filter[status]=1"); // only active members
      dispatch({
        type: "set_new_members",
        payload: response.data,
      });
    } catch (error) { }
  };
};

const getFeedGroup = (dispatch) => {
  return async () => {
    try {
      const response = await api.get("/groups?filter[name]=Feed&filter[status]=0"); // Only Public Feed Group for Lounge
      dispatch({
        type: "set_feed_group",
        payload: response.data,
      });
    } catch (error) { }
  };
};

const getPost = (dispatch) => {
  return async (slug) => {
    try {
      const response = await api.get("/posts?filter[slug]=" + slug);
      const data = response.data.data[0];
      const uid = data.post_id;
      getPostComments(dispatch, uid);
      dispatch({
        type: "set_single_post",
        payload: data,
      });
    } catch (error) { }
  };
};

const getPostById = (dispatch) => {
  return async (id) => {
    try {
      const response = await api.get("/posts?filter[post_id]=" + id);
      const data = response.data.data[0];
      const uid = data.post_id;
      getPostComments(dispatch)(uid);
      dispatch({
        type: "set_single_post",
        payload: data,
      });
    } catch (error) { }
  };
};

const loadPosts = (dispatch) => {
  return async (page) => {
    setLoading(dispatch, true);
    try {
      const response = await api.get(page);
      dispatch({
        type: "load_posts",
        payload: response.data,
      });
      setLoading(dispatch, false);
    } catch (error) { }
  };
};

const getPostComments = (dispatch) => {
  return async (uid) => {
    setLoading(dispatch, true);
    try {
      const response = await api.get(
        "/comments?sort=-created_at&filter[post_id]=" + uid
      );
      const data = response.data;
      dispatch({
        type: "set_post_comments",
        payload: data,
      });
    } catch (error) { }
    setLoading(dispatch, false);
  };
};

const getLikes = (dispatch) => {
  return async (data) => {
    try {
      const response = await api.get("/likes?filter[post_id]=" + data.post_id);
      dispatch({
        type: "set_post_likes",
        payload: { "post_id": data.post_id, "data": response.data },
      });
    } catch (error) { }
  };
};

const toggleLike = (dispatch) => {
  return async (data) => {
    dispatch({
      type: "set_like_action",
      payload: { "post_id": data.post_id, "action": "like_begin", error: null },
    });
    try {
      const response = await api.post("/likes", data);
      dispatch({
        type: "set_like_action",
        payload: { "post_id": data.post_id, "action": "like_success", error: null },
      });
    } catch (error) {
      dispatch({
        type: "set_like_action",
        payload: { "post_id": data.post_id, "action": "like_failed", error: error },
      });
    }
  };
};

const savePost = (dispatch) => {
  return async (data) => {
    dispatch({
      type: "set_form_submit",
      payload: true,
    });
    try {
      console.log("sending post data: ")
      console.log(data);
      const response = await api.post("/posts", data);
    } catch (error) { }
    dispatch({
      type: "set_form_submit",
      payload: false,
    });
  };
};

const savePostImage = (dispatch) => {
  return async (data) => {
    try {
      const response = await api.post("/attachments", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) { }
  };
};

const deletePost = (dispatch) => {
  return async (id) => {
    try {
      const response = await api.delete("/posts/" + id);
      dispatch({
        type: "delete_post",
        payload: id,
      });
    } catch (error) { }
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
    getPosts,
    getNewMembers,
    getFeedGroup,
    loadPosts,
    getPost,
    getLikes,
    toggleLike,
    getPostById,
    savePost,
    getPostComments,
    savePostImage,
    deletePost,
  },
  state
);
