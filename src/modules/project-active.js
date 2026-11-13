import { projects } from './projects.js';
import { markActiveProject, projectContainer } from './projects-ui.js';
import { renderTodos } from './render-todos.js';

const ACTIVE_PROJECT_KEY = 'activeProjectId';
const savedActiveProjectId = localStorage.getItem(ACTIVE_PROJECT_KEY);
export let activeProject =
  projects.find((project) => project.id === savedActiveProjectId) ||
  projects[0] ||
  null;

//  This function will be used to update the active project from other files.
export function setActiveProject(project) {
  activeProject = project;
  markActiveProject(project?.id || null);
  if (project) {
    localStorage.setItem(ACTIVE_PROJECT_KEY, project.id);
  } else {
    localStorage.removeItem(ACTIVE_PROJECT_KEY);
  }

  if (activeProject) {
    renderTodos(activeProject);
  } else {
    renderTodos({ todo: [] });
  }
}

projectContainer.addEventListener('click', function (e) {
  const projectWrapper = e.target.closest('.dynamic-projects');
  if (projectWrapper && !e.target.closest('.project-delete-btn')) {
    const foundProject = projects.find(
      (project) => project.id === projectWrapper.dataset.id
    );
    if (foundProject) setActiveProject(foundProject);
  }
});

setActiveProject(activeProject);
