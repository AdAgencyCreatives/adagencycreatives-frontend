import {api} from "../api/api";
import createDataContext from "./createDataContext";

const state = { isSignedIn: false, formMessage: null };

const userReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const prepareFields = (data) => {
  const formData = data.reduce((obj, item) => {
    obj[item.name] = item.value;
    return obj;
  }, {});
  return formData;
};

export const { Context, Provider } = createDataContext(userReducer, {}, state);
