import Cookies from "js-cookie";
import { api, setAuthToken } from "../api/api";
import createDataContext from "./createDataContext";
import { useCookies } from "react-cookie";

const state = {
  isSignedIn: false,
  formMessage: null,
  token: null,
  role: null,
  user: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "set_token":
      return {
        ...state,
        token: action.payload.token,
        role: action.payload.role,
      };

    case "set_form_message":
      return { ...state, formMessage: action.payload };
    case "set_user":
      return { ...state, user: action.payload };

    case "reset_form_message":
      return { ...state, formMessage: null };
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
      Thank you for successfully registering. You'll receive an email with next
      steps.
      <br />
      <br />
      It could be a few business days for us to verify your registration
      request. Be on the look out for our email.
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

const signup = (dispatch) => {
  return async (data, role, cb = false) => {
    resetFormMessage(dispatch)();
    try {
      const formData = prepareFields(data);
      formData.role = role;
      const response = await api.post("/users", formData);
      if (formData.password !== formData.cpassword) {
        setErrorMessage(dispatch, "The passwords do not match");
        return;
      }
      dispatch({
        type: "set_form_message",
        payload: { type: "success", message: getRegisterSuccessMessage() },
      });
    } catch (error) {
      cb && cb();
      setErrorMessage(dispatch, error.response.data.message);
    }
  };
};

const signin = (dispatch) => {
  return async (data, cb) => {
    resetFormMessage(dispatch)();
    try {
      const response = await api.post("/login", data);
      setToken(dispatch)(response.data.token, response.data.user.role);
      setUserData(dispatch, response.data.user);
      dispatch({
        type: "set_form_message",
        payload: { type: "success", message: getLoginSuccessMessage() },
      });
      cb();
    } catch (error) {
      setErrorMessage(dispatch, error.response.data.message);
    }
  };
};

const getToken = (dispatch) => {
  return () => {
    const token = Cookies.get("token");
    if (token) {
      verifyToken(dispatch, token);
    }
  };
};

const setToken = (dispatch) => {
  return (token, role) => {
    if (token) {
      Cookies.set({ token, role });
      setAuthToken(token);
      dispatch({
        type: "set_token",
        payload: { token, role },
      });
    }
  };
};

const verifyToken = async (dispatch, token) => {
  try {
    const response = await api.post(
      "/re_login",
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    setToken(dispatch)(response.data.token, response.data.user.role);
    setUserData(dispatch, response.data.user);
    dispatch({
      type: "set_form_message",
      payload: { type: "success", message: getLoginSuccessMessage() },
    });
  } catch (error) {
    Cookies.remove("token");
    Cookies.remove("role");
    setErrorMessage(dispatch, error.response.data.message);
  }
};

const setUserData = (dispatch, data) => {
  dispatch({
    type: "set_user",
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

export const { Context, Provider } = createDataContext(
  authReducer,
  { signup, signin, resetFormMessage, setToken, getToken },
  state
);
