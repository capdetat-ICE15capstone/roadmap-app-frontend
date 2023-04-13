import { axiosInstance } from "./axiosInstance";

export const isUserPremium = async () => {
    // check whether or not the user is premium
    // return true if the user is premium
    // return false if the user is not logged in or the user is not premium
    return false; // PLACEHOLDER PLS DONT LAUGH
}

export const isUserLoggedIn = () => {
    if (localStorage.getItem("token") === null) {
      return false;
    }
    return true;
}

export const getUserInformation = async () => {
  try {
    const res = await axiosInstance.get("/user/");
    return res;
  } catch (error) {
    console.error(error)
    throw error
  }
}