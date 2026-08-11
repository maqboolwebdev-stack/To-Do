import { projects } from './projects.js';
import { projectContainer } from './projects-ui.js';
import { renderTodos } from './render-todos.js';

export let activeProject = projects.length > 0 ? projects[0] : null;

//  This function will be used to update the active project from other files.
export function setActiveProject(project) {
  activeProject = project;
  if (activeProject) {
    renderTodos(activeProject);
  } else {
    renderTodos({ todo: [] });
  }
}

projectContainer.addEventListener('click', function (e) {
  const projectElement = e.target.closest('.project-name');

  if (projectElement) {
    const projectWrapper = projectElement.closest('.dynamic-projects');

    if (projectWrapper) {
      const allWrappers =
        projectContainer.querySelectorAll('.dynamic-projects');
      allWrappers.forEach((wrapper) => wrapper.classList.remove('active'));

      projectWrapper.classList.add('active');
    }

    const clickedProjectName = projectElement.textContent;

    const foundProject = projects.find(
      (project) => project.name === clickedProjectName,
    );

    if (foundProject) {
      setActiveProject(foundProject); // Set the active project for the function.
    }
  }
});

if (activeProject) {
  renderTodos(activeProject);
}
