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
});