const addTodo = document.querySelector('.todo-btn');

addTodo.addEventListener('click', function () {
  const dialog = document.createElement('dialog');
  dialog.classList = 'todoDialog';

  dialog.innerHTML = `
    <div class="dialog-container">
            <div class="dialog-header">Create New Task</div>
            
            <form method="post">
                <div class="form-group">
                    <label for="title">Title<span class="required">*</span></label>
                    <input type="text" id="title" class="form-control" placeholder="Enter task title" required>
                </div>

                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea id="description" class="form-control" placeholder="Enter task details..."></textarea>
                </div>

                <div class="form-group">
                    <label for="dueDate">Due Date<span class="required">*</span></label>
                    <input type="date" id="dueDate" class="form-control" required>
                </div>

                <div class="form-group">
                    <label for="priority">Priority</label>
                    <select id="priority" class="form-control">
                        <option value="low">Low</option>
                        <option value="medium" selected>Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <div class="dialog-actions">
                    <button type="button" class="btn close-btn">Close</button>
                    <button type="submit" class="btn save-btn">Save Task</button>
                </div>
    `;
  document.body.append(dialog);

  const closeBtn = dialog.querySelector('.close-btn');
  const saveBtn = dialog.querySelector('.save-btn');
  const title = dialog.querySelector('#title');
  const dueDate = dialog.querySelector('#dueDate');

  closeBtn.addEventListener('click', function () {
    dialog.close();
    dialog.remove();
  });

  saveBtn.addEventListener('click', function() {

    console.log(title.value);
    console.log(dueDate.value);

     dialog.close();
    dialog.remove();
  })

  dialog.showModal();
});
