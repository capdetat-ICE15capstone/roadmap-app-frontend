import { axiosInstance } from "./axiosInstance";

// PRIVATE method will NOT deal with errors, it will throw 
// error, the parent function should deal with them

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
  const route = `/roadmap/${rid}`;

  try {
    let response = await axiosInstance.get(route, { timeout: timeout });

    response = response.data;
    console.log(response);

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
  const route = `/task/${tid}`;

  try {
    let response = await axiosInstance.get(route, { timeout: timeout });

    return reformTask(response.data);
  } catch (error) {
    console.warn(error);
    return null;
  }
};

export const updateRoadmap = async (roadmapObject, timeout = 0) => {};

export const createRoadmap = async (
  roadmapChange, // null (No Change) or roadmapAttr (For create mode always has roadmapAttr)
  taskChange, // taskChange object {add:[], edit:[], delete:[]}
  subtaskChange, // subtaskChange object {add:[], edit:[], delete:[]
  relationChange, // null or [1, 2, 3] 
  timeout = 1000
) => {

  try {
    // create Roadmap
    let response = await PRIVATE_createRoadmap(roadmapChange);
    let taskResponse = await PRIVATE_createTask(response.rid, taskChange.add)

    subtaskChange.add.forEach((stChange) => {
      const newIdIndex = taskChange.add.findIndex((oldTask) => oldTask.id === stChange.tid)
      stChange.tid = taskResponse[newIdIndex];
    })

    let subtaskResponse = await PRIVATE_createSubtask(subtaskChange.add);

    taskChange.add.forEach((tChange, index) => {
      console.log(tChange);
      tChange.id = taskResponse[index]
    })
    subtaskChange.add.forEach((stChange, index) => {
      stChange.id = subtaskResponse[index]
    })

    console.log(roadmapChange);
    console.log(taskChange);
    console.log(subtaskChange);
    return response
    
  } catch (error) {
    console.error(error);
    return null;
  }
};

const PRIVATE_createRoadmap = async (roadmap, timeout = 0) => {
  const route = `/roadmap/`;
  const reqBody = {
    title: roadmap.name,
    description: roadmap.description,
    roadmap_deadline: "2023-04-05T18:27:49.875",
    is_before_start_time: true,
    reminder_time: 0,
    is_private: roadmap.publicity,
  };

  try {
    let response = await axiosInstance.post(route, reqBody, {
      timeout: timeout,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Roadmap create axios error");
  }
};

const PRIVATE_updateRoadmap = async (roadmap, timeout = 0) => {
  const route = `/roadmap/`;
  const reqBody = {
    title: roadmap.name,
    description: roadmap.description,
    roadmap_deadline: "2023-04-06T04:57:41.691Z",
    is_before_start_time: true,
    reminder_time: 0,
    is_private: !roadmap.publicity,
    rid: roadmap.id,
  };
  try {
    let response = await axiosInstance.push(route, {
      // Update Roadmap
      timeout: timeout,
      data: reqBody,
    });

    return response.data;
  } catch (error) {
    throw new Error("Roadmap create axios error");
  }
};

const PRIVATE_createTask = async (rid, tasks, timeout = 0) => {
  // always return array of tid
  if (!Array.isArray(tasks)) tasks = [tasks];
  if (tasks.length === 0) return null;

  let route = "";
  let reqBody = {};

  if (tasks.length === 1) {
    route = `/task/`;
    reqBody = {
      title: tasks[0].name,
      description: tasks[0].description,
      start_time: "2023-04-05T18:27:49.875",
      deadline: "2023-04-05T18:27:49.875",
      shape: tasks[0].nodeShape,
      color: tasks[0].nodeColor,
      rid: rid,
    };
  } else if (tasks.length > 1) {
    route = `/task/tasks`;
    reqBody = tasks.map((task) => {
      return {
        title: task.name,
        description: task.description,
        start_time: "2023-04-05T18:27:49.875",
        deadline: "2023-04-05T18:27:49.875",
        shape: task.nodeShape,
        color: task.nodeColor,
        rid: rid,
      };
    });
  }

  try {
    let response = await axiosInstance.post(route, reqBody, {
      timeout: timeout,
    });
    
    if (tasks.length > 1) {
      return response.data.tids.map((tidObj) => {
        return tidObj.tid
      })
    } else if (tasks.length === 1) {
      return [response.data.tid]
    }

  } catch (error) {
    console.error(error);
    throw new Error("Roadmap create axios error");
  }
};

const PRIVATE_editTask = async (tasks, timeout = 0) => {
  if (tasks.length === 0) return null;

  let route = "";
  let reqBody = {};

  if (tasks.length === 1) {
    route = `/task/`;
    reqBody = {
      title: tasks[0].name,
      description: tasks[0].description,
      start_time: tasks[0].startDate,
      deadline: tasks[0].dueDate,
      shape: tasks[0].nodeShape,
      color: tasks[0].nodeColor,
      tid: tasks[0].id,
    };
  } else if (tasks.length > 1) {
    route = `/task/tasks`;
    reqBody = tasks.map((task) => {
      return {
        title: task.name,
        description: task.description,
        start_time: task.startDate,
        deadline: task.dueDate,
        shape: task.nodeShape,
        color: task.nodeColor,
        tid: task.id,
      };
    });
  }
  try {
    let response = await axiosInstance.push(route, {
      // Update Roadmap
      timeout: timeout,
      data: reqBody,
    });

    return response.data;
  } catch (error) {
    throw new Error("Roadmap create axios error");
  }
};

const PRIVATE_deleteTask = async (tid, timeout = 0) => {
  if (tid === undefined || tid === null) return null;

  let route = `/task/${tid}`;
  try {
    let response = await axiosInstance.delete(route, { timeout: timeout });
    return response.data;
  } catch (error) {
    throw new Error("Roadmap create axios error");
  }
};

const PRIVATE_createSubtask = async (subtasks, timeout = 0) => {
  if (!Array.isArray(subtasks)) subtasks = [subtasks];
  if (subtasks.length === 0) return null;

  let route = "";
  let reqBody = {};

  console.log(subtasks);
  if (subtasks.length === 1) {
    route = `/subtask/`;
    reqBody = {
      title: subtasks[0].detail,
      tid: subtasks[0].tid
    };
  } else if (subtasks.length > 1) {
    route = `/subtask/subtasks/`;
    reqBody = subtasks.map((subtask) => {
      return {
        title: subtask.detail,
        tid: subtask.tid
      };
    });
  }
  console.log(reqBody)
  try {
    let response = await axiosInstance.post(route, reqBody, { timeout: timeout });

    if (subtasks.length > 1) {
      return response.data.stids.map((tidObj) => {
        return tidObj.stid
      })
    } else if (subtasks.length === 1) {
      return [response.data.stid]
    }
  } catch (error) {
    console.error(error);
    throw new Error("Roadmap create axios error");
  }
};

const PRIVATE_editSubtask = async (subtask, timeout = 0) => {
  if (subtasks.length === 0) return null;

  let route = "";
  let reqBody = {};

  if (subtasks.length === 1) {
    route = `/subtask/`;
    reqBody = {
      title: subtasks[0].detail,
      tid: tid
    };
  } else if (subtask.length > 1) {
    route = `/subtask/subtasks/`;
    reqBody = subtasks.map((subtask) => {
      return {
        title: subtask.detail,
        tid: tid
      };
    });
  }
  try {
    let response = await axiosInstance.push(route, {
      timeout: timeout,
      data: reqBody,
    });
    return response.data;
  } catch (error) {
    console.error(error)
    throw new Error("Roadmap create axios error");
  }
};

const PRIVATE_deleteSubtask = async (stid, timeout = 0) => {
  if (stid === undefined || stid === null) return null;

  let route = `/subtask/${stid}`;
  try {
    let response = await axiosInstance.delete(route, { timeout: timeout });
    return response.data;
  } catch (error) {
    throw new Error("Roadmap create axios error");
  }
};

const reformTask = (taskObj) => {
  // Create new object to prevent side effect
  const newTaskObj = { ...taskObj };

  console.log(newTaskObj);
  newTaskObj.subtasks = taskObj.subtasks.map((subtask) => {
    subtask.isTempId = false;
    return objRename(subtask, inboundSubtaskName);
  });

  newTaskObj.start_time = new Date(taskObj.start_time);
  newTaskObj.deadline = new Date(taskObj.deadline);
  newTaskObj.isTempId = false;
  newTaskObj.hasFetched = true;

  return objRename(newTaskObj, inboundTaskName);
};

const reformRoadmap = (roadmapObject) => {
  // Create new object to prevent side effect
  const newRoadmapObj = { ...roadmapObject };

  return objRename(newRoadmapObj, inboundRoadmapName);
};
