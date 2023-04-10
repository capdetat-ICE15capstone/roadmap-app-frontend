import { axiosInstance } from "./axiosInstance";

export async function likeRoadmap(roadmap_id) {
  const route = `/roadmap/like/?rid=${roadmap_id}`;
  axiosInstance.put(route)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function unlikeRoadmap(roadmap_id) {
  const route = `/roadmap/unlike/?rid=${roadmap_id}`;
  axiosInstance.put(route)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}

export function nodeShapeGenerator(nodeShape, nodeColor, index, currentTaskIndex) {

  let currentNodeColor = "";

  if (index <= currentTaskIndex) {
    switch (nodeColor) {
      case "gray":
        currentNodeColor = "fill-gray-400";
        break;
      case "red":
        currentNodeColor = "fill-red-400";
        break;
      case "orange":
        currentNodeColor = "fill-orange-400";
        break;
      case "yellow":
        currentNodeColor = "fill-yellow-400";
        break;
      case "green":
        currentNodeColor = "fill-green-400";
        break;
      case "cyan":
        currentNodeColor = "fill-cyan-400";
        break;
      case "blue":
        currentNodeColor = "fill-blue-400";
        break;
      case "violet":
        currentNodeColor = "fill-violet-400";
        break;
      case "pink":
        currentNodeColor = "fill-pink-400";
        break;
      default:
        currentNodeColor = "fill-gray-500";
    }
  } else {
    currentNodeColor = "fill-gray-600"
  }

  switch (nodeShape) {
    case "square":
      return (
        <svg className={`${currentNodeColor} hover:scale-110 transition group duration-100`} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" />
        </svg>
      );
    case "circle":
      return (
        <svg className={`${currentNodeColor} hover:scale-110 transition group duration-100`} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="24" />
        </svg>
      );
    case "triangle":
      return (
        <svg className={`${currentNodeColor} hover:scale-110 transition group duration-100`} width="50" height="48" viewBox="0 0 50 48" xmlns="http://www.w3.org/2000/svg">
          <path d="M25 0L49.2487 48H0.751289L25 0Z" />
        </svg>
      );
    default:
      return (
        <svg className={`${currentNodeColor} hover:scale-110 transition group duration-100`} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="24" />
        </svg>
      );
  }
}