import { renderTodos, todoSide } from './render-todos.js';
import { activeProject } from './project-active.js';
import { openTodoDialog } from './todos-dialog.js';

todoSide.addEventListener('click', function (e) {
  //  Delete Logic
  if (e.target.classList.contains('btn-delete')) {
    const todoId = e.target.dataset.id;
    const todoIndex = activeProject.todo.findIndex((t) => t.id == todoId);

    if (todoIndex !== -1) {
      activeProject.todo.splice(todoIndex, 1);
      renderTodos(activeProject);
    }
  }

  //  Checkbox & Strikethrough Logic
  if (e.target.classList.contains('todo-checkbox')) {
    const todoId = e.target.dataset.id;
    const todo = activeProject.todo.find((t) => t.id == todoId);

    if (todo) {
      todo.isCompleted = !todo.isCompleted;

      const container = e.target.closest('.todos');
      if (todo.isCompleted) {
        container.classList.add('strike-through');
      } else {
        container.classList.remove('strike-through');
      }
    }
  }

  //  Edit Logic (Open to dialog with data)
  if (e.target.classList.contains('btn-edit')) {
    const todoId = e.target.dataset.id;
    const todo = activeProject.todo.find((t) => t.id == todoId);

    if (todo) {
      openTodoDialog(todo); // From here passed the todo for edit
    }
  }
});
