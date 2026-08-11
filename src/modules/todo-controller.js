import { renderTodos, todoSide } from './render-todos.js';
import { activeProject } from "./project-active.js";

todoSide.addEventListener('click', function(e) {
  
  if (e.target.classList.contains('btn-delete')) {
    
    const todoId = e.target.dataset.id;
    
    const todoIndex = activeProject.todo.findIndex(t => t.id == todoId);
    
    if (todoIndex !== -1) {
      activeProject.todo.splice(todoIndex, 1);
      
      // reRender todos again after deleting
      renderTodos(activeProject);
    }
  }

  if(e.target.classList.contains('todo-checkbox')) {
    const todoId = e.target.dataset.id; // Like button ID also necessary
    const todo = activeProject.todo.find(t => t.id == todoId);

    if(todo) {
      // Toggle logic
      todo.isCompleted = !todo.isCompleted; // Data update karo
      
      // UI update (strikethrough)
      const container = e.target.closest('.todos');
      if(todo.isCompleted) {
          container.classList.add('strike-through');
      } else {
        container.classList.remove('strike-through');

      }
    }
  }
});