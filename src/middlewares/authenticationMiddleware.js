const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

async function authenticateUser(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ mensagem: "Não autorizado" });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), "seuSegredo");

    const user = await userModel.get(`SELECT * FROM users WHERE id = ?`, [
      decoded.id,
    ]);

    if (!user || user.token !== token) {
      return res.status(401).json({ mensagem: "Não autorizado" });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ mensagem: "Sessão inválida" });
    }

    return res.status(401).json({ mensagem: "Não autorizado" });
  }
}

module.exports = authenticateUser;
