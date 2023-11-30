const sqlite3 = require("sqlite");

let db;

async function openDatabase(dbPath) {
  db = await sqlite3.open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
  // Configura a tabela de usuários com id como autoincremento
  await db.run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      email TEXT,
      senha TEXT,
      telefones TEXT,
      data_criacao TEXT,
      data_atualizacao TEXT,
      ultimo_login TEXT,
      token TEXT
    )
  `);
}

async function closeDatabase() {
  await db.close();
}

async function runQuery(query, params = []) {
  return await db.run(query, params);
}

async function getUser(query, params = []) {
  return await db.get(query, params);
}

module.exports = {
  open: openDatabase,
  close: closeDatabase,
  run: runQuery,
  get: getUser,
};
