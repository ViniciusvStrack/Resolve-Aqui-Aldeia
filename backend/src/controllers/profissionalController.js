const Profissional = require("../models/Profissional");

const listar = async (req, res) => {
  const { categoria, bairro, pagina = 1, limite = 12 } = req.query;
  const filtro = { ativo: true };
  if (categoria) filtro.categoria = categoria;
  if (bairro) filtro.bairros = { $in: [bairro] };

  const total = await Profissional.countDocuments(filtro);
  let profissionais = await Profissional.find(filtro)
    .select("-senha -__v")
    .skip((pagina - 1) * limite)
    .limit(Number(limite));

  const ordemPlano = { premium: 0, profissional: 1, gratis: 2 };
  profissionais = profissionais.sort((a, b) => {
    const dp = (ordemPlano[a.plano] ?? 2) - (ordemPlano[b.plano] ?? 2);
    return dp !== 0 ? dp : b.mediaAvaliacoes - a.mediaAvaliacoes;
  });

  res.json({ sucesso: true, total, pagina: Number(pagina), totalPaginas: Math.ceil(total / limite), profissionais });
};

const buscarPorId = async (req, res) => {
  const profissional = await Profissional.findById(req.params.id).select("-senha -__v");
  if (!profissional || !profissional.ativo) {
    return res.status(404).json({ sucesso: false, mensagem: "Profissional não encontrado." });
  }
  res.json({ sucesso: true, profissional });
};

const atualizarPerfil = async (req, res) => {
  const campos = ["nome", "telefone", "whatsapp", "categoria", "descricao", "bairros"];
  const atualizacoes = {};
  campos.forEach((c) => { if (req.body[c] !== undefined) atualizacoes[c] = req.body[c]; });
  const profissional = await Profissional.findByIdAndUpdate(req.profissional._id, atualizacoes, { new: true, runValidators: true }).select("-senha");
  res.json({ sucesso: true, profissional });
};

const uploadFotos = async (req, res) => {
  const profissional = await Profissional.findById(req.profissional._id);
  const totalFotos = profissional.fotosServicos.length + req.files.length;
  if (profissional.limiteFotos !== Infinity && totalFotos > profissional.limiteFotos) {
    return res.status(403).json({ sucesso: false, mensagem: `Seu plano permite no máximo ${profissional.limiteFotos} fotos. Faça upgrade!` });
  }
  profissional.fotosServicos.push(...req.files.map((f) => f.path));
  await profissional.save();
  res.json({ sucesso: true, fotos: profissional.fotosServicos });
};

const avaliar = async (req, res) => {
  const { autor, nota, comentario } = req.body;
  if (!nota || nota < 1 || nota > 5) {
    return res.status(400).json({ sucesso: false, mensagem: "Nota deve ser entre 1 e 5." });
  }
  const profissional = await Profissional.findById(req.params.id);
  if (!profissional) return res.status(404).json({ sucesso: false, mensagem: "Profissional não encontrado." });
  profissional.avaliacoes.push({ autor, nota, comentario });
  profissional.atualizarMedia();
  await profissional.save();
  res.status(201).json({ sucesso: true, mensagem: "Avaliação enviada!", mediaAvaliacoes: profissional.mediaAvaliacoes, totalAvaliacoes: profissional.totalAvaliacoes });
};

module.exports = { listar, buscarPorId, atualizarPerfil, uploadFotos, avaliar };
