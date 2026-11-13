import { createProject, saveProjects } from './projects.js';
import { projectContainer, renderProjects } from './projects-ui.js';
import { activeProject, setActiveProject } from './project-active.js';

const addProjectBtn = document.querySelector('#project-add-btn');

export function openProjectDialog(projectToEdit = null) {
  const dialog = document.createElement('dialog');
  dialog.className = 'dialog';
  const isEditing = projectToEdit !== null;

  dialog.innerHTML = `
  
        <h3 class="dialog-heading">${isEditing ? 'Edit Project Name:' : 'Project Name:'}</h3>
        <input type="text" class="project-input" placeholder="Home Work (e.g)">
        <div class="btns-container">
            <button class="close-btn">Close</button>
            <button class="save-btn">${isEditing ? 'Update project' : 'Save'}</button>
        </div>
    `;

  document.body.append(dialog);

  const closeBtn = dialog.querySelector('.close-btn');
  const saveBtn = dialog.querySelector('.save-btn');
  const ProjectInput = dialog.querySelector('.project-input');

  if (projectToEdit) ProjectInput.value = projectToEdit.name;

  saveBtn.addEventListener('click', function () {
    if (ProjectInput.value.trim() === '') return;

    const projectName = ProjectInput.value.trim();

    if (projectToEdit) {
      projectToEdit.name = projectName;
      saveProjects();
    } else {
      const project = createProject(projectName);
      if (!activeProject) setActiveProject(project);
    }

    renderProjects();
    if (projectToEdit && activeProject === projectToEdit) {
      setActiveProject(projectToEdit);
    }

    dialog.close();
    dialog.remove();
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
