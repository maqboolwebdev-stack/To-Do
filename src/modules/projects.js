class Project {
    constructor(name) {
        this.name = name;
        this.todo = [];
    }
}

class Todo {
    constructor(title, description, dueDate, priority, completed) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
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

createTodo(projects[0], 'homework', 'bla bla bla bal bal', '23/3/2027', 'High',);
createTodo(projects[0], 'cooking', 'bla bla bla bal bal', '23/3/2027', 'low',);
createTodo(projects[0], 'gym', 'bla bla bla bal bal', '23/3/2027', 'medium',);

export {projects, createProject};