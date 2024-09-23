/*
 * JavaScript Boilerplate for To-Do List Assignment
 * 
 * This JavaScript file is part of the DOM Manipulation assignment. 
 * Your task is to complete the functions with appropriate DOM manipulation techniques
 * as instructed.
 * 
 * Follow the TODO prompts and complete each section to ensure the to-do list application works as expected.
 */

document.getElementById('addTaskForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Add code to add a new task
    // TODO: retrieve the task title from the form input field
    let taskTitle = '';
    taskTitle = document.getElementById('taskTitle').value;
    
    if (taskTitle.trim() !== '') {
        // TODO: Add new task. HINT: Pass the task title from the form to the addTask() method.
        addTask(taskTitle);
        // TODO: Clear the task title form input field
        document.getElementById('taskTitle').value = '';
    }
});

// Function: Add New Task
function addTask(title) {
    const newTask = {
        id: Date.now(), // Use current timestamp as task ID
        title: title,
        completed: false
    };
    // TODO: push the new task title to teh tasks array
    tasks.push(newTask)
    // TODO: Call the renderTasks() method to update the app
    renderTasks();
}

// Function: Edit Task
function editTask(id, newTitle) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.title = newTitle;
    // TODO: Call the renderTasks() method to update the app
        renderTasks();
    }
}

// Function: Remove Task
function removeTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    // TODO: Call the renderTasks() method to update the app
    renderTasks();
}

// Function: Toggle Task Completion
function toggleTaskCompletion(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        // TODO: Call the renderTasks() method to update the app
        renderTasks();
    }
}

// Function: Render Tasks
function renderTasks(filter = 'all') {
    // Clear the current content of the task list.
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    let filteredTasks = tasks;
    if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (filter === 'pending') {
        // TODO: filter pending tasks
        filteredTasks = tasks.filter(task => !task.completed);
    }

    filteredTasks.forEach(task => {
        // For each task, create a new list item (li) element.
        const taskItem = document.createElement('li');
        // Set the class of the list item.
        taskItem.className = `list-group-item`;
        // Add task title as text to list item.
        taskItem.textContent = task.title;

        // Create Edit Button
        const editButton = document.createElement('button');
        // Add button text
        editButton.textContent = 'Edit';
        // Add css style classes
        editButton.className = 'btn btn-secondary btn-sm float-end';
        // Add event listener for Edit button click
        editButton.addEventListener('click', () => {
            // Create prompt dialog for task edit
            const newTitle = prompt('Enter new title:', task.title);
            // Update the task title in the tasks array if not empty
            if (newTitle && newTitle.trim() !== '') {
                editTask(task.id, newTitle);
            }
        });

        // Create Remove Button
        const removeButton = document.createElement('button');
        // Add button text
        removeButton.textContent = 'Remove';
        // Add css style classes
        removeButton.className = 'btn btn-danger btn-sm float-end me-2';
        // Add event listener for Remove button click
        removeButton.addEventListener('click', () => removeTask(task.id));

        // Add Edit button to the task item
        taskItem.appendChild(editButton);
        // TODO: Add Remove button to the task item
        taskItem.appendChild(removeButton);
        // TODO: Add event listener to task item for completion
        taskItem.addEventListener('click', () => toggleTaskCompletion(task.id));
        // Update taskList item in UI
        taskList.appendChild(taskItem);
    });
}

// Initial Load
let tasks = [];
renderTasks();

// Event Listener for Task Filtering
document.getElementById('filterTasks').addEventListener('change', function (event) {
    renderTasks(event.target.value);
});
