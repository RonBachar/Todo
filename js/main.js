const todoInput = document.querySelector("#todo-input");
const importanceSelect = document.querySelector("#importance-select");
const allTodosBtn = document.querySelector("#all-todos-btn");
const activeTodosBtn = document.querySelector("#active-todos-btn");
const doneTodosBtn = document.querySelector("#done-todos-btn");
const todoList = document.querySelector(".list-group");

let todos = [];

function addTodo() {
  const todoText = todoInput.value;
  const importance = importanceSelect.value;
  if (todoText.trim() !== "") {
    todos.push({ text: todoText, importance: importance, done: false });
    renderTodos();
    todoInput.value = "";
  }
}

function renderTodos() {
  const todosToShow = getTodosToShow();
  todoList.innerHTML = "";
  todosToShow.forEach((todo, index) => {
    const listItem = document.createElement("li");
    listItem.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );
    listItem.innerHTML = `
  ${todo.text}
  <div>
    <button type="button" class="btn btn-success btn-sm mr-2" onclick="toggleDone(${index})">
      <i class="fa fa-check"></i>
    </button>
    <button type="button" class="btn btn-danger btn-sm" onclick="deleteTodo(${index})">
      <i class="fa fa-times"></i>
    </button>
  </div>
`;
    if (todo.done) {
      listItem.classList.add("list-group-item-success");
    }
    todoList.appendChild(listItem);
  });
}

function toggleDone(index) {
  todos[index].done = !todos[index].done;
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

function getTodosToShow() {
  if (activeTodosBtn.classList.contains("active")) {
    return todos.filter((todo) => !todo.done);
  } else if (doneTodosBtn.classList.contains("active")) {
    return todos.filter((todo) => todo.done);
  } else {
    return todos;
  }
}

allTodosBtn.addEventListener("click", () => {
  allTodosBtn.classList.add("active");
  activeTodosBtn.classList.remove("active");
  doneTodosBtn.classList.remove("active");
  renderTodos();
});

activeTodosBtn.addEventListener("click", () => {
  allTodosBtn.classList.remove("active");
  activeTodosBtn.classList.add("active");
  doneTodosBtn.classList.remove("active");
  renderTodos();
});

doneTodosBtn.addEventListener("click", () => {
  allTodosBtn.classList.remove("active");
  activeTodosBtn.classList.remove("active");
  doneTodosBtn.classList.add("active");
  renderTodos();
});

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  addTodo();
});
