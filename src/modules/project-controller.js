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

function closeActionsMenus() {
  projectContainer.querySelectorAll('.project-actions-menu.is-open').forEach((menu) => {
    menu.classList.remove('is-open');
    menu.style.removeProperty('left');
    menu.style.removeProperty('top');
    menu.style.removeProperty('visibility');
    menu.previousElementSibling.setAttribute('aria-expanded', 'false');
  });
}

function openActionsMenu(toggle, menu) {
  closeActionsMenus();
  menu.classList.add('is-open');
  toggle.setAttribute('aria-expanded', 'true');

  const toggleRect = toggle.getBoundingClientRect();
  const menuRect = menu.getBoundingClientRect();
  const edgeGap = 8;
  const left = Math.max(
    edgeGap,
    Math.min(
      toggleRect.right - menuRect.width,
      window.innerWidth - menuRect.width - edgeGap
    )
  );
  let top = toggleRect.bottom + edgeGap;

  if (top + menuRect.height > window.innerHeight - edgeGap) {
    top = Math.max(edgeGap, toggleRect.top - menuRect.height - edgeGap);
  }

  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;
}

projectContainer.addEventListener('click', function (e) {
  const actionsToggle = e.target.closest('.project-actions-toggle');
  if (actionsToggle) {
    const actionsMenu = actionsToggle.nextElementSibling;
    if (actionsMenu.classList.contains('is-open')) {
      closeActionsMenus();
    } else {
      openActionsMenu(actionsToggle, actionsMenu);
    }
    return;
  }

  const editButton = e.target.closest('.project-edit-btn');
  if (editButton) {
    const project = projects.find((item) => item.id === editButton.dataset.id);
    closeActionsMenus();
    if (project) openProjectDialog(project);
    return;
  }

  const deleteButton = e.target.closest('.project-delete-btn');
  if (!deleteButton) return;

  closeActionsMenus();
  const project = projects.find((item) => item.id === deleteButton.dataset.id);
  if (!project) return;

  if (project.todo.length > 0) {
    confirmProjectDelete(project, () => deleteProject(project));
  } else {
    deleteProject(project);
  }
});

document.addEventListener('click', function (e) {
  if (!e.target.closest('.project-actions')) closeActionsMenus();
});

document.addEventListener('keydown', function (e) {
  if (e.key !== 'Escape') return;

  const openMenu = projectContainer.querySelector(
    '.project-actions-menu.is-open'
  );
  if (!openMenu) return;

  closeActionsMenus();
  openMenu.previousElementSibling.focus();
});

window.addEventListener('resize', closeActionsMenus);
window.addEventListener('scroll', closeActionsMenus, true);
