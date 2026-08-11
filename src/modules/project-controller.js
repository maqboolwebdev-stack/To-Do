import { projectContainer, renderProjects } from './projects-ui.js';
import { projects } from './projects.js';
import { activeProject, setActiveProject } from './project-active.js';

projectContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('project-delete-btn')) {
    const projectId = e.target.dataset.id;

    const projectIndex = projects.findIndex((p) => p.id === projectId);

    if (projectIndex !== -1) {
      const deletedProject = projects[projectIndex];

      projects.splice(projectIndex, 1);

      if (activeProject === deletedProject) {
        const nextProject = projects.length > 0 ? projects[0] : null;
        setActiveProject(nextProject);
      }

      renderProjects();
    }
  }
});
