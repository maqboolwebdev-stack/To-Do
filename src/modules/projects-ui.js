import { projects } from './projects.js';
import moreActionsIcon from '../images/more-actions.svg';

export const projectContainer = document.querySelector('.projects');
let activeProjectId = null;

export function renderProjects() {
  projectContainer.innerHTML = '';

  if (projects.length === 0) {
    const emptyState = document.createElement('div');
    const message = document.createElement('p');
    const createProjectButton = document.createElement('button');

    emptyState.classList.add('empty-state', 'empty-projects-state');
    message.textContent = 'No project yet';
    createProjectButton.className = 'empty-state-btn';
    createProjectButton.dataset.action = 'create-project';
    createProjectButton.textContent = 'Create project';

    emptyState.append(message, createProjectButton);
    projectContainer.append(emptyState);
    return;
  }

  projects.forEach((project) => {
    const dynamicProjects = document.createElement('div');
    const projectName = document.createElement('h4');
    const actionsToggle = document.createElement('button');
    const projectEditBtn = document.createElement('button');
    const projectDeleteBtn = document.createElement('button');
    const projectActions = document.createElement('div');
    const actionsMenu = document.createElement('div');
    const editLabel = document.createElement('span');
    const deleteLabel = document.createElement('span');
    const actionsIcon = document.createElement('img');

    dynamicProjects.classList.add('dynamic-projects');
    projectName.classList = 'project-name';
    actionsToggle.className = 'project-actions-toggle';
    projectEditBtn.classList = 'project-edit-btn';
    projectDeleteBtn.classList = 'project-delete-btn';
    projectActions.classList.add('project-actions');
    actionsMenu.className = 'project-actions-menu';

    dynamicProjects.dataset.id = project.id;
    actionsToggle.type = 'button';
    projectEditBtn.dataset.id = project.id;
    projectDeleteBtn.dataset.id = project.id;
    projectEditBtn.type = 'button';
    projectDeleteBtn.type = 'button';
    actionsToggle.setAttribute('aria-label', `Actions for ${project.name}`);
    actionsToggle.setAttribute('aria-haspopup', 'true');
    actionsToggle.setAttribute('aria-expanded', 'false');
    actionsToggle.title = 'Project actions';
    projectEditBtn.setAttribute('aria-label', `Edit ${project.name}`);
    projectDeleteBtn.setAttribute('aria-label', `Delete ${project.name}`);
    projectEditBtn.title = 'Rename the project';
    projectDeleteBtn.title = 'Delete the project';
    editLabel.textContent = 'Edit project';
    deleteLabel.textContent = 'Delete project';
    actionsIcon.src = moreActionsIcon;
    actionsIcon.alt = '';
    actionsIcon.setAttribute('aria-hidden', 'true');
    dynamicProjects.classList.toggle('active', project.id === activeProjectId);

    projectName.textContent = project.name;
    projectName.title = project.name;
    actionsToggle.append(actionsIcon);
    projectEditBtn.append(editLabel);
    projectDeleteBtn.append(deleteLabel);
    actionsMenu.append(projectEditBtn, projectDeleteBtn);
    projectActions.append(actionsToggle, actionsMenu);

    dynamicProjects.append(projectName, projectActions);

    projectContainer.append(dynamicProjects);
  });
}

export function markActiveProject(projectId) {
  activeProjectId = projectId;
  projectContainer.querySelectorAll('.dynamic-projects').forEach((wrapper) => {
    wrapper.classList.toggle('active', wrapper.dataset.id === projectId);
  });
}

renderProjects();
