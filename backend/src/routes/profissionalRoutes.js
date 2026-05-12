const express = require("express");
const router = express.Router();
const { listar, buscarPorId, atualizarPerfil, uploadFotos, avaliar } = require("../controllers/profissionalController");
const { proteger } = require("../middlewares/auth");
const { upload } = require("../config/cloudinary");

router.get("/", listar);
router.get("/:id", buscarPorId);
router.post("/:id/avaliar", avaliar);
router.put("/meu-perfil", proteger, atualizarPerfil);
router.post("/fotos", proteger, upload.array("fotos", 20), uploadFotos);

module.exports = router;
