import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `http://localhost:3000/`,
});

const inboundTaskName = [
  { from: "tid", to: "id" },
  { from: "title", to: "name" },
  { from: "start_time", to: "startDate" },
  { from: "deadline", to: "dueDate" },
  { from: "color", to: "nodeColor" }, 
  { from: "shape", to: "nodeShape" },
  { from: "is_done", to: "isDone" }
];

const inboundSubtaskName = [
  { from: "stid", to: "id" },
  { from: "is_done", to: "isDone" },
  { from: "title", to: "detail" }
]

const universalObjRename = (obj=null, renameToObj=null) => {
  if (obj === null || renameToObj === null) {
    console.log(obj);
    console.log(renameToObj);
    throw new Error("Attribute rename error, Please provide both attribute");
  }

  renameToObj.forEach((cobj) => {
    obj[cobj.to] = obj[cobj.from];
    delete obj[cobj.from];
  });

  return obj;
};

export const getRoadmap = async (rid, timeout = 1000, fetchAll = true) => {

  // This function is used to fetch full roadmap information
  // rid: roadmap id
  // timeout: time before fetching terminate and throws an error
  // fetchAll: the function will continue to fetch all the task
  //  if not, the function will return the default task object
  //  but with boolean "hasFetched" to false

  if (rid === undefined || rid === null)
    return null;

  const route = `roadmaps/${rid}`;

  try {
    const response = await axiosInstance
      .get(route, { timeout: timeout })
      .then((res) => res.data)
      .catch(() => {
        throw new Error("Fetch error");
      });

    const taskLists = await Promise.all(
      response.tasks = response.task_relation.map((tid) => {
        // task logic here
      })
    )
    
    console.log(response)
  } catch (e) {
    console.warn(e);
    return null;
  }
};

export const getTask = async (tid, timeout = 0) => {
  if (tid === undefined || tid === null)
    return null;

  const route = `tasks/${tid}`

  try {
    const response = await axiosInstance
      .get(route, { timeout: timeout })
      .then((res) => res.data)
      .catch((res) => {
        console.warn(res)
        throw new Error("Fetch error");
      });
    
    response.subtasks = response.subtasks.forEach((subtask) => {
      return universalObjRename(subtask, inboundSubtaskName)
    })

    response.hasFetched = true;
    response.start_time = new Date(response.start_time);
    response.deadline = new Date(response.deadline);

    return universalObjRename(response, inboundTaskName);
  } catch (e) {
    console.warn(e);
    return null;
  }
};

export const createRoadmap = async (roadmapObject, timeout = 1000) => {
  // roadmap object: full roadmap object from the page
  if (!roadmapObject) {
    return null;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const response = await fetch("http://localhost:3000/roadmaps/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(roadmapObject),
    timeout: timeout,
    signal: controller.signal,
  });

  clearTimeout(timeoutId);

  if (!response.ok) {
    console.log("fetch error " + response.status);
    return null;
  }

  const result = await response.json();
  return result;
};
