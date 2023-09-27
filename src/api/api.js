import axios from "axios";

const api = axios.create({
    baseURL:"http://35.173.50.140/api/v1"
})

api.defaults.headers.common['Content-Type'] = "application/json";
api.defaults.headers.common['Accept'] = "application/json";

api.interceptors.response.use(
    response => {
      // Do something with the response data
      return response;
    },
    error => {
      // Handle the error
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // alert(error.response.data.message);
        // console.log(error.response.status);
        // console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }  
      return Promise.reject(error);
    }
  );

export default api;