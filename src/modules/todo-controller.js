import { renderTodos, todoSide } from './render-todos.js';
import { activeProject } from './project-active.js';
import { openTodoDialog } from './todos-dialog.js';
import { saveProjects } from './projects.js';

todoSide.addEventListener('click', function (e) {
  if (!activeProject) return;

  let projectChanged = false;

  //  Delete Logic
  if (e.target.classList.contains('btn-delete')) {
    const todoId = e.target.dataset.id;
    const todoIndex = activeProject.todo.findIndex((t) => t.id == todoId);

    if (todoIndex !== -1) {
      activeProject.todo.splice(todoIndex, 1);
      renderTodos(activeProject);
      projectChanged = true;
    }
  }

  //  Checkbox & Strikethrough Logic
  if (e.target.classList.contains('todo-checkbox')) {
    const todoId = e.target.dataset.id;
    const todo = activeProject.todo.find((t) => t.id == todoId);

    if (todo) {
      todo.isCompleted = !todo.isCompleted;
      if (todo.isCompleted) {
        todo.completedAt = new Date().toISOString();
      }
      projectChanged = true;
      renderTodos(activeProject);
    }
  }

  //  Edit Logic (Open to dialog with data)
  if (e.target.classList.contains('btn-edit')) {
    const todoId = e.target.dataset.id;
    const todo = activeProject.todo.find((t) => t.id == todoId);

    if (todo && !todo.isCompleted) {
      openTodoDialog(todo); // From here passed the todo for edit
    }
  }

  if (projectChanged) saveProjects();
});
