const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const filterBtn = document.getElementById("filterBtn");
const taskList = document.getElementById("taskList");

let tasks = [];

function renderTasks(filteredTasks = tasks) {
  taskList.innerHTML = "";

  if (filteredTasks.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 4;
    cell.textContent = "No task found";
    cell.classList.add("no-task");
    row.appendChild(cell);
    taskList.appendChild(row);
    return;
  }

  filteredTasks.forEach((task, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${task.name}</td>
      <td>${task.date}</td>
      <td>${task.completed ? "Done" : "Pending"}</td>
      <td>
        <button onclick="toggleStatus(${index})">✔</button>
        <button onclick="deleteTask(${index})">🗑</button>
      </td>
    `;
    taskList.appendChild(row);
  });
}

function addTask() {
  const name = taskInput.value.trim();
  const date = dateInput.value;

  if (!name || !date) {
    alert("Please fill in both task and date.");
    return;
  }

  tasks.push({ name, date, completed: false });
  taskInput.value = "";
  dateInput.value = "";
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function toggleStatus(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteAllTasks() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    tasks = [];
    renderTasks();
  }
}

function filterTasks() {
  const filtered = tasks.filter(task => !task.completed);
  renderTasks(filtered);
}

addBtn.addEventListener("click", addTask);
deleteAllBtn.addEventListener("click", deleteAllTasks);
filterBtn.addEventListener("click", filterTasks);

// Initial render
renderTasks();
