import { api } from "../api/api";
import createDataContext from "./createDataContext";

const state = { posts: [] };

const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const { Context, Provider } = createDataContext(reducer, {}, state);
