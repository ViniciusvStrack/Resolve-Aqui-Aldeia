const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const avaliacaoSchema = new mongoose.Schema(
  {
    autor: { type: String, required: true },
    nota: { type: Number, required: true, min: 1, max: 5 },
    comentario: { type: String, maxlength: 500 },
  },
  { timestamps: true }
);

const profissionalSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    senha: { type: String, required: true, minlength: 6, select: false },
    telefone: { type: String, required: true },
    whatsapp: { type: String, required: true },

    categoria: {
      type: String,
      required: true,
      enum: ["Jardinagem", "Pintura", "Pedreiro", "Elétrica", "Encanamento", "Limpeza", "Vidraçaria", "Pet Care", "Outro"],
    },
    descricao: { type: String, maxlength: 1000 },
    bairros: [{ type: String }],

    fotoPerfil: { type: String, default: "" },
    fotosServicos: [{ type: String }],

    avaliacoes: [avaliacaoSchema],
    mediaAvaliacoes: { type: Number, default: 0 },
    totalAvaliacoes: { type: Number, default: 0 },

    plano: {
      type: String,
      enum: ["gratis", "profissional", "premium"],
      default: "gratis",
    },
    planoAtivo: { type: Boolean, default: true },
    planoVencimento: { type: Date },

    limiteFotos: { type: Number, default: 3 },
    limiteContatos: { type: Number, default: 5 },
    contatosMes: { type: Number, default: 0 },
    mesAtual: { type: Number, default: new Date().getMonth() },

    ativo: { type: Boolean, default: true },
    verificado: { type: Boolean, default: false },
  },
  { timestamps: true }
);

profissionalSchema.pre("save", async function (next) {
  if (!this.isModified("senha")) return next();
  this.senha = await bcrypt.hash(this.senha, 12);
  next();
});

profissionalSchema.methods.atualizarMedia = function () {
  if (this.avaliacoes.length === 0) {
    this.mediaAvaliacoes = 0;
    this.totalAvaliacoes = 0;
    return;
  }
  const soma = this.avaliacoes.reduce((acc, av) => acc + av.nota, 0);
  this.mediaAvaliacoes = parseFloat((soma / this.avaliacoes.length).toFixed(1));
  this.totalAvaliacoes = this.avaliacoes.length;
};

profissionalSchema.methods.compararSenha = async function (senhaDigitada) {
  return await bcrypt.compare(senhaDigitada, this.senha);
};

module.exports = mongoose.model("Profissional", profissionalSchema);
