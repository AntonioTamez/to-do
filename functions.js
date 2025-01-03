const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const darkModeToggle = document.getElementById('toggle-dark-mode');
const categoryFilter = document.getElementById('category-filter');
const newCategoryInput = document.getElementById('new-category');
const addCategoryButton = document.getElementById('add-category');

const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const categories = JSON.parse(localStorage.getItem('categories')) || ['all'];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function saveCategories() {
    localStorage.setItem('categories', JSON.stringify(categories));
}


function renderTasks() {
    todoList.innerHTML = '';
    const filteredTasks = tasks.filter(task =>
        categoryFilter.value === 'all' || task.category === categoryFilter.value
    );
    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.done) li.classList.add('done');

        const doneButton = document.createElement('button');
        doneButton.textContent = 'Done';
        doneButton.classList.add('done-button');
        doneButton.addEventListener('click', () => {
            task.done = !task.done;
            saveTasks();
            renderTasks();
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        // Contenedor para los botones
        const buttonGroup = document.createElement('div');
        buttonGroup.classList.add('button-group');
        buttonGroup.append(doneButton, deleteButton);

        li.appendChild(buttonGroup);
        todoList.appendChild(li);
    });
}


function renderCategories() {
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskText = todoInput.value.trim();
    if (taskText) {
        tasks.push({
            text: taskText,
            done: false,
            category: categoryFilter.value,
        });
        saveTasks();
        renderTasks();
        todoInput.value = '';
    }
});

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

addCategoryButton.addEventListener('click', () => {
    const newCategory = newCategoryInput.value.trim();
    if (newCategory && !categories.includes(newCategory)) {
        categories.push(newCategory);
        saveCategories();
        renderCategories();
        newCategoryInput.value = '';
    }
});

categoryFilter.addEventListener('change', renderTasks);

renderTasks();
renderCategories();