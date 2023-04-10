import { axiosInstance } from "./axiosInstance";

export const isUserPremium = () => {
    // check whether or not the user is premium
    // return true if the user is premium
    // return false if the user is not logged in or the user is not premium
    return true; // PLACEHOLDER PLS DONT LAUGH
}

export const isUserLoggedIn = async (timeout = 0) => {
    // check whether user is logged-in
    /*
    const route = `/roadmap/count/`

    try {
      let response = await axiosInstance.get(route, { timeout: timeout });
      return true;
    } catch (error) {
      return false;
    }
    */

    if (localStorage.getItem("token") === undefined) {
      return false;
    }
    return true;
}