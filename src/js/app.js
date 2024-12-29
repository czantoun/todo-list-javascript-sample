
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username-input');
    const logoutBtn = document.getElementById('logout-btn');
    const appContainer = document.getElementById('app-container');
    const todoInput = document.getElementById('todo-input');
    const addTodoBtn = document.getElementById('add-todo-btn');
    const todoList = document.getElementById('todo-list');
    const completedList = document.getElementById('completed-list');
    const prioritySelect = document.getElementById('priority-select');
    const categorySelect = document.getElementById('category-select');
    const searchInput = document.getElementById('search-input');
    const filterPriority = document.getElementById('filter-priority');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');

    let tasks = [];
    let currentUser = null;

    // Save tasks to localStorage for the current user
    const saveTasks = () => {
        const allTasks = JSON.parse(localStorage.getItem('tasks')) || {};
        allTasks[currentUser] = tasks;
        localStorage.setItem('tasks', JSON.stringify(allTasks));
        console.log(`Tasks saved for ${currentUser}:`, tasks); // Debug log
    };

    // Load tasks from localStorage for the current user
    const loadTasks = () => {
        const allTasks = JSON.parse(localStorage.getItem('tasks')) || {};
        console.log("All tasks in storage:", allTasks); // Debug log
        tasks = allTasks[currentUser] || [];
        console.log(`Tasks loaded for ${currentUser}:`, tasks); // Debug log
        renderTasks();
    };

    // Update progress bar and text based on task completion
    const updateProgress = () => {
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.completed).length;
        const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
        progressBar.style.width = `${progressPercentage}%`;
        progressText.textContent = `${completedTasks} of ${totalTasks} tasks completed (${progressPercentage}%)`;
    };

    // Render tasks dynamically based on filters and completion status
    const renderTasks = () => {
        todoList.innerHTML = '';
        completedList.innerHTML = '';

        const searchTerm = searchInput.value.toLowerCase();
        const priorityFilter = filterPriority.value;

        tasks.forEach((task, index) => {
            if (
                task.name.toLowerCase().includes(searchTerm) &&
                (priorityFilter === 'all' || task.priority === priorityFilter)
            ) {
                const listItem = document.createElement('li');
                listItem.textContent = task.name;
                listItem.setAttribute('data-index', index);

                // Apply priority-based color
                if (task.priority === 'high') {
                    listItem.style.color = 'red';
                } else if (task.priority === 'medium') {
                    listItem.style.color = 'orange';
                } else if (task.priority === 'low') {
                    listItem.style.color = 'green';
                }

                // Add checkbox for task completion
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = task.completed;
                checkbox.addEventListener('change', () => {
                    task.completed = checkbox.checked;
                    saveTasks();
                    renderTasks();
                });

                listItem.prepend(checkbox);

                // Edit button
                const editBtn = document.createElement('button');
                editBtn.textContent = 'Edit';
                editBtn.className = 'edit';
                editBtn.addEventListener('click', () => {
                    const newName = prompt('Edit task name:', task.name);
                    const newPriority = prompt('Edit task priority (high, medium, low):', task.priority);
                    if (newName) task.name = newName.trim();
                    if (newPriority) task.priority = newPriority.toLowerCase().trim();
                    saveTasks();
                    renderTasks();
                });

                // Delete button
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'X';
                deleteBtn.className = 'delete';
                deleteBtn.addEventListener('click', () => {
                    tasks = tasks.filter((_, i) => i !== index);
                    saveTasks();
                    renderTasks();
                });

                listItem.appendChild(editBtn);
                listItem.appendChild(deleteBtn);

                // Move completed tasks to a separate section
                if (task.completed) {
                    listItem.style.textDecoration = 'line-through';
                    completedList.appendChild(listItem);
                } else {
                    todoList.appendChild(listItem);
                }
            }
        });

        updateProgress();
    };

    // Handle user login
    const handleLogin = (event) => {
        event.preventDefault();
        const username = usernameInput.value.trim();
        if (username) {
            currentUser = username;
            localStorage.setItem('currentUser', currentUser);
            console.log("User logged in:", currentUser); // Debug log
            loginForm.style.display = 'none';
            appContainer.style.display = 'block';
            loadTasks();
        }
    };

    // Handle user logout
    const handleLogout = () => {
        currentUser = null;
        localStorage.removeItem('currentUser');
        console.log("User logged out."); // Debug log
        loginForm.style.display = 'block';
        appContainer.style.display = 'none';
    };

    // Event listeners
    loginForm.addEventListener('submit', handleLogin);
    logoutBtn.addEventListener('click', handleLogout);

    addTodoBtn.addEventListener('click', () => {
        const taskName = todoInput.value.trim();
        const priority = prioritySelect.value;
        const category = categorySelect.value;
        if (taskName) {
            tasks.push({ name: taskName, priority, category, completed: false });
            todoInput.value = '';
            saveTasks(); // Save tasks immediately after adding
            renderTasks();
        }
    });

    searchInput.addEventListener('input', renderTasks);
    filterPriority.addEventListener('change', renderTasks);

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
});
