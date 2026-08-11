class Project {
    constructor(name) {
        this.name = name;
        this.todo = [];
    }
}

class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.id = crypto.randomUUID();
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
createProject('Office');
createProject('Do the best');

createTodo(projects[0], 'cooking', 'I love cooking, I am great in cooking.', '23/3/2027', 'low',);
createTodo(projects[0], 'gym', 'Doing Gym is the best habit for our health.', '23/3/2027', 'medium',);

createTodo(projects[1], 'milk', 'I like drinking very much. Milk is a good source of good fats protein and lots of vitamins and minerals', '23/3/2027', 'medium',);
createTodo(projects[1], 'homework', 'bla bla bla bal bal bla bla bla bla', '23/3/2027', 'High',);
createTodo(projects[2], 'curd', 'Curd same as Milk but curd have good bacteria that support gut health.', '23/3/2027', 'medium',);

export {projects, createProject, createTodo};