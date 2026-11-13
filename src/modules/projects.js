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

function saveProjects() {
  localStorage.setItem('projects', JSON.stringify(projects));
}

function loadProjects() {
  const storedProjects = localStorage.getItem('projects');
  if (storedProjects === null) return null;

  const data = JSON.parse(storedProjects);
  if (!Array.isArray(data)) {
    throw new Error('Saved projects must be an array.');
  }

  return data.map((projData) => {
    if (!projData || typeof projData.name !== 'string') {
      throw new Error('A saved project has invalid data.');
    }

    const project = new Project(projData.name);
    if (typeof projData.id === 'string') project.id = projData.id;

    if (projData.todo !== undefined && !Array.isArray(projData.todo)) {
      throw new Error(`Saved todos for project "${projData.name}" must be an array.`);
    }

    project.todo = (projData.todo || []).map((todoData) => {
      if (!todoData || typeof todoData.title !== 'string') {
        throw new Error(`A saved todo in project "${projData.name}" has invalid data.`);
      }

      const todo = new Todo(
        todoData.title,
        todoData.description || '',
        todoData.dueDate || '',
        todoData.priority || 'Medium'
      );
      if (typeof todoData.id === 'string') todo.id = todoData.id;
      todo.isCompleted = Boolean(todoData.isCompleted);
      return todo;
    });

    return project;
  });
}

const savedProjects = loadProjects();
let projects = savedProjects || [];

function createProject(name) {
  const project = new Project(name);
  projects.push(project);
  saveProjects(); 
  return project;
}

function createTodo(project, title, description, dueDate, priority) {
  const todo = new Todo(title, description, dueDate, priority);
  project.todo.push(todo);
  saveProjects();
  return todo;
}

if (savedProjects === null) {
  createProject('Default Project');

  createTodo(
    projects[0],
    'Prepare Chicken Biryani Recipe',
    'Gather ingredients, marinate the chicken with yogurt and spices, and layer with aromatic basmati rice.',
    '8/11/2026',
    'Low'
  );

  createTodo(
    projects[0],
    'Evening Workout Session',
    'Focus on chest and triceps: Bench Press (3 sets of 12 reps), Incline Dumbbell Press, and Tricep Pushdowns.',
    '8/11/2026',
    'Medium'
  );
}

export { projects, createProject, createTodo, saveProjects };
