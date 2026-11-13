import { projectContainer, renderProjects } from './projects-ui.js';
import { projects, saveProjects } from './projects.js';
import { activeProject, setActiveProject } from './project-active.js';
import { confirmProjectDelete } from './project-delete-confirm.js';
import { openProjectDialog } from './project-dialog.js';

function deleteProject(project) {
  const projectIndex = projects.findIndex((item) => item.id === project.id);
  if (projectIndex === -1) return;

  projects.splice(projectIndex, 1);
  const nextProject =
    activeProject === project ? projects[0] || null : activeProject;

  renderProjects();
  saveProjects();
  setActiveProject(nextProject);
}

projectContainer.addEventListener('click', function (e) {
  const editButton = e.target.closest('.project-edit-btn');
  if (editButton) {
    const project = projects.find((item) => item.id === editButton.dataset.id);
    if (project) openProjectDialog(project);
    return;
  }

  const deleteButton = e.target.closest('.project-delete-btn');
  if (!deleteButton) return;

  const project = projects.find((item) => item.id === deleteButton.dataset.id);
  if (!project) return;

  if (project.todo.length > 0) {
    confirmProjectDelete(project, () => deleteProject(project));
  } else {
    deleteProject(project);
  }
});
