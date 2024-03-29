import { axiosInstance } from "./axiosInstance";

// PRIVATE method will NOT deal with errors, it will throw
// error, the parent function should deal with them

const DEFAULT_TIMEOUT = 3000; // unit in ms

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

const inboundRoadmapName = [
  { from: "title", to: "name" },
  { from: "is_private", to: "isPublic" },
  { from: "roadmap_deadline", to: "roadmapDeadline"}
];

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

export const countRoadmap = async (timeout=DEFAULT_TIMEOUT) => {
  try {
    const response = await axiosInstance.get("/roadmap/count/", {timeout:timeout})
    return response.data.count
  } catch (error) {
    console.error(error);
    return null
  }
};

export const countActiveRoadmap = async (timeout=DEFAULT_TIMEOUT) => {
  try {
    const response = await axiosInstance.get("/home/me", {timeout:timeout})
    return response.data.roadmaps.length
  } catch (error) {
    console.error(error);
    return null
  }
}

export const getRoadmap = async (
  rid,
  timeout = DEFAULT_TIMEOUT,
  fetchAll = true,
  rename = true
) => {
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
        if (response.next_task === null || tid !== response.next_task.tid) {
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

    return rename ? reformRoadmap(response) : response;
  } catch (error) {
    console.warn(error);
    return null;
  }
};

export const getTask = async (tid, timeout = DEFAULT_TIMEOUT) => {
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

export const editRoadmap = async (
  rid,
  roadmapChange,
  taskChange,
  subtaskChange,
  relationChange,
  tagChanges,
  reportError,
  timeout = DEFAULT_TIMEOUT
) => {
  console.log("Edit roadmap request: ");
  console.log({
    rid: rid,
    roadmapChange: roadmapChange,
    taskChange: taskChange,
    subtaskChange: subtaskChange,
    relationChange: relationChange,
    tagChanges: tagChanges,
  });

  const response = {};

  try {
    if (roadmapChange !== null) {
      response.roadmapChange = await PRIVATE_updateRoadmap(roadmapChange);
    }

    const [taskAdd, subTaskAdd, taskRelation] = await PRIVATE_addAndReassign(
      rid,
      taskChange.add,
      subtaskChange.add,
      relationChange
    );

    response.addTaskChange = taskAdd;
    response.addSubtaskChange = subTaskAdd;
    response.editTaskChange = await PRIVATE_editTask(taskChange.edit);
    response.deleteTaskChange = await PRIVATE_deleteTask(taskChange.delete);
    response.editSubTaskChange = await PRIVATE_editSubtask(subtaskChange.edit);
    response.deleteSubtaskChange = await PRIVATE_deleteSubtask(
      subtaskChange.delete
    );

    if (taskRelation !== null && taskRelation !== undefined) {
      response.taskRelationChange = await PRIVATE_updateRelation(
        rid,
        taskRelation
      );
    }

    response.addTagChange = await addTags(rid, tagChanges.add);
    response.deleteTagChange = await deleteTags(rid, tagChanges.delete);

    console.log("Edit roadmap response: ");
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    reportError(error);
    return null;
  }
};

export const createRoadmap = async (
  roadmapChange, // null (No Change) or roadmapAttr (For create mode always has roadmapAttr)
  taskChange, // taskChange object {add:[], edit:[], delete:[]}
  subtaskChange, // subtaskChange object {add:[], edit:[], delete:[]
  tagChanges,
  reportError,
  cloneDetail,
  timeout = DEFAULT_TIMEOUT
) => {
  console.log("Create roadmap request: ");
  console.log({
    roadmapChange: roadmapChange,
    taskChange: taskChange,
    subtaskChange: subtaskChange,
  });

  const response = {};

  try {
    // create Roadmap
    response.roadmap = await PRIVATE_createRoadmap(roadmapChange, cloneDetail);
    let oldTaskRelation = taskChange.add.map((tChange) => tChange.id);
    const [taskAdd, subTaskAdd, taskRelation] = await PRIVATE_addAndReassign(
      response.roadmap.rid,
      taskChange.add,
      subtaskChange.add,
      oldTaskRelation
    );

    response.addTaskChange = taskAdd;
    response.addSubtaskChange = subTaskAdd;

    response.taskRelationChange = await PRIVATE_updateRelation(
      response.roadmap.rid,
      taskRelation
    );

    response.addTagChange = await addTags(response.roadmap.rid, tagChanges.add);

    console.log("Create roadmap Response");
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    reportError(error);
    return null;
  }
};

export const addTags = async (rid, tags, timeout = DEFAULT_TIMEOUT) => {
  if (rid === undefined || rid === null) return null;
  let route = "/tag/";

  try {
    const response = Promise.all(
      tags.map((tag) => {
        const reqBody = {
          rid: rid,
          name: tag,
        };
        return axiosInstance.post(route, reqBody, { timeout: timeout });
      })
    );
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteTags = async (rid, tags, timeout = DEFAULT_TIMEOUT) => {
  if (rid === undefined || rid === null) return null;
  let route = "/tag/";

  try {
    const response = Promise.all(
      tags.map((tag) => {
        const reqBody = {
          rid: rid,
          name: tag,
        };
        return axiosInstance.delete(route, { data: reqBody, timeout: timeout });
      })
    );
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const PRIVATE_addAndReassign = async (
  rid,
  taskAdd,
  subTaskAdd,
  taskRelation
) => {
  // call add api and reassign id to task and subtask
  // taskChange.add and subtaskChange.add

  try {
    let taskResponse = await PRIVATE_createTask(rid, taskAdd);

    subTaskAdd.forEach((stChange) => {
      const newIdIndex = taskAdd.findIndex(
        (oldTask) => oldTask.id === stChange.tid
      );
      if (newIdIndex !== -1) stChange.tid = taskResponse[newIdIndex];
    });

    let subtaskResponse = await PRIVATE_createSubtask(subTaskAdd);
    let tempIdMapping = {};

    taskAdd.forEach((tChange, index) => {
      tempIdMapping[tChange.id] = taskResponse[index];
      tChange.id = taskResponse[index];
    });

    subTaskAdd.forEach((stChange, index) => {
      stChange.id = subtaskResponse[index];
    });

    if (taskRelation !== null && taskRelation !== undefined) {
      taskRelation = taskRelation.map((tid) => {
        if (tempIdMapping[tid] !== undefined && tempIdMapping[tid] !== null) {
          console.log(tempIdMapping[tid]);
          return tempIdMapping[tid];
        }
        return tid;
      });
    }

    console.log(taskRelation);

    return [taskAdd, subTaskAdd, taskRelation];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const PRIVATE_createRoadmap = async (roadmap, cloneDetail, timeout = DEFAULT_TIMEOUT) => {
  if (roadmap === null || roadmap === undefined)
    throw new Error("roadmap/is null or undefined");
  if (roadmap.notiStatus.on === false) {
    roadmap.notiStatus.detail = {
      beforeDueDate: false,
      day: 0,
    };
  }
  const route = `/roadmap/`;
  const reqBody = {
    title: roadmap.name,
    description: roadmap.description,
    roadmap_deadline: roadmap.roadmapDeadline.toISOString().slice(0, -5),
    is_before_start_time: !roadmap.notiStatus.detail.beforeDueDate,
    reminder_time: roadmap.notiStatus.detail.day,
    is_private: !roadmap.isPublic,
  };

  if (cloneDetail !== null) {
    // console.log("Cloning roadmap");
    reqBody.creator_id = cloneDetail.creatorId;
    reqBody.fork_rid = cloneDetail.forkId;
    console.log("clone reqBody", reqBody);
  }

  try {
    let response = await axiosInstance.post(route, reqBody, {
      timeout: timeout,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const PRIVATE_updateRoadmap = async (roadmap, timeout = DEFAULT_TIMEOUT) => {
  if (roadmap === null || roadmap.id === null)
    throw new Error("roadmap/roadmap id is null");
  if (roadmap.notiStatus.on === false) {
    roadmap.notiStatus.detail = {
      beforeDueDate: false,
      day: 0,
    };
  }
  const route = `/roadmap/`;
  const reqBody = {
    rid: roadmap.id,
    title: roadmap.name,
    description: roadmap.description,
    roadmap_deadline: roadmap.roadmapDeadline.toISOString().slice(0, -5),
    is_before_start_time: !roadmap.notiStatus.detail.beforeDueDate,
    reminder_time: roadmap.notiStatus.detail.day,
    is_private: !roadmap.isPublic,
  };
  try {
    let response = await axiosInstance.put(route, reqBody, {
      timeout: timeout,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const PRIVATE_updateRelation = async (rid, relation, timeout = DEFAULT_TIMEOUT) => {
  const route = `/roadmap/relation?rid=${rid}`;
  const reqBody = relation;
  console.log(relation);
  try {
    let response = await axiosInstance.put(route, reqBody, {
      timeout: timeout,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const PRIVATE_createTask = async (rid, tasks, timeout = DEFAULT_TIMEOUT) => {
  // always return array of tid
  console.log(rid);
  console.log(tasks);
  if (!Array.isArray(tasks)) tasks = [tasks];
  if (tasks.length === 0) return null;

  let route = "";
  let reqBody = {};

  if (tasks.length === 1) {
    route = `/task/`;
    reqBody = {
      title: tasks[0].name,
      description: tasks[0].description,
      start_time: tasks[0].startDate.toISOString().slice(0, -5),
      deadline: tasks[0].dueDate.toISOString().slice(0, -5),
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
        start_time: task.startDate.toISOString().slice(0, -5),
        deadline: task.dueDate.toISOString().slice(0, -5),
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
        return tidObj.tid;
      });
    } else if (tasks.length === 1) {
      return [response.data.tid];
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const PRIVATE_editTask = async (tasks, timeout = DEFAULT_TIMEOUT) => {
  if (tasks.length === 0) return null;

  let route = "";
  let reqBody = {};

  if (tasks.length === 1) {
    route = `/task/`;
    reqBody = {
      title: tasks[0].name,
      description: tasks[0].description,
      start_time: tasks[0].startDate.toISOString().slice(0, -5),
      deadline: tasks[0].dueDate.toISOString().slice(0, -5),
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
        start_time: task.startDate.toISOString().slice(0, -5),
        deadline: task.dueDate.toISOString().slice(0, -5),
        shape: task.nodeShape,
        color: task.nodeColor,
        tid: task.id,
      };
    });
  }
  try {
    let response = await axiosInstance.put(route, reqBody, {
      timeout: timeout,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const PRIVATE_deleteTask = async (tids, timeout = DEFAULT_TIMEOUT) => {
  if (tids === undefined || tids === null) return null;
  if (!Array.isArray(tids)) tids = [tids];

  try {
    const response = Promise.all(
      tids.map(async (tid) => {
        let route = `/task/${tid}`;
        await axiosInstance.delete(route, { timeout: timeout });
      })
    );

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const PRIVATE_createSubtask = async (subtasks, timeout = DEFAULT_TIMEOUT) => {
  if (!Array.isArray(subtasks)) subtasks = [subtasks];
  if (subtasks.length === 0) return null;

  let route = "";
  let reqBody = {};

  console.log(subtasks);
  if (subtasks.length === 1) {
    route = `/subtask/`;
    reqBody = {
      title: subtasks[0].detail,
      tid: subtasks[0].tid,
    };
  } else if (subtasks.length > 1) {
    route = `/subtask/subtasks`;
    reqBody = subtasks.map((subtask) => {
      return {
        title: subtask.detail,
        tid: subtask.tid,
      };
    });
  }
  console.log(reqBody);
  try {
    let response = await axiosInstance.post(route, reqBody, {
      timeout: timeout,
    });

    if (subtasks.length > 1) {
      return response.data.stids.map((tidObj) => {
        return tidObj.stid;
      });
    } else if (subtasks.length === 1) {
      return [response.data.stid];
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const PRIVATE_editSubtask = async (subtasks, timeout = DEFAULT_TIMEOUT) => {
  if (subtasks.length === 0) return null;

  console.log(subtasks);

  let route = "";
  let reqBody = {};

  if (subtasks.length === 1) {
    route = `/subtask/`;
    reqBody = {
      title: subtasks[0].detail,
      stid: subtasks[0].id,
      is_done: subtasks[0].status,
    };
  } else if (subtasks.length > 1) {
    route = `/subtask/subtasks`;
    reqBody = subtasks.map((subtask) => {
      return {
        title: subtask.detail,
        tid: subtask.id,
        is_done: subtask.status,
      };
    });
  }
  try {
    let response = await axiosInstance.put(route, reqBody, {
      timeout: timeout,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const PRIVATE_deleteSubtask = async (stids, timeout = DEFAULT_TIMEOUT) => {
  if (stids === undefined || stids === null) return null;
  if (!Array.isArray(stids)) stids = [stids];

  try {
    const response = Promise.all(
      stids.map(async (stid) => {
        let route = `/subtask/${stid}`;
        await axiosInstance.delete(route, { timeout: timeout });
      })
    );

    return response;
  } catch (error) {
    console.error(error);
    throw error;
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

  newTaskObj.start_time = new Date(`${taskObj.start_time}Z`);
  newTaskObj.deadline = new Date(`${taskObj.deadline}Z`);
  newTaskObj.isTempId = false;
  newTaskObj.hasFetched = true;

  return objRename(newTaskObj, inboundTaskName);
};

const reformRoadmap = (roadmapObject) => {
  // Create new object to prevent side effect
  const newRoadmapObj = { ...roadmapObject };

  // front and back use different name
  newRoadmapObj.is_private = !newRoadmapObj.is_private;
  newRoadmapObj.roadmap_deadline = new Date(`${roadmapObject.roadmap_deadline}Z`)

  return objRename(newRoadmapObj, inboundRoadmapName);
};
