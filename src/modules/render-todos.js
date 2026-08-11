import { activeProject } from "./project-active.js";

export const todoSide = document.querySelector('.todos-side');

export function renderTodos(project) {
  todoSide.innerHTML = '';

  
  project.todo.forEach(todo => {

    const todoContainer = document.createElement('div');
    const todoCheckbox = document.createElement('input');
    const todoTitle = document.createElement('div');
    const todoDescription = document.createElement('div');
    const todoPriority = document.createElement('div');
    const selectPriority = document.createElement('span');
    const todoDueDate = document.createElement('div');
    const todoEditBtn = document.createElement('button');
    const todoDeleteBtn = document.createElement('button');

    todoCheckbox.type = 'checkbox'

    todoContainer.classList = 'todos';
    todoCheckbox.classList = 'todo-checkbox';
    todoTitle.classList = 'todo-title';
    todoDescription.classList = 'todo-desc';
    todoPriority.classList = 'todo-priority';
    todoDueDate.classList = 'todo-dueDate';
    todoEditBtn.classList.add('btn');
    todoEditBtn.classList.add('btn-edit');
    todoDeleteBtn.classList.add('btn');
    todoDeleteBtn.classList.add('btn-delete');

    todoTitle.textContent = todo.title;
    todoDescription.textContent = todo.description;
    todoPriority.textContent = 'Priority: ';
    selectPriority.textContent = todo.priority;
    todoDueDate.textContent = todo.dueDate;
    todoEditBtn.textContent = 'Edit';
    todoDeleteBtn.textContent = 'Delete';

    todoDeleteBtn.dataset.id = todo.id;
    todoCheckbox.dataset.id = todo.id;  
    todoCheckbox.checked = todo.isCompleted;

    todoPriority.append(selectPriority);
    todoContainer.append(todoCheckbox, todoTitle, todoDescription, todoPriority, todoDueDate, todoEditBtn, todoDeleteBtn);
    todoSide.append(todoContainer);

    console.log(todo.title);
  })

}
