import { api } from "../api/api";
import createDataContext from "./createDataContext";

const state = {
  posts: [],
  nextPage: null,
  loading: false,
  single_post: {},
  post_comments: [],
  likes: 0,
  formSubmit: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "set_posts":
      return {
        ...state,
        posts: action.payload.data,
        nextPage: action.payload.links.next,
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
    case "set_likes":
      return {
        ...state,
        likes: action.payload.likes,
      };
    default:
      return state;
  }
};

const getPosts = (dispatch) => {
  return async () => {
    try {
      const response = await api.get("/posts");
      dispatch({
        type: "set_posts",
        payload: response.data,
      });
    } catch (error) {}
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
    } catch (error) {}
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
    } catch (error) {}
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
    } catch (error) {}
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
    } catch (error) {}
    setLoading(dispatch, false);
  };
};

const getLikes = (dispatch) => {
  return async () => {
    try {
      const response = await api.get("/post_likes");
      dispatch({
        type: "set_likes",
        payload: response.data,
      });
    } catch (error) {}
  };
};

const savePost = (dispatch) => {
  return async (uid, data) => {
    dispatch({
      type: "set_form_submit",
      payload: true,
    });
    try {
      const response = await api.patch("/post_save/" + uid, data);
    } catch (error) {}
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
    } catch (error) {}
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
    getPosts,
    loadPosts,
    getPost,
    getLikes,
    getPostById,
    savePost,
    getPostComments,
    savePostImage,
    deletePost,
  },
  state
);
