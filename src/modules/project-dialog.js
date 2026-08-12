import { createProject } from './projects.js';
import { renderProjects } from './projects-ui.js';

const addProjectBtn = document.querySelector('#project-add-btn');

function openProjectDialog() {
  const dialog = document.createElement('dialog');
  dialog.className = 'dialog';

  dialog.innerHTML = `
  
        <h3 class="dialog-heading">Project Name:</h3>
        <input type="text" class="project-input" placeholder="Home Work (e.g)">
        <div class="btns-container">
            <button class="close-btn">Close</button>
            <button class="save-btn">Save</button>
        </div>
    `;

  document.body.append(dialog);

  const closeBtn = dialog.querySelector('.close-btn');
  const saveBtn = dialog.querySelector('.save-btn');
  const ProjectInput = dialog.querySelector('.project-input');

  saveBtn.addEventListener('click', function () {
    const projectName = ProjectInput.value;

    createProject(projectName);
    renderProjects();

    dialog.close();
    dialog.remove();
  });

  closeBtn.addEventListener('click', function () {
    dialog.close();
    dialog.remove();
  });

  dialog.showModal();
}

addProjectBtn.addEventListener('click', openProjectDialog);
