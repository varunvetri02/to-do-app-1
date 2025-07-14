function toggleMenu() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("active");
}

window.onload = function () {
  loadTasks();

  const menuLinks = document.querySelectorAll("#sidebar a");
  menuLinks.forEach(link => {
    link.addEventListener("click", () => {
      document.getElementById("sidebar").classList.remove("active");
    });
  });
};

document.addEventListener("click", function (event) {
  const sidebar = document.getElementById("sidebar");
  const hamburger = document.querySelector(".hamburger");
  const isInsideSidebar = sidebar.contains(event.target);
  const isHamburgerClick = hamburger.contains(event.target);

  if (!isInsideSidebar && !isHamburgerClick) {
    sidebar.classList.remove("active");
  }
});

function saveTasks() {
  const tasks = [];
  document.querySelectorAll(".task span").forEach(span => {
    tasks.push(span.innerText);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  savedTasks.forEach(taskText => {
    createTask(taskText);
  });
}

function createTask(taskText) {
  const taskDiv = document.createElement("div");
  taskDiv.className = "task";

  let taskSpan = document.createElement("span");
  taskSpan.innerText = taskText;

  const editBtn = document.createElement("button");
  editBtn.innerText = "Edit";

  editBtn.onclick = function () {
    if (editBtn.innerText === "Edit") {
      const editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = taskSpan.innerText;
      taskDiv.replaceChild(editInput, taskSpan);
      editBtn.innerText = "Save";
      taskSpan = editInput;
    } else {
      const newSpan = document.createElement("span");
      newSpan.innerText = taskSpan.value;
      taskDiv.replaceChild(newSpan, taskSpan);
      editBtn.innerText = "Edit";
      taskSpan = newSpan;
      saveTasks();
    }
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.onclick = function () {
    taskDiv.remove();
    saveTasks();
  };

  taskDiv.appendChild(taskSpan);
  taskDiv.appendChild(editBtn);
  taskDiv.appendChild(deleteBtn);

  document.getElementById("taskList").appendChild(taskDiv);
}

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (taskText === "") return;

  createTask(taskText);
  saveTasks();
  input.value = "";
}


