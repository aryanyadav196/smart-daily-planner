# 🚀 Taskly — Dockerized Todo Web App

A modern, responsive Todo web application built with **HTML, CSS, and JavaScript**, and containerized using **Docker and Nginx**. Taskly helps you organize daily tasks through a clean interface and simple task management features.

## ✨ Features

- ✅ Add, complete, and delete tasks
- 🔍 Filter tasks by status
- 🧹 Clear completed tasks
- 💾 Save tasks in browser `localStorage`
- 🎨 Clean and responsive user interface
- 📱 Works on desktop and mobile browsers
- 🐳 Dockerized deployment using Nginx
- ⚡ Lightweight static web application

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Application structure |
| CSS3 | Styling and responsive design |
| JavaScript | Task management and interactions |
| Docker | Application containerization |
| Nginx | Web server |

## 📸 Preview
<img width="1080" height="1008" alt="Screenshot 2026-10-22 200541" src="https://github.com/user-attachments/assets/2b1b42ab-4bfe-4de8-a6e8-fa935c17b36f" />


<!-- Add your latest Taskly screenshot here -->
<!-- Example: ![Taskly Preview](screenshots/taskly-preview.png) -->

## 🚀 Getting Started

### Prerequisites

- Docker Desktop installed and running
- Git (optional, for cloning the repository)

### 1. Clone the Repository

```bash
git clone https://github.com/aryanyadav196/smart-daily-planner.git
```

### 2. Navigate to the Project Folder

```bash
cd smart-daily-planner
```

> If you are using your existing local project, open its folder instead.

### 3. Build the Docker Image

Run this command from the directory containing the `Dockerfile`:

```bash
docker build -t taskly-todo:1.0 .
```

### 4. Run the Container

```bash
docker run -d --name taskly-todo-app -p 8080:80 taskly-todo:1.0
```

### 5. Open the Application

Visit:

**http://localhost:8080**

### Useful Docker Commands

Check running containers:

```bash
docker ps
```

Stop the application:

```bash
docker stop taskly-todo-app
```

Start it again:

```bash
docker start taskly-todo-app
```

Remove the stopped container:

```bash
docker rm taskly-todo-app
```

To rebuild after changing the source files, stop and remove the old container, rebuild the image, and run a new container.

## 📂 Project Structure

```text
To-Do/
├── index.html
├── style.css
├── script.js
├── Dockerfile
├── .dockerignore
└── README.md
```

## 💾 Data Storage

Tasks are stored in the browser's `localStorage`. This means task data is saved locally in that browser and is not automatically synchronized across devices or browsers.

## 🔒 Privacy

The application is a static frontend served by Nginx. Task storage uses browser `localStorage`; the app does not require a dedicated backend or database for its current functionality.

## 🎯 Future Improvements

- ✏️ Edit existing tasks
- 📅 Add due dates and reminders
- 🏷️ Organize tasks into categories
- 🔄 Drag-and-drop task sorting
- 📊 Task completion statistics

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome. Fork the repository, make your changes, and submit a pull request.

## ⭐ Support

If you find this project useful, consider giving the repository a star ⭐.

---

**Built with ❤️ using HTML, CSS, JavaScript, Docker, and Nginx.**
