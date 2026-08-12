import { projects } from './projects.js';

export const projectContainer = document.querySelector('.projects');

export function renderProjects() {
  projectContainer.innerHTML = '';

  projects.forEach((project) => {
    const dynamicProjects = document.createElement('div');
    const projectName = document.createElement('h4');
    const projectDeleteBtn = document.createElement('button');

    dynamicProjects.classList.add('dynamic-projects');
    projectName.classList = 'project-name';
    projectDeleteBtn.classList = 'project-delete-btn';

    projectDeleteBtn.dataset.id = project.id;

    projectName.textContent = project.name;
    projectDeleteBtn.textContent = 'Delete';

    dynamicProjects.append(projectName, projectDeleteBtn);

    projectContainer.append(dynamicProjects);
  });
}

renderProjects();
