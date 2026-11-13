import { projects } from './projects.js';

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
    const projectEditBtn = document.createElement('button');
    const projectDeleteBtn = document.createElement('button');

    dynamicProjects.classList.add('dynamic-projects');
    projectName.classList = 'project-name';
    projectEditBtn.classList = 'project-edit-btn';
    projectDeleteBtn.classList = 'project-delete-btn';

    dynamicProjects.dataset.id = project.id;
    projectEditBtn.dataset.id = project.id;
    projectDeleteBtn.dataset.id = project.id;
    dynamicProjects.classList.toggle('active', project.id === activeProjectId);

    projectName.textContent = project.name;
    projectEditBtn.textContent = 'Edit';
    projectDeleteBtn.textContent = 'Delete';

    dynamicProjects.append(projectName, projectEditBtn, projectDeleteBtn);

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
