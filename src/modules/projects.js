class Project {
  constructor(name) {
    this.name = name;
    this.todo = [];
    this.id = crypto.randomUUID();
  }
}

class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.id = crypto.randomUUID();
    this.isCompleted = false;
  }
}

const projects = [];

function createProject(name) {
  const project = new Project(name);
  projects.push(project);
  return project;
}

function createTodo(project, title, description, dueDate, priority) {
  const todo = new Todo(title, description, dueDate, priority);
  project.todo.push(todo);
  return todo;
}

createProject('Default Project');

createTodo(
  projects[0],
  'Prepare Chicken Biryani Recipe',
  'Gather ingredients, marinate the chicken with yogurt and spices, and layer with aromatic basmati rice.',
  '8/11/2026',
  'low'
);

createTodo(
  projects[0],
  'Evening Workout Session',
  'Focus on chest and triceps: Bench Press (3 sets of 12 reps), Incline Dumbbell Press, and Tricep Pushdowns.',
  '8/11/2026',
  'medium'
);

export { projects, createProject, createTodo };
