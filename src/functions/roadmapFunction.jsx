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
  { from: "is_done", to: "isDone" },
];

const inboundSubtaskName = [
  { from: "stid", to: "id" },
  { from: "is_done", to: "status" },
  { from: "title", to: "detail" },
];

const inboundRoadmapName = [{ from: "title", to: "name" }];

const objRename = (obj = null, renameToObj = null) => {
  // Create renameObj (See example such as inboundTaskName)
  // and use it as function parameter to rename object property name

  if (obj === null || renameToObj === null)
    throw new Error("Attribute rename error, Please provide both attribute");

  // Creating new object to prevent side effect
  const newObj = { ...obj };

  renameToObj.forEach((cobj) => {
    newObj[cobj.to] = obj[cobj.from];
    delete newObj[cobj.from];
  });

  return newObj;
};

export const getRoadmap = async (rid, timeout = 0, fetchAll = true) => {
  // timeout - number(ms): specify when the function would stop fetching
  // fetchAll - boolean:
  //  if TRUE, function would fetch all tasks at once and return all of them
  //  if FALSE, function would return only the full task detail of the next task
  //  and the tid of the the unfetched task. The function would also specify the
  //  `hasFetch` boolean of each task as false

  if (rid === undefined || rid === null) return null;
  const route = `roadmaps/${rid}`;

  try {
    const response = await axiosInstance
      .get(route, { timeout: timeout })
      .then((res) => res.data)
      .catch(() => {
        throw new Error("Fetch error");
      });

    // Get all tasks
    let beforeIsDone = true;
    response.tasks = await Promise.all(
      response.task_relation.map(async (tid, index) => {
        if (tid !== response.next_task.tid) {
          if (fetchAll === true) {
            return getTask(tid);
          }

          // If it is not required to fetch that task from the server
          // the function will generate a default task object
          return {
            name: response.tasks_name[index],
            nodeShape: response.shapes[index],
            nodeColor: response.colors[index],
            startDate: new Date(),
            dueDate: new Date(),
            description: "",
            id: tid,
            isDone: beforeIsDone,
            subtasks: [],
            hasFetched: false,
            isTempId: false,
          };
        }

        beforeIsDone = false;
        response.next_task.hasFetched = true;
        return reformTask(response.next_task);
      })
    );

    return reformRoadmap(response);
  } catch (error) {
    console.warn(error);
    return null;
  }
};

export const getTask = async (tid, timeout = 0) => {
  // Get one task
  if (tid === undefined || tid === null) return null;
  const route = `tasks/${tid}`;

  try {
    const response = await axiosInstance
      .get(route, { timeout: timeout })
      .then((res) => res.data)
      .catch((res) => {
        console.warn(res);
        throw new Error("Fetch error");
      });

    return reformTask(response);
  } catch (error) {
    console.warn(error);
    return null;
  }
};

export const reformTask = (taskObj) => {
  // Create new object to prevent side effect
  const newTaskObj = { ...taskObj };

  console.log(newTaskObj);
  newTaskObj.subtasks = taskObj.subtasks.map((subtask) => {
    return objRename(subtask, inboundSubtaskName);
  });

  newTaskObj.start_time = new Date(taskObj.start_time);
  newTaskObj.deadline = new Date(taskObj.deadline);
  newTaskObj.isTempId = false;
  newTaskObj.hasFetched = true;

  return objRename(newTaskObj, inboundTaskName);
};

export const reformRoadmap = (roadmapObject) => {
  // Create new object to prevent side effect
  const newRoadmapObj = { ...roadmapObject };

  return objRename(newRoadmapObj, inboundRoadmapName);
};

// OUTDATED
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
