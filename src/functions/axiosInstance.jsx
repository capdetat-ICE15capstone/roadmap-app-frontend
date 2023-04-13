import axios from "axios";

export const BASEURL = `https://oyster-app-gkodb.ondigitalocean.app`;

export const axiosInstance = axios.create({
  baseURL: BASEURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("token") !== null)
      config.headers["Authorization"] = `Bearer ${localStorage.getItem(
        "token"
      )}`;

    config.metadata = { startTime: new Date() };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    try {
      const newRes = { ...response };
      newRes.config.metadata.endTime = new Date();
      newRes.duration =
        newRes.config.metadata.endTime - newRes.config.metadata.startTime;
      console.warn("fetching: " + response.request.responseURL);
      console.warn("response time: " + newRes.duration + "ms");
    } catch (error) {
      console.warn("error displaying response time");
    }
    return response;
  },
  (error) => {
    try {
      const newError = { ...error };
      newError.config.metadata.endTime = new Date();
      newError.duration =
        newError.config.metadata.endTime - newError.config.metadata.startTime;
      console.warn("fetching:" + error.request.responseURL);
      console.warn("response time: " + newError.duration + "ms");
    } catch (error) {
      console.warn("error displaying response time");
    }
    return Promise.reject(error);
  }
);
