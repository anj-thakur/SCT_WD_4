// Load tasks on page load
window.onload = function() {
  loadTasks();
};

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskDateTime = document.getElementById("taskDateTime");
  const taskList = document.getElementById("taskList");

  const taskText = taskInput.value.trim();
  const dateTime = taskDateTime.value;

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const task = {
    text: taskText,
    dateTime: dateTime,
    completed: false
  };

  saveTask(task);

  renderTask(task);

  taskInput.value = "";
  taskDateTime.value = "";
}

function renderTask(task) {
  const taskList = document.getElementById("taskList");
  const li = document.createElement("li");

  li.innerHTML = `
    <span>
      <strong>${task.text}</strong> 
      <small>${task.dateTime ? "📅 " + task.dateTime : ""}</small>
    </span>
    <div>
      <button onclick="toggleTask(this)">✔</button>
      <button onclick="editTask(this)">✏</button>
      <button onclick="deleteTask(this)">🗑</button>
    </div>
  `;

  if (task.completed) {
    li.classList.add("completed");
  }

  taskList.appendChild(li);
}

function toggleTask(btn) {
  const li = btn.parentElement.parentElement;
  const text = li.querySelector("strong").innerText;

  li.classList.toggle("completed");

  updateTask(text, { completed: li.classList.contains("completed") });
}

function editTask(btn) {
  const li = btn.parentElement.parentElement;
  const text = li.querySelector("strong").innerText;
  const newText = prompt("Edit task:", text);

  if (newText !== null && newText.trim() !== "") {
    li.querySelector("strong").innerText = newText;
    updateTask(text, { text: newText });
  }
}

function deleteTask(btn) {
  const li = btn.parentElement.parentElement;
  const text = li.querySelector("strong").innerText;
  li.remove();
  deleteTaskFromStorage(text);
}

// =======================
// Local Storage Functions
// =======================
function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => renderTask(task));
}

function updateTask(oldText, updatedFields) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map(task => {
    if (task.text === oldText) {
      return { ...task, ...updatedFields };
    }
    return task;
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTaskFromStorage(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task => task.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}