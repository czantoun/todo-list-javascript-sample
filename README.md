
# To-Do List Application

A feature-rich, user-friendly to-do list application designed to help users manage their tasks efficiently. This application supports multiple users, task categorization, progress tracking, and persistent data storage using `localStorage`.

---

## Features

### Functionality
- **User Authentication**: Simulated login/logout system where each user has their own task list.
- **Task Management**:
  - Add, edit, delete tasks.
  - Mark tasks as completed and move them to a dedicated "Completed Tasks" section.
  - Reorder tasks manually with drag-and-drop.
- **Task Prioritization**: Assign priority levels (High, Medium, Low) with visual cues (color-coded).
- **Task Categorization**: Group tasks into predefined categories (Work, Personal, Shopping).
- **Search and Filter**:
  - Search tasks by name.
  - Filter tasks by priority.
- **Progress Tracker**:
  - Dynamic progress bar showing completed tasks as a percentage of the total.
  - Text summary of progress (e.g., "5 of 10 tasks completed (50%)").
- **Dark Mode Toggle**: Switch between light and dark themes for better visual comfort.
- **Persistent Data Storage**:
  - Save tasks to `localStorage` to ensure data persists across sessions.
  - Tasks are user-specific and automatically loaded upon login.
- **Animations and Transitions**:
  - Smooth visual effects for adding, editing, and deleting tasks.

---

## Folder Structure

```
.
├── public
│   ├── index.html  # Main HTML file
├── src
│   ├── css
│   │   └── style.css  # Stylesheet
│   ├── js
│   │   └── app.js  # Main JavaScript file
```

---

## Future Enhancements
- Add reminders and notifications for tasks.
- Enable customizable categories.
- Support for recurring tasks.
- Integration with a backend for multi-device synchronization.

---