const express = require("express");
const userModel = require("../models/userModel");
const authenticateUser = require("../middlewares/authenticationMiddleware");
const router = express.Router();

router.get("/user", authenticateUser, async (req, res) => {
  try {
    const user = req.user;
    res.json({
      id: user.id,
      email: user.email,
      nome: user.nome,
      telefones: JSON.parse(user.telefones),
      data_criacao: user.data_criacao,
      data_atualizacao: user.data_atualizacao,
      ultimo_login: user.ultimo_login,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
});

module.exports = router;
