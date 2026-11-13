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
        <form class="project-form" novalidate>
            <input type="text" class="project-input" placeholder="Home Work (e.g)" aria-describedby="project-error">
            <p class="project-error" id="project-error" role="alert" hidden></p>
            <div class="btns-container">
                <button type="button" class="close-btn">Close</button>
                <button type="submit" class="save-btn">${isEditing ? 'Update project' : 'Save'}</button>
            </div>
        </form>
    `;

  document.body.append(dialog);

  const closeBtn = dialog.querySelector('.close-btn');
  const form = dialog.querySelector('.project-form');
  const projectInput = dialog.querySelector('.project-input');
  const projectError = dialog.querySelector('.project-error');

  if (projectToEdit) projectInput.value = projectToEdit.name;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const projectName = projectInput.value.trim();

    if (projectName === '') {
      projectError.textContent = 'Project name is required.';
      projectError.hidden = false;
      projectInput.setAttribute('aria-invalid', 'true');
      projectInput.focus();
      return;
    }

    projectError.hidden = true;
    projectInput.removeAttribute('aria-invalid');

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
  });

  closeBtn.addEventListener('click', function () {
    dialog.close();
  });

  projectInput.addEventListener('input', function () {
    if (projectInput.value.trim() !== '') {
      projectError.hidden = true;
      projectInput.removeAttribute('aria-invalid');
    }
  });

  dialog.addEventListener('close', () => dialog.remove(), { once: true });
  dialog.showModal();
}

addProjectBtn.addEventListener('click', () => openProjectDialog());

projectContainer.addEventListener('click', function (e) {
  if (e.target.closest('[data-action="create-project"]')) {
    openProjectDialog();
  }
});
