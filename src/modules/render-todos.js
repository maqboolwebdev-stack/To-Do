export const todoSide = document.querySelector('.todos-side');

import { priorityColor } from './priority-color.js';

export function renderTodos(project) {
  todoSide.innerHTML = '';

  if (!project || project.todo.length === 0) {
    const emptyState = document.createElement('div');
    const message = document.createElement('p');
    const projectName = document.createElement('span');
    const addTodoButton = document.createElement('button');

    emptyState.classList.add('empty-state', 'empty-todos-state');
    projectName.className = 'empty-state-project-name';
    projectName.textContent = project?.name || 'none';
    message.append("No to-do yet in '", projectName, "' project");
    addTodoButton.className = 'empty-state-btn';
    addTodoButton.dataset.action = 'add-todo';
    addTodoButton.textContent = 'Add to-do';

    emptyState.append(message, addTodoButton);
    todoSide.append(emptyState);
    return;
  }

  project.todo.forEach((todo) => {
    const todoContainer = document.createElement('div');
    const todoCheckbox = document.createElement('input');
    const todoTitle = document.createElement('div');
    const todoDescription = document.createElement('div');
    const todoPriority = document.createElement('div');
    const selectPriority = document.createElement('span');
    const todoDueDate = document.createElement('div');
    const todoEditBtn = document.createElement('button');
    const todoDeleteBtn = document.createElement('button');

    todoCheckbox.type = 'checkbox';

    todoContainer.classList = 'todos';
    todoContainer.classList.toggle('strike-through', todo.isCompleted);
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
    todoEditBtn.dataset.id = todo.id;
    todoCheckbox.dataset.id = todo.id;
    todoCheckbox.checked = todo.isCompleted;

    todoPriority.append(selectPriority);
    todoContainer.append(
      todoCheckbox,
      todoTitle,
      todoDescription,
      todoPriority,
      todoDueDate,
      todoEditBtn,
      todoDeleteBtn
    );

    priorityColor(selectPriority);

    todoSide.append(todoContainer);
  });
}
