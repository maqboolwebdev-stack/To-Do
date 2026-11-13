import { activeProject, setActiveProject } from './project-active.js';
import { createProject, createTodo, saveProjects } from './projects.js';
import { renderTodos, todoSide } from './render-todos.js';
import { renderProjects } from './projects-ui.js';
import { updatePriorityColor } from './priority-color.js';
import {
  getDateTimeInputValue,
  getNextAvailableDateTime,
} from './date-utils.js';

const addTodo = document.querySelector('.todo-btn');

// Reusable function that Create and Edit handle both.
export function openTodoDialog(todoToEdit = null) {
  if (todoToEdit?.isCompleted) return;

  if (!todoToEdit && !activeProject) {
    const defaultProject = createProject('Default project');
    renderProjects();
    setActiveProject(defaultProject);
  }

  const dialog = document.createElement('dialog');
  dialog.classList = 'todoDialog';

  const headerText = todoToEdit ? 'Edit Task:' : 'Create New Task:';
  const saveBtnText = todoToEdit ? 'Update Task' : 'Save Task';

  dialog.innerHTML = `
    <div class="dialog-container">
        <div class="dialog-header">${headerText}</div>

        <form method="dialog" id="todoForm">
            <div class="form-group">
                <label for="title">Title:<span class="required">*</span></label>
                <input type="text" id="title" class="form-control" placeholder="Enter task title" required>
            </div>

            <div class="form-group">
                <label for="description">Description</label>
                <textarea id="description" class="form-control" placeholder="Enter task details..."></textarea>
            </div>

            <div class="form-group">
                <label for="dueDate">Due Date and Time:<span class="required">*</span></label>
                <input type="datetime-local" id="dueDate" class="form-control" required>
            </div>

            <div class="form-group">
                <label for="priority">Priority:</label>
                <select id="priority" class="form-control">
                    <option value="Low">Low</option>
                    <option value="Medium" selected>Medium</option>
                    <option value="High">High</option>
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
  const saveBtn = dialog.querySelector('.save-btn');

  dueDate.min = getNextAvailableDateTime();

  // if edit mode is on then fill the data field with old data/
  if (todoToEdit) {
    title.value = todoToEdit.title;
    description.value = todoToEdit.description;
    dueDate.value = getDateTimeInputValue(todoToEdit.dueDate);
    priority.value = todoToEdit.priority;
  }

  const enterNavigation = [title, description, dueDate, priority, saveBtn];
  enterNavigation.slice(0, -1).forEach((field, index) => {
    field.addEventListener('keydown', function (e) {
      if (
        e.key === 'Enter' &&
        !e.shiftKey &&
        !e.ctrlKey &&
        !e.altKey &&
        !e.metaKey
      ) {
        e.preventDefault();
        enterNavigation[index + 1].focus();
      }
    });
  });

  dueDate.addEventListener('input', function () {
    dueDate.min = getNextAvailableDateTime();
    dueDate.setCustomValidity('');
  });

  closeBtn.addEventListener('click', function () {
    dialog.close();
    dialog.remove();
  });

  updatePriorityColor(priority);
  priority.addEventListener('change', updatePriorityColor);

  // Attaching a validator to the form submission event will prevent the dialog from closing without validation.
  form.addEventListener('submit', function (e) {
    if (todoToEdit?.isCompleted) {
      e.preventDefault();
      dialog.close();
      dialog.remove();
      return;
    }

    const trimmedTitle = title.value.trim();
    const trimmedDueDate = dueDate.value.trim();
    const trimmedDesc = description.value.trim();
    const now = new Date();
    const selectedDueDate = new Date(trimmedDueDate);
    dueDate.min = getNextAvailableDateTime();

    if (
      trimmedTitle === '' ||
      trimmedDueDate === '' ||
      Number.isNaN(selectedDueDate.getTime()) ||
      selectedDueDate <= now
    ) {
      e.preventDefault();
      if (!Number.isNaN(selectedDueDate.getTime()) && selectedDueDate <= now) {
        dueDate.setCustomValidity('Due date and time must be in the future.');
        dueDate.reportValidity();
      }
      return;
    }

    dueDate.setCustomValidity('');

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
      saveProjects();
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

todoSide.addEventListener('click', function (e) {
  if (e.target.closest('[data-action="add-todo"]')) {
    openTodoDialog();
  }
});
