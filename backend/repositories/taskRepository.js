const db = require('../database.js');

const create = (title, description, userId) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)';
        db.run(sql, [title, description, userId], function(err) {
            if (err) reject(err);
            resolve({ id: this.lastID });
        });
    });
};

const findRecentByUser = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM tasks WHERE user_id = ? AND completed = 0 ORDER BY created_at DESC LIMIT 5`;
        db.all(sql, [userId], (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
};

const markAsCompleted = (id, userId) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE tasks SET completed = 1 WHERE id = ? AND user_id = ?';
        db.run(sql, [id, userId], function(err) {
            if (err) reject(err);
            resolve({ changes: this.changes });
        });
    });
};

module.exports = {
    create,
    findRecentByUser,
    markAsCompleted,
};
