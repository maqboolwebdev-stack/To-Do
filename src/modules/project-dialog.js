import { createProject } from './projects.js';
import { projectContainer, renderProjects } from './projects-ui.js';
import { activeProject, setActiveProject } from './project-active.js';

const addProjectBtn = document.querySelector('#project-add-btn');

export function openProjectDialog(onCreated) {
  const dialog = document.createElement('dialog');
  dialog.className = 'dialog';

  dialog.innerHTML = `
  
        <h3 class="dialog-heading">Project Name:</h3>
        <input type="text" class="project-input" placeholder="Home Work (e.g)">
        <div class="btns-container">
            <button class="close-btn">Close</button>
            <button class="save-btn">Save</button>
        </div>
    `;

  document.body.append(dialog);

  const closeBtn = dialog.querySelector('.close-btn');
  const saveBtn = dialog.querySelector('.save-btn');
  const ProjectInput = dialog.querySelector('.project-input');

  saveBtn.addEventListener('click', function () {
    if (ProjectInput.value.trim() === '') return;

    const projectName = ProjectInput.value.trim();

    const project = createProject(projectName);
    renderProjects();
    if (!activeProject) setActiveProject(project);

    dialog.close();
    dialog.remove();
    if (onCreated) onCreated(project);
  });

  closeBtn.addEventListener('click', function () {
    dialog.close();
    dialog.remove();
  });

  dialog.showModal();

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (dialog) {
        dialog.remove();
      }
    }
  });
}

addProjectBtn.addEventListener('click', () => openProjectDialog());

projectContainer.addEventListener('click', function (e) {
  if (e.target.closest('[data-action="create-project"]')) {
    openProjectDialog();
  }
});
