const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS flavors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            is_favorite BOOLEAN NOT NULL,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        )
    `);

    const flavors = [
        { name: 'Vanilla', is_favorite: true },
        { name: 'Chocolate', is_favorite: false },
        { name: 'Strawberry', is_favorite: true },
    ];

    flavors.forEach(flavor => {
        db.run(`
            INSERT INTO flavors (name, is_favorite, created_at, updated_at)
            VALUES (?, ?, datetime('now'), datetime('now'))
        `, [flavor.name, flavor.is_favorite]);
    });
});

module.exports = db;
