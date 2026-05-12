const jwt = require("jsonwebtoken");
const Profissional = require("../models/Profissional");

const gerarToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

const registrar = async (req, res) => {
  const { nome, email, senha, telefone, whatsapp, categoria, descricao, bairros } = req.body;
  const jaExiste = await Profissional.findOne({ email });
  if (jaExiste) {
    return res.status(400).json({ sucesso: false, mensagem: "E-mail já cadastrado." });
  }
  const profissional = await Profissional.create({
    nome, email, senha, telefone, whatsapp, categoria, descricao,
    bairros: bairros || [],
  });
  res.status(201).json({
    sucesso: true,
    mensagem: "Cadastro realizado!",
    token: gerarToken(profissional._id),
    profissional: { id: profissional._id, nome: profissional.nome, email: profissional.email, categoria: profissional.categoria, plano: profissional.plano },
  });
};

const login = async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ sucesso: false, mensagem: "Informe e-mail e senha." });
  }
  const profissional = await Profissional.findOne({ email }).select("+senha");
  if (!profissional || !(await profissional.compararSenha(senha))) {
    return res.status(401).json({ sucesso: false, mensagem: "E-mail ou senha incorretos." });
  }
  res.json({
    sucesso: true,
    token: gerarToken(profissional._id),
    profissional: { id: profissional._id, nome: profissional.nome, email: profissional.email, categoria: profissional.categoria, plano: profissional.plano },
  });
};

const meuPerfil = async (req, res) => {
  res.json({ sucesso: true, profissional: req.profissional });
};

module.exports = { registrar, login, meuPerfil };
