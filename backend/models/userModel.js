// This file is for defining the data structure of a User.
// In a more complex application, this could be a class with methods,
// or a schema definition for an ORM like Sequelize or Mongoose.

class User {
    constructor(id, username, password) {
        this.id = id;
        this.username = username;
        this.password = password; // Note: This would be the hashed password
    }
}

module.exports = User;
