const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbDir = path.join(__dirname, '../DB');
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'afk.db');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (!err) {
        db.run(`
            CREATE TABLE IF NOT EXISTS afk (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                message TEXT NOT NULL,
                timestamp INTEGER NOT NULL
            )
        `);
    }
});

async function getAfkMessage() {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM afk ORDER BY id DESC LIMIT 1', [], (err, row) => {
            err ? reject(err) : resolve(row || null);
        });
    });
}

async function setAfkMessage(message, timestamp) {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO afk (message, timestamp) VALUES (?, ?)', [message, timestamp], function (err) {
            err ? reject(err) : resolve({ id: this.lastID, message, timestamp });
        });
    });
}

async function delAfkMessage() {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM afk', [], (err) => {
            err ? reject(err) : resolve(true);
        });
    });
}

module.exports = { getAfkMessage, setAfkMessage, delAfkMessage };
