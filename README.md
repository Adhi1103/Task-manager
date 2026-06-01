# Personal Task Manager

## Overview

A full-stack Personal Task Manager application built using React, Node.js, Express, and JSON file storage. Users can create, edit, delete, search, filter, and manage their daily tasks through a clean and responsive interface.

## Features

* Create new tasks
* Edit existing tasks
* Delete tasks with confirmation
* Mark tasks as completed or active
* Search tasks by title
* Filter tasks (All, Active, Completed)
* Task statistics dashboard
* Overdue task highlighting
* Persistent storage using JSON file
* Responsive UI built with React and Tailwind CSS

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js

### Storage

* JSON File (`tasks.json`)

## How to Run Locally

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

## API Endpoints

### Get All Tasks

GET `/api/tasks`

### Create Task

POST `/api/tasks`

### Update Task

PUT `/api/tasks/:id`

### Delete Task

DELETE `/api/tasks/:id`

### Toggle Task Status

PATCH `/api/tasks/:id/toggle`

## Project Structure

```text
client/
server/
README.md
```

## Future Improvements

* User Authentication
* Drag and Drop Task Ordering
* Dark Mode
* Database Integration (MongoDB/PostgreSQL)
* Due Date Notifications
