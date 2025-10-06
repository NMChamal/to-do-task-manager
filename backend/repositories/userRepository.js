const db = require('../database.js');

const findByUsername = (username) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users WHERE username = ?';
        db.get(sql, [username], (err, row) => {
            if (err) reject(err);
            resolve(row);
        });
    });
};

const create = (username, hashedPassword) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
        db.run(sql, [username, hashedPassword], function(err) {
            if (err) reject(err);
            resolve({ id: this.lastID });
        });
    });
};

module.exports = {
    findByUsername,
    create,
};
