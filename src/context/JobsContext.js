import api from "../api/api";
import createDataContext from "./createDataContext";

api.defaults.headers.common["Authorization"] =
"Bearer 2|q52keLEZTFkJVwMcKQhGpaEbVTXCXsGyyWVtZC6Y0db02524";

const state = { jobs: null };

const reducer = (state, action) => {
  switch (action.type) {
    case "set_jobs":
      return { jobs: action.payload.data };
    default:
      return state;
  }
};

const getJobs = (dispatch) => {
  return async () => {
    try {
      const response = await api.get("/jobs?filter[is_featured]=1&filter[is_urgent]=1");
      dispatch({
        type: "set_jobs",
        payload: response.data,
      });
    } catch (error) {}
  };
};

export const { Context, Provider } = createDataContext(
  reducer,
  { getJobs },
  state
);
