const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const { signup } = require("../src/controllers/authController");

const router = express.Router();

function generateToken(id) {
  return jwt.sign({ id }, "seuSegredo", { expiresIn: "30m" });
}

router.post("/signup", async (req, res) => {
  try {
    const { nome, email, senha, telefones } = req.body;

    const existingUser = await userModel.get(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );
    if (existingUser) {
      return res.status(400).json({ mensagem: "E-mail já cadastrado" });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const userId = require("crypto").randomBytes(16).toString("hex");

    const token = generateToken(userId);

    const currentDate = new Date().toISOString();
    const userData = {
      id: userId,
      nome,
      email,
      senha: hashedPassword,
      telefones: JSON.stringify(telefones),
      data_criacao: currentDate,
      data_atualizacao: currentDate,
      ultimo_login: currentDate,
      token,
    };

    await userModel.run(
      `INSERT INTO users (id, nome, email, senha, telefones, data_criacao, data_atualizacao, ultimo_login, token) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      Object.values(userData)
    );

    res.json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, senha } = req.body;
    const user = await userModel.get(`SELECT * FROM users WHERE email = ?`, [
      email,
    ]);

    if (!user || !(await bcrypt.compare(senha, user.senha))) {
      return res.status(401).json({ mensagem: "Usuário e/ou senha inválidos" });
    }

    const currentDate = new Date().toISOString();
    await userModel.run(`UPDATE users SET ultimo_login = ? WHERE id = ?`, [
      currentDate,
      user.id,
    ]);

    const token = generateToken(user.id);
    const userData = {
      id: user.id,
      data_criacao: user.data_criacao,
      data_atualizacao: user.data_atualizacao,
      ultimo_login: currentDate,
      token,
    };

    res.json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
});

module.exports = {
  signup,
  signin,
};
