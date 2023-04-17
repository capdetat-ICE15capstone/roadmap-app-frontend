import { axiosInstance } from "./axiosInstance";

const DEFAULT_TIMEOUT = 3000;

export const isUserPremium = async (timeout=DEFAULT_TIMEOUT) => {
  try {
    const response = await axiosInstance.get('/home/me', {timeout: timeout});
    return (response.data.profile.is_premium);
  } catch (error) {
    console.error(error);
    return null
  }
}

export const isUserLoggedIn = async (timeout = 0) => {
  /*
  if (localStorage.getItem("token") === null) {
    return false;
  }
  return true;
  */
  const route = '/user/';
  try {
      let response = await axiosInstance.get(route, { timeout: timeout });
      return true;
  } catch (error) {
      return false;
  }
};

export const isServerResponding = async (url="/", timeout=DEFAULT_TIMEOUT) => {
  try {
    await axiosInstance.get(url, {timeout:timeout})
  } catch (error) {
    return false;
  }
  
  return true;
};


export const getUserInformation = async (timeout=DEFAULT_TIMEOUT) => {
  try {
    const res = await axiosInstance.get("/user/", {timeout:timeout});
    return res.data;
  } catch (error) {
    console.error(error);
    return null
  }
}