const maxNumOfLetters = 30;

// get string data from localStorage
function getTodosFromLocalStorage() {
  const todos_str = localStorage.getItem('toDoListKey');
  return todos = todos_str ? JSON.parse(todos_str) : [];
}

function addItem(task) {
  const todos = getTodosFromLocalStorage();
  if (task.length > maxNumOfLetters) {
    alert("This is a simple ToDo app, please write your task in a simple way :)");
  }
  todos.push(task);
  updateDataInLocalStorage(todos);
  renderTodoList();
  document.getElementById('task').value = '';
  document.getElementById('task').focus();
}

function removeItem() {
  const id = this.getAttribute('id');
  const todos = getTodosFromLocalStorage();
  todos.splice(id, 1);
  updateDataInLocalStorage(todos);
  renderTodoList();
}

function renderTodoList() {
  const todos = getTodosFromLocalStorage();
  let html = '';
  if (0 === todos.length) {
    html = '<p class="indication">' + 'You do not have anything to-do!' + '</p>'
  } else {
    for (var i = 0; i < todos.length; i++) {
      // use fontawesome trash can icon
      html = `<li>${todos[i]}<i class="remove far fa-trash-alt fa-lg" id="${i}"></i></li>${html}`;
    };
  }
  document.getElementById('todos').innerHTML = html;
  const buttons = document.getElementsByClassName('remove');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', removeItem);
  };
}

function updateDataInLocalStorage(todos) {
  localStorage.setItem('toDoListKey', JSON.stringify(todos));
}
// Add button clicked
document.getElementById('add').addEventListener('click', () => {
  const task = document.getElementById('task').value;
  // if the input field is not empty, add text value to the todo list
  if (task) {
    addItem(task);
  }
});

document.getElementById('task').addEventListener('keydown', function(e) {
  const task = this.value;
  if (('Enter' === e.code || e.code === "NumpadEnter") && task) {
    addItem(task);
  }
});

document.getElementById('removeAll').addEventListener('click', () => {
  const todos = [];
  updateDataInLocalStorage(todos);
  renderTodoList();
});

renderTodoList();
