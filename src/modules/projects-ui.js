import { projects } from './projects.js';

export const projectContainer = document.querySelector('.projects');
let activeProjectId = null;

export function renderProjects() {
  projectContainer.innerHTML = '';

  projects.forEach((project) => {
    const dynamicProjects = document.createElement('div');
    const projectName = document.createElement('h4');
    const projectDeleteBtn = document.createElement('button');

    dynamicProjects.classList.add('dynamic-projects');
    projectName.classList = 'project-name';
    projectDeleteBtn.classList = 'project-delete-btn';

    dynamicProjects.dataset.id = project.id;
    projectDeleteBtn.dataset.id = project.id;
    dynamicProjects.classList.toggle('active', project.id === activeProjectId);

    projectName.textContent = project.name;
    projectDeleteBtn.textContent = 'Delete';

    dynamicProjects.append(projectName, projectDeleteBtn);

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
