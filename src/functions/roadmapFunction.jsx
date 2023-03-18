export const getRoadmap = async (rid, timeout = 1000) => {

  // this function is used to fetch full roadmap information
  // rid: roadmap id
  // timeout: time before fetching terminate and throws an error

  // Will be changed according to API

  if (rid === undefined) {
    return null;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const link = "http://localhost:3000/roadmaps/" + rid;
    const response = await fetch(link, {
      timeout: timeout,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.log("fetch error " + response.status);
      return null;
    }

    const roadmap = await response.json();

    // for each task. change start and due date to date object
    roadmap.tasks.forEach((task) => {
      task.startDate = new Date(task.startDate);
      task.dueDate = new Date(task.dueDate);
    })

    return roadmap;
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
    signal: controller.signal
  });

  clearTimeout(timeoutId);

  if (!response.ok) {
    console.log("fetch error " + response.status);
    return null;
  }

  const result = await response.json();
  return result;
}
