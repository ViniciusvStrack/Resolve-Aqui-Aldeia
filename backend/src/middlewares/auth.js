const jwt = require("jsonwebtoken");
const Profissional = require("../models/Profissional");

const proteger = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({ sucesso: false, mensagem: "Acesso negado. Faça login." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.profissional = await Profissional.findById(decoded.id);
    if (!req.profissional) {
      return res.status(401).json({ sucesso: false, mensagem: "Profissional não encontrado." });
    }
    next();
  } catch {
    return res.status(401).json({ sucesso: false, mensagem: "Token inválido ou expirado." });
  }
};

module.exports = { proteger };
