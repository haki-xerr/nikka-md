const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

const dbDir = path.join(__dirname, "../../DB");
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, "alive.db");
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) console.error("Error opening database:", err.message);
  else {
    db.run(`
      CREATE TABLE IF NOT EXISTS alive (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        message TEXT NOT NULL
      )
    `);
  }
});

async function getAlive() {
  return new Promise((resolve, reject) => {
    db.get("SELECT message FROM alive ORDER BY id DESC LIMIT 1", [], (err, row) => {
      if (err) reject(err);
      resolve(row ? row.message : null);
    });
  });
}

async function setAlive(message) {
  return new Promise((resolve, reject) => {
    db.run("INSERT INTO alive (message) VALUES (?)", [message], function (err) {
      if (err) reject(err);
      resolve({ id: this.lastID, message });
    });
  });
}

async function resetAlive() {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM alive", [], function (err) {
      if (err) reject(err);
      resolve(true);
    });
  });
}

module.exports = { getAlive, setAlive, resetAlive };
