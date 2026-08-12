import { activeProject } from './project-active.js';
import { createTodo } from './projects.js';
import { renderTodos } from './render-todos.js';

const addTodo = document.querySelector('.todo-btn');

// Reusable function that Create and Edit handle both.
export function openTodoDialog(todoToEdit = null) {
  const dialog = document.createElement('dialog');
  dialog.classList = 'todoDialog';

  const headerText = todoToEdit ? 'Edit Task:' : 'Create New Task:';
  const saveBtnText = todoToEdit ? 'Update Task' : 'Save Task';

  dialog.innerHTML = `
    <div class="dialog-container">
        <div class="dialog-header">${headerText}</div>
        
        <form method="dialog" id="todoForm">
            <div class="form-group">
                <label for="title">Title<span class="required">*</span></label>
                <input type="text" id="title" class="form-control" placeholder="Enter task title" required>
            </div>

            <div class="form-group">
                <label for="description">Description</label>
                <textarea id="description" class="form-control" placeholder="Enter task details..."></textarea>
            </div>

            <div class="form-group">
                <label for="dueDate">Due Date<span class="required">*</span></label>
                <input type="date" id="dueDate" class="form-control" required>
            </div>

            <div class="form-group">
                <label for="priority">Priority</label>
                <select id="priority" class="form-control">
                    <option value="low">Low</option>
                    <option value="medium" selected>Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            <div class="dialog-actions">
                <button type="button" class="btn close-btn">Close</button>
                <button type="submit" class="btn save-btn">${saveBtnText}</button>
            </div>
        </form>
    </div>
  `;
  document.body.append(dialog);

  const closeBtn = dialog.querySelector('.close-btn');
  const form = dialog.querySelector('#todoForm');
  const title = dialog.querySelector('#title');
  const description = dialog.querySelector('#description');
  const dueDate = dialog.querySelector('#dueDate');
  const priority = dialog.querySelector('#priority');

  // if edit mode is on then fill the data field with old data/
  if (todoToEdit) {
    title.value = todoToEdit.title;
    description.value = todoToEdit.description;
    dueDate.value = todoToEdit.dueDate;
    priority.value = todoToEdit.priority;
  }

  closeBtn.addEventListener('click', function () {
    dialog.close();
    dialog.remove();
  });

  // Attaching a validator to the form submission event will prevent the dialog from closing without validation.
  form.addEventListener('submit', function (e) {
    const trimmedTitle = title.value.trim();
    const trimmedDueDate = dueDate.value.trim();
    const trimmedDesc = description.value.trim();

    if (trimmedTitle === '' || trimmedDueDate === '') {
      e.preventDefault(); 
      return;
    }

    if (todoToEdit) {
      if (trimmedTitle === '' && trimmedDesc === '') {
        e.preventDefault();
        return;
      }
    }

    if (todoToEdit) {
      // update the old todo values (trimmed values save karein taake spaces save na hon)
      todoToEdit.title = trimmedTitle;
      todoToEdit.description = trimmedDesc;
      todoToEdit.dueDate = trimmedDueDate;
      todoToEdit.priority = priority.value;
    } else {
      // Create a new todo
      createTodo(
        activeProject,
        trimmedTitle,
        trimmedDesc,
        trimmedDueDate,
        priority.value
      );
    }

    renderTodos(activeProject);
    dialog.close();
    dialog.remove();
  });

  dialog.showModal();
}

// When "Add Task" button clicked (Create Mode)
addTodo.addEventListener('click', function () {
  openTodoDialog();
});