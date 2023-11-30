const userModel = require("../src/models/userModel");

before(async () => {
  await userModel.open(":memory:");
  await userModel.run(`
    CREATE TABLE users (
      id TEXT PRIMARY KEY,
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
});

afterEach(async () => {
  await userModel.run("DELETE FROM users");
});

after(async () => {
  await userModel.close();
});
