require("dotenv").config();
require("express-async-errors");


const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");


const authRoutes = require("./src/routes/authRoutes");
const profissionalRoutes = require("./src/routes/profissionalRoutes");
const paymentRoutes = require("./src/routes/paymentRoutes");

const app = express();

connectDB();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/profissionais", profissionalRoutes);
app.use("/api/pagamentos", paymentRoutes);

app.get("/", (req, res) => {
  res.json({ mensagem: "🔧 API Resolve Aqui Aldeia rodando!" });
});

// Handler de erros global
app.use((err, req, res, next) => {
  console.error("ERRO:", err.message);
  res.status(err.status || 500).json({
    sucesso: false,
    mensagem: err.message || "Erro interno no servidor.",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
