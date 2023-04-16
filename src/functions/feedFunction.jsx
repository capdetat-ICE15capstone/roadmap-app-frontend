import { axiosInstance } from '../functions/axiosInstance';

export async function getRid(searchValue) {
  const route = "/search/roadmap?title=" + searchValue;
  try {
    const response = await axiosInstance.get(route);
    console.log("Below is getRid RESPONSE DATA : ")
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getRoadmap(rids) {
  const route = "/feed/roadmap?rids=" + rids;
  try {
    const response = await axiosInstance.get(route);
    console.log("Below is getRoadmap RESPONSE DATA : ")
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getTagRid(searchValue) {
  const route = "/search/%23" + searchValue.substring(1);
  try {
    const response = await axiosInstance.get(route);
    console.log("Below is getTagRid RESPONSE DATA : ")
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getUid(searchValue) {
  const route = "/search/users?username=" + searchValue.substring(1);
  try {
    const response = await axiosInstance.get(route);
    console.log("Below is getUid RESPONSE DATA : ")
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getUser(uids) {
  const route = "/feed/user?uids=" + uids;
  try {
    const response = await axiosInstance.get(route);
    console.log("Below is getUser RESPONSE DATA : ")
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

