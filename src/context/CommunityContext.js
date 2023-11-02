import { api } from "../api/api";
import createDataContext from "./createDataContext";

const state = {
  feed_group: "bc6fe768-7a95-3606-9d00-4d7fc464384d",
  posts: [],
  nextPage: null,
  loading: false,
  single_post: {},
  formSubmit: false,
  post_likes: { "post_id": "", "data": {} },
  post_comments: { "post_id": "", "data": {} },
  post_comment_replies: { "post_id": "", "comment_id": "", "data": {} },
  like_action: { "post_id": "", "action": "", error: null },
  new_members: [],
  post_added: null,
  post_updated: null,
  post_deleted: null,
  comment_added: null,
  comment_updated: null,
  comment_deleted: null,
  reply_added: null,
  reply_updated: null,
  reply_deleted: null,
  halt_refresh: false,
};

const appendNewPosts = (oldPosts, newPosts) => {
  if(!oldPosts || !oldPosts.length) {
    return newPosts;
  }
  let uniquePosts = [];
  for (let index = 0; index < newPosts.length; index++) {
    const newPost = newPosts[index];
    let postFound = false;
    for (let idx = 0; idx < oldPosts.length; idx++) {
      const post = oldPosts[idx];
      if(post.id == newPost.id) {
        postFound=true;
        break;
      }
    }
    if(!postFound) {
      uniquePosts.push(newPost);
    }
  }
  return [...uniquePosts, ...oldPosts];
};

const reducer = (state, action) => {
  switch (action.type) {
    case "set_posts":
      return {
        ...state,
        posts: appendNewPosts(state.posts, action.payload.data),
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
    case "set_post_comments":
      return {
        ...state,
        post_comments: action.payload,
      };
    case "add_post":
      return {
        ...state,
        post_added: action.payload,
      };
    case "update_post":
      return {
        ...state,
        post_updated: action.payload,
      };
    case "delete_post":
      return {
        ...state,
        post_deleted: action.payload,
      };
      case "add_comment":
      return {
        ...state,
        comment_added: action.payload,
      };
    case "update_comment":
      return {
        ...state,
        comment_updated: action.payload,
      };
    case "delete_comment":
      return {
        ...state,
        comment_deleted: action.payload,
      };
      case "add_reply":
      return {
        ...state,
        reply_added: action.payload,
      };
    case "update_reply":
      return {
        ...state,
        reply_updated: action.payload,
      };
    case "delete_reply":
      return {
        ...state,
        reply_deleted: action.payload,
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
    case "set_halt_refresh":
      return {
        ...state,
        halt_refresh: action.payload,
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

const loadPosts = (dispatch) => {
  return async (page, group_id) => {
    let nextPageNumber = page.substring(page.indexOf("?page=") + "?page=".length);
    let nextPageUrl = "/posts?filter[group_id]=" + group_id + "&sort=-created_at&filter[status]=1&page=" + nextPageNumber;
    setLoading(dispatch, true);
    try {
      const response = await api.get(nextPageUrl);
      dispatch({
        type: "load_posts",
        payload: response.data,
      });
      setLoading(dispatch, false);
    } catch (error) { }
  };
};

const getComments = (dispatch) => {
  return async (uid) => {
    setLoading(dispatch, true);
    try {
      const response = await api.get("/comments?sort=-created_at&filter[post_id]=" + uid);
      dispatch({
        type: "set_post_comments",
        payload: { "post_id": uid, "data": response.data },
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
      const response = await api.post("/posts", data);
      dispatch({
        type: "add_post",
        payload: response.data.data.id,
      });
    } catch (error) { }
    dispatch({
      type: "set_form_submit",
      payload: false,
    });
  };
};

const saveComment = (dispatch) => {
  return async (data) => {
    dispatch({
      type: "set_form_submit",
      payload: true,
    });
    try {
      const response = await api.post("/comments", data);
      dispatch({
        type: "add_comment",
        payload: {post_id: response.data.data.post_id, comment_uuid: response.data.data.uuid},
      });
    } catch (error) { }
    dispatch({
      type: "set_form_submit",
      payload: false,
    });
  };
};

const updatePost = (dispatch) => {
  return async (uuid, data) => {
    dispatch({
      type: "set_form_submit",
      payload: true,
    });
    try {
      const response = await api.patch("/posts/" + uuid, data);
      dispatch({
        type: "update_post",
        payload: response.data.data,
      });
    } catch (error) { }
    dispatch({
      type: "set_form_submit",
      payload: false,
    });
  };
};

const updateComment = (dispatch) => {
  return async (post_id, comment_uuid, data) => {
    dispatch({
      type: "set_form_submit",
      payload: true,
    });
    try {
      const response = await api.patch("/comments/" + comment_uuid, data);
      dispatch({
        type: "update_comment",
        payload: {post_id: response.data.data.post_id, comment_uuid: response.data.data.uuid},
      });
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

const deleteComment = (dispatch) => {
  return async (post_id, comment_uuid) => {
    try {
      console.log("trying to delete comment: " + comment_uuid)
      const response = await api.delete("/comments/" + comment_uuid);
      dispatch({
        type: "delete_comment",
        payload: {post_id: post_id, comment_uuid: comment_uuid},
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

const setHaltRefresh = (dispatch) => {
  return async (state) => {
    dispatch({
      type: "set_halt_refresh",
      payload: state,
    });
  }
};

export const { Context, Provider } = createDataContext(
  reducer,
  {
    getPosts,
    getNewMembers,
    getFeedGroup,
    loadPosts,
    getLikes,
    toggleLike,
    savePost,
    updatePost,
    getComments,
    savePostImage,
    deletePost,
    setHaltRefresh,
    saveComment,
    updateComment,
    deleteComment,
  },
  state
);
