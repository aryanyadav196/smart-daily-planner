
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");
const taskSummary = document.getElementById("taskSummary");
const remainingCount = document.getElementById("remainingCount");
const progressCircle = document.getElementById("progressCircle");
const progressText = document.getElementById("progressText");
const clearCompletedButton = document.getElementById("clearCompleted");
const currentDate = document.getElementById("currentDate");
const filterButtons = document.querySelectorAll(".filter");

const STORAGE_KEY = "taskly-todos-v1";

let tasks = loadTasks();
let currentFilter = "all";

function loadTasks() {
    try {
        const savedTasks = localStorage.getItem(STORAGE_KEY);
        const parsedTasks = savedTasks ? JSON.parse(savedTasks) : [];

        if (!Array.isArray(parsedTasks)) {
            return [];
        }

        return parsedTasks.filter(task =>
            task &&
            typeof task.id === "string" &&
            typeof task.text === "string" &&
            typeof task.completed === "boolean"
        );
    } catch (error) {
        console.error("Could not load saved tasks:", error);
        return [];
    }
}

function saveTasks() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
        console.error("Could not save tasks:", error);
        alert("Your browser could not save the tasks. Check browser storage settings.");
    }
}

function updateDate() {
    currentDate.textContent = new Intl.DateTimeFormat("en", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric"
    }).format(new Date());
}

function createTask(text) {
    return {
        id: crypto.randomUUID(),
        text,
        completed: false,
        createdAt: new Date().toISOString()
    };
}

function addTask(text) {
    const cleanedText = text.trim();

    if (!cleanedText) {
        taskInput.focus();
        return;
    }

    tasks.unshift(createTask(cleanedText));
    saveTasks();

    currentFilter = "all";
    updateActiveFilter();
    renderTasks();

    taskInput.value = "";
    taskInput.focus();
}

function toggleTask(id) {
    tasks = tasks.map(task =>
        task.id === id
            ? { ...task, completed: !task.completed }
            : task
    );

    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
}

function getVisibleTasks() {
    if (currentFilter === "active") {
        return tasks.filter(task => !task.completed);
    }

    if (currentFilter === "completed") {
        return tasks.filter(task => task.completed);
    }

    return tasks;
}

function updateActiveFilter() {
    filterButtons.forEach(button => {
        const isActive = button.dataset.filter === currentFilter;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });
}

function updateSummary() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const remaining = total - completed;
    const percentage = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    taskSummary.textContent = total === 0
        ? "Let's get things done."
        : `${completed} of ${total} tasks completed`;

    remainingCount.textContent =
        `${remaining} ${remaining === 1 ? "task" : "tasks"} left`;

    progressText.textContent = `${percentage}%`;
    progressCircle.style.background =
        `conic-gradient(var(--primary) ${percentage}%, #eeeff8 ${percentage}%)`;

    clearCompletedButton.disabled = completed === 0;
    clearCompletedButton.style.opacity = completed === 0 ? "0.45" : "1";
    clearCompletedButton.style.cursor = completed === 0 ? "default" : "pointer";
}

function renderTasks() {
    taskList.replaceChildren();

    const visibleTasks = getVisibleTasks();

    visibleTasks.forEach(task => {
        const item = document.createElement("li");
        item.className = `task-item${task.completed ? " completed" : ""}`;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-checkbox";
        checkbox.checked = task.completed;
        checkbox.setAttribute("aria-label", `Complete ${task.text}`);
        checkbox.addEventListener("change", () => toggleTask(task.id));

        const text = document.createElement("span");
        text.className = "task-text";
        text.textContent = task.text;

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-button";
        deleteButton.textContent = "×";
        deleteButton.setAttribute("aria-label", `Delete ${task.text}`);
        deleteButton.title = "Delete task";
        deleteButton.addEventListener("click", () => deleteTask(task.id));

        item.append(checkbox, text, deleteButton);
        taskList.appendChild(item);
    });

    emptyState.hidden = visibleTasks.length !== 0;
    updateSummary();
}

taskForm.addEventListener("submit", event => {
    event.preventDefault();
    addTask(taskInput.value);
});

filterButtons.forEach(button => {
    button.setAttribute(
        "aria-pressed",
        String(button.dataset.filter === currentFilter)
    );

    button.addEventListener("click", () => {
        currentFilter = button.dataset.filter;
        updateActiveFilter();
        renderTasks();
    });
});

clearCompletedButton.addEventListener("click", () => {
    if (tasks.some(task => task.completed)) {
        clearCompletedTasks();
    }
});

updateDate();
updateActiveFilter();
renderTasks();
