import { projects } from './projects.js';
import { projectContainer } from './projects-ui.js';
import { renderTodos } from './render-todos.js';

export let activeProject = projects.length > 0 ? projects[0] : null;

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

    activeProject = projects.find(
      (project) => project.name === clickedProjectName,
    );

    console.log(activeProject);

    if (activeProject) {
      renderTodos(activeProject);
    }
  }
});

if (activeProject) {
  renderTodos(activeProject);
}
