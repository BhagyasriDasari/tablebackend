const sqlite3 = require('sqlite3').verbose();

// Create and export the database instance
const db = new sqlite3.Database('./database.db');

// Initialize the database tables and indexes
function initializeDatabase() {
    db.serialize(() => {
        // Drop tables if they exist
        db.run('DROP TABLE IF EXISTS CompletedOrderTable');
        db.run('DROP TABLE IF EXISTS PendingOrderTable');

        // Create PendingOrderTable
        db.run(`
            CREATE TABLE IF NOT EXISTS PendingOrderTable (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                buyer_qty INTEGER NOT NULL,
                buyer_price REAL NOT NULL,
                seller_price REAL NOT NULL,
                seller_qty INTEGER NOT NULL
            )
        `);

        // Create CompletedOrderTable with additional details
        db.run(`
            CREATE TABLE IF NOT EXISTS CompletedOrderTable (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                buyer_price REAL NOT NULL,
                seller_price REAL NOT NULL,
                buyer_qty INTEGER NOT NULL,
                seller_qty INTEGER NOT NULL,
                qty INTEGER NOT NULL,
                price REAL NOT NULL
            )
        `);

        // Add indexes to speed up queries
        db.run('CREATE INDEX IF NOT EXISTS idx_buyer_price ON PendingOrderTable (buyer_price)');
        db.run('CREATE INDEX IF NOT EXISTS idx_seller_price ON PendingOrderTable (seller_price)');
    });
}

module.exports = {
    db,
    initializeDatabase
};
