document.addEventListener("DOMContentLoaded", () => {
  let tasks = [];

  const renderTasks = () => {
    const tasksDiv = document.querySelector("#tasks");
    tasksDiv.innerHTML = null;

    tasks.forEach((task) => {
      const taskDiv = document.createElement("div");
      taskDiv.classList.add("task");

      const titleDiv = document.createElement("div");
      titleDiv.classList.add("task-title");
      titleDiv.innerHTML = task.title;

      const completeCheck = document.createElement("input");
      completeCheck.type = "checkbox";
      completeCheck.checked = task.complete;
      if (task.complete) {
        taskDiv.classList.add("complete");
      }
      completeCheck.addEventListener("click", () => completeTask(task.title));

      const deleteButton = document.createElement("button");
      const deleteImage = document.createElement("img");
      deleteImage.src = "images/x-circle.svg";
      deleteImage.alt = "delete task";
      deleteButton.appendChild(deleteImage);
      deleteButton.addEventListener("click", () => deleteTask(task.title));

      taskDiv.appendChild(titleDiv);
      taskDiv.appendChild(completeCheck);
      taskDiv.appendChild(deleteButton);

      tasksDiv.appendChild(taskDiv);
    });

    if (tasks.length > 1) {
      // show only when there are more than one task
      document.querySelector("#task-reset").classList.remove("hidden");
    } else {
      document.querySelector("#task-reset").classList.add("hidden");
    }
  };

  const addTask = () => {
    const title = document.querySelector("#new-task-title").value.trim();

    if (title && !tasks.find((task) => task.title === title)) {
      tasks.push({
        title,
        complete: false,
      });
      document.querySelector("#new-task-title").value = "";
    }

    renderTasks();
  };

  const completeTask = (title) => {
    const task = tasks.find((task) => task.title === title);
    task.complete = !task.complete;

    renderTasks();
  };

  const deleteTask = (title) => {
    const index = tasks.findIndex((task) => task.title === title);
    tasks.splice(index, 1);

    renderTasks();
  };

  const clearTasks = () => {
    tasks = [];
    renderTasks();
  };

  document.querySelector("#add-task").addEventListener("click", addTask);
  document.querySelector("#clear-tasks").addEventListener("click", clearTasks);
});
