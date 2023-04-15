import { axiosInstance } from "./axiosInstance";

export const isUserPremium = async () => {
    // check whether or not the user is premium
    // return true if the user is premium
    // return false if the user is not logged in or the user is not premium
    return true; // PLACEHOLDER PLS DONT LAUGH
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

export const isServerResponding = async (url="/") => {
  try {
    await axiosInstance.get(url)
  } catch (error) {
    return false;
  }

  
  return true;
};


export const getUserInformation = async () => {
  try {
    const res = await axiosInstance.get("/user/");
    return res.data;
  } catch (error) {
    console.error(error)
    throw error
  }
}