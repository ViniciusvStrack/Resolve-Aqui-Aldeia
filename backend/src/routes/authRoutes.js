const express = require("express");
const router = express.Router();
const { registrar, login, meuPerfil } = require("../controllers/authController");
const { proteger } = require("../middlewares/auth");

router.post("/registro", registrar);
router.post("/login", login);
router.get("/eu", proteger, meuPerfil);

module.exports = router;
