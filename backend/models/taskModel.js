// This file is for defining the data structure of a Task.

class Task {
    constructor(id, title, description, created_at, completed, user_id) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.created_at = created_at;
        this.completed = completed;
        this.user_id = user_id;
    }
}

module.exports = Task;
