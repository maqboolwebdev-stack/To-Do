export function confirmProjectDelete(project, onConfirm) {
  const dialog = document.createElement('dialog');
  const content = document.createElement('div');
  const icon = document.createElement('div');
  const details = document.createElement('div');
  const title = document.createElement('h2');
  const message = document.createElement('p');
  const actions = document.createElement('div');
  const cancelButton = document.createElement('button');
  const deleteButton = document.createElement('button');

  dialog.className = 'project-delete-confirm';
  content.className = 'delete-confirm-content';
  icon.className = 'delete-confirm-icon';
  details.className = 'delete-confirm-details';
  title.className = 'delete-confirm-title';
  title.textContent = `Delete ' ${project.name} '?`;
  message.className = 'delete-confirm-message';
  message.textContent =
    'All todos in this project will be permanently deleted and cannot be recovered. Are you sure?';
  actions.className = 'delete-confirm-actions';
  cancelButton.className = 'cancel-delete-btn';
  cancelButton.type = 'button';
  cancelButton.textContent = 'Cancel';
  deleteButton.className = 'confirm-delete-btn';
  deleteButton.type = 'button';
  deleteButton.textContent = 'Delete project';

  actions.append(cancelButton, deleteButton);
  details.append(title, message);
  content.append(icon, details);
  dialog.append(content, actions);
  document.body.append(dialog);

  cancelButton.addEventListener('click', () => dialog.close());
  deleteButton.addEventListener('click', () => {
    dialog.close();
    onConfirm();
  });
  dialog.addEventListener('close', () => dialog.remove(), { once: true });

  dialog.showModal();
}
