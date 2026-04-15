let projects = JSON.parse(localStorage.getItem("projects")) || [];
let currentProjectId = null;

function saveData() {
  localStorage.setItem("projects", JSON.stringify(projects));
}

function renderProjects() {
  const container = document.getElementById("projects");
  container.innerHTML = "";

  projects.forEach(project => {
    const btn = document.createElement("button");
    btn.textContent = project.name;
    btn.onclick = () => openProject(project.id);
    container.appendChild(btn);
  });
}

function openProject(id) {
  currentProjectId = id;
  renderTasks();
}

function createProject() {
  const name = document.getElementById("projectName").value;
  if (!name) return;

  projects.push({
    id: Date.now(),
    name,
    tasks: []
  });

  saveData();
  renderProjects();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  const project = projects.find(p => p.id === currentProjectId);
  if (!project) return;

  project.tasks.forEach(task => {
    const item = document.createElement("div");
    item.textContent = task.title + " (" + task.priority + ")";
    list.appendChild(item);
  });
}

function addTask() {
  const project = projects.find(p => p.id === currentProjectId);
  if (!project) return;

  const title = document.getElementById("taskTitle").value;
  const priority = document.getElementById("priority").value;

  if (!title) return;

  project.tasks.push({
    title,
    priority
  });

  saveData();
  renderTasks();
}

window.onload = () => {
  renderProjects();
};
