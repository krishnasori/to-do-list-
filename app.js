const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');

let alltodos = getTodos();
updateTodoList();

todoForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Corrected typo
    addTodo(); // Corrected function call
});

function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText.length > 0) {
        const todoObject = {
            text: todoText,
            completed: false
        };
        alltodos.push(todoObject);
        updateTodoList();
        saveTodos();
        todoInput.value = "";
    }
}

function updateTodoList() {
    todoListUL.innerHTML = "";
    alltodos.forEach((todo, todoIndex) => {
        const todoItem = createTodoItem(todo, todoIndex);
        todoListUL.append(todoItem);
    });
}

function createTodoItem(todo, todoIndex) {
    const todoId = "todo-" + todoIndex;
    const todoLI = document.createElement("li");
    const todoText = todo.text;
    todoLI.className = "todo";
    todoLI.innerHTML = `
        <input type ="checkbox" id ="${todoId}" ${todo.completed ? 'checked' : ''}>
        <label class="custom-checkbox" for = "${todoId}">
            <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
        </label>
        <label for ="${todoId}" class="todo-text">
            ${todoText}
        </label>
        <button class="delete-button">
            <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M873-88 609-352 495-238 269-464l56-58 170 170 56-56-414-414 56-58 736 736-56 56ZM269-238 43-464l56-56 170 170 56 56-56 56Zm452-226-56-56 196-196 58 54-198 198ZM607-578l-56-56 86-86 56 56-86 86Z"/></svg>
        </button>
    `;

    const deleteButton = todoLI.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
        deleteTodoItem(todoIndex);
    });

    const checkbox = todoLI.querySelector("input");
    checkbox.addEventListener("change", () => {
        alltodos[todoIndex].completed = checkbox.checked;
        saveTodos();
    });
    
    return todoLI;
}

function deleteTodoItem(todoIndex) {
    alltodos = alltodos.filter((_, i) => i !== todoIndex);
    saveTodos();
    updateTodoList();
}

function saveTodos() {
    const todosJson = JSON.stringify(alltodos);
    localStorage.setItem("todos", todosJson); // Corrected localStorage
}

function getTodos() {
    const todos = localStorage.getItem('todos') || "[]";
    return JSON.parse(todos);
}