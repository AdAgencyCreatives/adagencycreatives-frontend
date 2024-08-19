import Cookies from "js-cookie";
import { api, setAuthToken, baseUrl } from "../api/api";
import createDataContext from "./createDataContext";
import { setCookie, } from "../helpers/functions";

const state = {
  isLoading: false,
  isSignedIn: false,
  formMessage: null,
  token: null,
  fetchingToken: true,
  role: null,
  user: null,
  auth_creative: null,
  auth_agency: null,
  formSubmit: false,
  modal: false,
  messages_count: 0,
  notifications_count: 0,
  activities_count: 0,
  messageAlert: { type: "", message: "", display: "" },
  subscription_status: "",
  advance_search_capabilities: false,
  conversation_updated_notifications: [],
  pageClass: ''
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "set_token":
      return {
        ...state,
        token: action.payload.token,
        role: action.payload.role,
      };
    case "set_page_class":
      return {
        ...state,
        pageClass: action.payload
      };
    case "set_form_message":
      return { ...state, formMessage: action.payload };
    case "set_user":
      return { ...state, user: action.payload };
    case "set_auth_creative":
      return { ...state, auth_creative: action.payload };
    case "set_auth_agency":
      return { ...state, auth_agency: action.payload };
    case "set_advance_search_capabilities":
      return { ...state, advance_search_capabilities: action.payload };
    case "set_subscription_status":
      return { ...state, subscription_status: action.payload };
    case "reset_form_message":
      return { ...state, formMessage: null };
    case "set_fetching_token":
      return { ...state, fetchingToken: action.payload };
    case "set_is_loading":
      return { ...state, isLoading: action.payload };
    case "set_form_submit":
      return { ...state, formSubmit: action.payload };
    case "set_modal":
      return { ...state, modal: action.payload };
    case "set_messages_count":
      return { ...state, messages_count: action.payload };
    case "set_notifications_count":
      return { ...state, notifications_count: action.payload };
    case "set_activities_count":
      return { ...state, activities_count: action.payload };
    case "show_message_alert":
      return { ...state, messageAlert: action.payload };
    case "conversation_updated":
      return { ...state, conversation_updated_notifications: [...state.conversation_updated_notifications, action.payload] };
    case "reset_conversation_updated":
      return { ...state, conversation_updated_notifications: [] };
    case "user_update_email_notifications":
      return { ...state, user: { ...state.user, email_notifications_enabled: action.payload } };
    default:
      return state;
  }
};

const resetFormMessage = (dispatch) => {
  return () => {
    dispatch({
      type: "reset_form_message",
    });
  };
};

const getRegisterSuccessMessage = () => {
  return (
    <>
      Hello,
      <br />
      <br />
      Thank you for successfully registering. You'll receive an email with next steps.
      <br />
      <br />
      It could be a few business days for us to verify your registration request. Be on the look out for our email.
      <br />
      <br />
      In the meantime, enjoy exploring our home page.
      <br />
      <br />- Ad Agency Creatives
    </>
  );
};

const getLoginSuccessMessage = () => {
  return "Login Successful";
};

const setErrorMessage = (dispatch, message) => {
  dispatch({
    type: "set_form_message",
    payload: { type: "error", message },
  });
};

const setPageClass = (dispatch) => {
  return async (pageClass) => {
    try {
      dispatch({
        type: "set_page_class",
        payload: pageClass,
      });
    } catch (error) {
    }
  };
};

const signup = (dispatch) => {
  return async (data, role) => {
    resetFormMessage(dispatch)();
    try {
      const formData = prepareFields(data);
      formData.role = role;
      if (formData.password !== formData.cpassword) {
        setErrorMessage(dispatch, "The passwords do not match");
        throw "passwords do not match";
      }

      const response = await api.post("/users", formData);

      dispatch({
        type: "set_form_message",
        payload: { type: "success", message: getRegisterSuccessMessage() },
      });
      logActivity(response.data.uuid, "signup", "You signed up as " + response.data.role + ", via email: " + response.data.email, "{user_id:" + response.data.uuid + "}");
    } catch (error) {
      setErrorMessage(dispatch, error.response.data.message);
      throw error
    }
  };
};

const getRoleId = (role) => {
  // Roles => 1:admin, 2:advisor, 3:agency, 4:creative, 5:recruiter
  let roleId = 3;
  switch (role) {
    case "admin": roleId = 1; break;
    case "advisor": roleId = 2; break;
    case "agency": roleId = 3; break;
    case "creative": roleId = 4; break;
    case "recruiter": roleId = 5; break;
  }
  return roleId;
};

const signin = (dispatch) => {
  return async (data, cb) => {
    resetFormMessage(dispatch)();
    try {
      const response = await api.post("/login", data);
      setToken(dispatch)(response.data.token, response.data.user.role);
      setUserData(dispatch, response.data.user);

      setCookie("cookie_token", response.data.token, 1000 * 60 * 60 * 24); // set for 24 hours

      if (response.data.user.role == "creative") {
        let creative = await getCreativeById(response.data.user.uuid);
        setAuthCreative(dispatch, creative);

      } else if (response.data.user.role == "agency" || response.data.user.role == "advisor" || response.data.user.role == "recruiter") {

        let agency = await getAgencyById(response.data.user.uuid, getRoleId(response.data.user.role));
        setAuthAgency(dispatch, agency);
      }

      setAdvanceSearchCapabilities(dispatch, response.data?.subscription_status?.toLowerCase() == "active");
      setSubscriptionStatus(dispatch, response.data.subscription_status ? response.data.subscription_status : "");
      dispatch({
        type: "set_form_message",
        payload: { type: "success", message: getLoginSuccessMessage() },
      });
      logActivity(response.data.user.uuid, "signin", "You signed in as " + response.data.user.role + ", via email: " + response.data.user.email, "{user_id:" + response.data.user.uuid + "}");
      cb(response.data);
    } catch (error) {
      setErrorMessage(dispatch, error.response.data.message);
    }
  };
};

export const getCreativeById = async (id) => {
  try {
    const response = await api.get("/creatives?filter[user_id]=" + id);
    return response.data.data[0];
  } catch (error) { }
};

export const getAgencyById = async (id, role = 3) => {
  try {
    const response = await api.get("/agencies?filter[user_id]=" + id + "&filter[role]=" + role);
    return response.data.data[0];
  } catch (error) { }
};

const sendResetLink = (dispatch) => {
  return async (email) => {
    try {
      const response = await api.post(baseUrl + "/forgot-password", { email });
      return response;
    } catch (error) {
      return false;
    }
  };
};

const resetPassword = (dispatch) => {
  return async (data) => {
    try {
      const response = await api.post(baseUrl + "/reset-password", data);
      return response;
    } catch (error) {
      setErrorMessage(dispatch, error.response?.data?.message || "There was an error processing the request");
      return false;
    }
  };
};

const reloadUserData = (dispatch) => {
  return async (user_id) => {
    try {
      const response = await api.get("/users/" + user_id);
      setUserData(dispatch, response.data.data);
    } catch (error) { }
  };
};

const logout = (dispatch) => {
  return (cb) => {
    Cookies.remove("token");
    Cookies.remove("role");
    dispatch({
      type: "set_token",
      payload: { token: null, role: null },
    });
    cb();
  };
};

const updatePassword = (dispatch) => {
  return async (data) => {
    setFormSubmit(dispatch, true);
    try {
      const response = await api.patch("/update_password", data);
      showMessageAlert(dispatch, {
        type: "success",
        message: "Password has been changed",
        display: "true",
      });
    } catch (error) {
      showMessageAlert(dispatch, {
        type: "error",
        message: error.response.data.message,
        display: "true",
      });
      // alert(error.response.data.message)
    }
    setFormSubmit(dispatch, false);
  };
};

const confirmPassword = (dispatch) => {
  return async (data) => {
    setFormSubmit(dispatch, true);
    try {
      const response = await api.patch("/confirm_password", data);
      setModal(dispatch, true);
      showMessageAlert(dispatch, {
        type: "",
        message: "",
        display: "",
      });
    } catch (error) {
      showMessageAlert(dispatch, {
        type: "error",
        message: error.response.data.message,
        display: "true",
      });
    }
    setFormSubmit(dispatch, false);
  };
};

const deleteProfile = (dispatch) => {
  return async (user_id, callback) => {
    setFormSubmit(dispatch, true);
    try {
      const response = await api.delete("/users/" + user_id);
      logout();
      callback();
    } catch (error) { }
    setFormSubmit(dispatch, false);
  };
};

const getNotificationsCount = (dispatch) => {
  return async (user_id) => {
    try {
      // const response = await api.get("/notifications/count?filter[user_id]=" + user_id);
      const response = await api.get("/notifications/count?status=0&filter[type]=lounge_friends_activity,lounge_group_activity,lounge_mention&filter[user_id]=" + user_id);
      dispatch({
        type: "set_notifications_count",
        payload: response.data.count,
      });
    } catch (error) { }
  };
};

const getMessagesCount = (dispatch) => {
  return async (user_id, type = "job") => {
    try {
      const response = await api.get("/messages/count?status=0&filter[type]=" + type + "&filter[user_id]=" + user_id);
      dispatch({
        type: "set_messages_count",
        payload: response.data.count,
      });
    } catch (error) { }
  };
};

const getActivitiesCount = (dispatch) => {
  return async (user_id) => {
    try {
      const response = await api.get("/activities/count?filter[user_id]=" + user_id);
      dispatch({
        type: "set_activities_count",
        payload: response.data.count,
      });
    } catch (error) { }
  };
};

const getToken = (dispatch) => {
  return () => {
    const token = Cookies.get("token");
    if (token) {
      verifyToken(dispatch)(token);
    } else {
      dispatch({
        type: "set_fetching_token",
        payload: false,
      });
    }
  };
};

const setToken = (dispatch) => {
  return (token, role) => {
    if (token) {
      Cookies.set("token", token);
      Cookies.set("role", role);
      setAuthToken(token);
      dispatch({
        type: "set_token",
        payload: { token, role },
      });
    }
  };
};

const verifyToken = (dispatch) => async (token) => {
  try {
    setIsLoading(dispatch, true);
    const response = await api.post(
      "/re_login",
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    setIsLoading(dispatch, false);
    setToken(dispatch)(response.data.token, response.data.user.role);
    setUserData(dispatch, response.data.user);

    setCookie("cookie_token", response.data.token, 1000 * 60 * 60 * 24); // set for 24 hours

    let creative = await getCreativeById(response.data.user.uuid);
    setAuthCreative(dispatch, creative);

    setAdvanceSearchCapabilities(dispatch, response.data.advance_search_capabilities ? response.data.advance_search_capabilities : false);
    setSubscriptionStatus(dispatch, response.data.subscription_status);

    dispatch({
      type: "set_form_message",
      payload: { type: "success", message: getLoginSuccessMessage() },
    });
    dispatch({
      type: "set_fetching_token",
      payload: false,
    });
    return response;
  } catch (error) {
    Cookies.remove("token");
    Cookies.remove("role");
    setErrorMessage(dispatch, error.response.data.message);
    dispatch({
      type: "set_fetching_token",
      payload: false,
    });
    //throw error;
  }
};

const setUserData = (dispatch, data) => {
  dispatch({
    type: "set_user",
    payload: data,
  });
};

const setAuthCreative = (dispatch, data) => {
  dispatch({
    type: "set_auth_creative",
    payload: data,
  });
};

const setAuthAgency = (dispatch, data) => {
  dispatch({
    type: "set_auth_agency",
    payload: data,
  });
};

const setAdvanceSearchCapabilities = (dispatch, data) => {
  dispatch({
    type: "set_advance_search_capabilities",
    payload: data,
  });
};

const setSubscriptionStatus = (dispatch, data) => {
  dispatch({
    type: "set_subscription_status",
    payload: data,
  });
};

const prepareFields = (data) => {
  const formData = data.reduce((obj, item) => {
    obj[item.name] = item.value;
    return obj;
  }, {});
  return formData;
};

const setFormSubmit = (dispatch, state) => {
  dispatch({
    type: "set_form_submit",
    payload: state,
  });
};

const setIsLoading = (dispatch, state) => {
  dispatch({
    type: "set_is_loading",
    payload: state,
  });
};

const setModal = (dispatch, state) => {
  dispatch({
    type: "set_modal",
    payload: state,
  });
};

const showMessageAlert = (dispatch, globalState) => {
  dispatch({
    type: "show_message_alert",
    payload: globalState,
  });
};

const hideMessageAlert = (dispatch) => {
  return () => {
    showMessageAlert(dispatch, { type: "", message: "", display: "" });
  };
};

export const logActivity = async (user_id, type, message, body) => {
  try {
    const response = await api.post("/activities", {
      user_id: user_id,
      type: type && type.length ? type : "general",
      message: message && message.length ? message : "",
      body: body && body.length ? body : "{}",
    });
    return response.data;
  } catch (error) { }
  return null;
};

const handleClose = (dispatch) => {
  return async (data) => {
    setModal(dispatch, false);
  };
};

const notifyConversationUpdated = (dispatch) => {
  return (message) => {
    dispatch({
      type: "conversation_updated",
      payload: message,
    });
  };
};

const resetConversationUpdated = (dispatch) => {
  return (message) => {
    dispatch({
      type: "reset_conversation_updated",
    });
  };
};

const updateEmailNotifications = (dispatch) => {
  return async (uid, data, callback, callbackError) => {
    setFormSubmit(dispatch, true);
    try {
      await api.patch("/user_update_email_notifications/" + uid, data);
      dispatch({
        type: "user_update_email_notifications",
        payload: data.email_notifications_enabled,
      });
      callback("Email Notifications updated successfully");
    } catch (error) {
      callbackError(error.response.data.message);
    }
    setFormSubmit(dispatch, false);
  };
};

export const { Context, Provider } = createDataContext(
  authReducer,
  {
    signup,
    signin,
    sendResetLink,
    resetPassword,
    resetFormMessage,
    setToken,
    getToken,
    logout,
    updatePassword,
    hideMessageAlert,
    getMessagesCount,
    getNotificationsCount,
    getActivitiesCount,
    reloadUserData,
    verifyToken,
    deleteProfile,
    confirmPassword,
    handleClose,
    notifyConversationUpdated,
    resetConversationUpdated,
    setPageClass,
    updateEmailNotifications,
  },
  state
);