import api from "../api/api";
import createDataContext from "./createDataContext";

const state = { isSignedIn: false, formMessage: null };

const authReducer = (state, action) => {
  switch (action.type) {
    case "set_token":
      return state;

    case "set_form_message":
      return { ...state, formMessage: action.payload };

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
  return "Login Successful"
}

const setErrorMessage = (dispatch, message) => {
  dispatch({
    type: "set_form_message",
    payload: { type: "error", message },
  });
};

const signup = (dispatch) => {
  return async (data, role) => {
    resetFormMessage(dispatch)();
    try {
      const formData = prepareFields(data);
      formData.role = role;
      const response = await api.post("/users", formData);
      if (formData.password != formData.cpassword) {
        setErrorMessage(dispatch, "The passwords do not match");
        return;
      }
      dispatch({
        type: "set_form_message",
        payload: { type: "success", message: getRegisterSuccessMessage() },
      });
    } catch (error) {
      setErrorMessage(dispatch, error.response.data.message);
    }
  };
};

const signin = (dispatch) => {
  return async (data) => {
    resetFormMessage(dispatch)();
    try {
      const response = await api.post("/login", data);
      dispatch({
        type: "set_form_message",
        payload: { type: "success", message: getLoginSuccessMessage() },
      });
    } catch (error) {
      setErrorMessage(dispatch, error.response.data.message);
    }
  };
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
  { signup, signin, resetFormMessage },
  state
);
