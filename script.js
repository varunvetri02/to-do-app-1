function toggleMenu() {
document.getElementById("sidebar").classList.toggle("active");
}
//sidebar function
window.onload = function () {
  loadTasks();
document.getElementById("taskInput").addEventListener("input", () => {
    const input = document.getElementById("taskInput");
    const errorDiv = document.getElementById("inputError");
    input.classList.remove("input-error");
    errorDiv.innerText = "";
  });
};

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
// add task 
function addTask() {
  const input = document.getElementById("taskInput");
  const errorDiv = document.getElementById("inputError");
  const taskText = input.value.trim();

  if (taskText === "") {
    input.classList.add("input-error");
    errorDiv.innerText = "⚠️ Please enter a task.";
    return;
  }

  createTask(taskText);
  saveTasks();
  input.value = "";
  input.classList.remove("input-error");
  errorDiv.innerText = "";
}

//create task
function createTask(taskText) {
  const taskDiv = document.createElement("div");
  taskDiv.className = "task";

  const contentDiv = document.createElement("div");
  contentDiv.className = "task-content";


  let taskSpan = document.createElement("span");
  taskSpan.innerText = taskText;

  const buttonsDiv = document.createElement("div");
  buttonsDiv.className = "task-buttons";

  const editBtn = document.createElement("button");
  editBtn.innerText = "Edit";

    const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";

  const inputError = document.createElement("div");
  inputError.className = "error-message";

  editBtn.onclick = function () {
    if (editBtn.innerText === "Edit") {
      const editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = taskSpan.innerText;
      contentDiv.replaceChild(editInput, taskSpan);
      editBtn.innerText = "Save";
      taskSpan = editInput;

    editInput.addEventListener("input", () => {
        editInput.classList.remove("input-error");
        inputError.innerText = "";
    });
    } else {
      const newText = taskSpan.value.trim();
       if (newText === "") {
        taskSpan.classList.add("input-error");
        inputError.innerText = "⚠️ Task cannot be empty!";
        return;
     }
      const newSpan = document.createElement("span");
      newSpan.innerText = newText;
      contentDiv.replaceChild(newSpan, taskSpan);
      editBtn.innerText = "Edit";
      taskSpan = newSpan;
      inputError.innerText = "";
      saveTasks();
    }
  };

   deleteBtn.onclick = function () {
    taskDiv.remove();
    saveTasks();
  };
  buttonsDiv.appendChild(editBtn);
  buttonsDiv.appendChild(deleteBtn);

  contentDiv.appendChild(taskSpan);
  contentDiv.appendChild(buttonsDiv);

  taskDiv.appendChild(contentDiv);
  taskDiv.appendChild(inputError);


  document.getElementById("taskList").appendChild(taskDiv);
}
 
