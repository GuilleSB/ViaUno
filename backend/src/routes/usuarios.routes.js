const express = require("express");
const router = express.Router();
const {
  obtenerUsuarios,
  crearUsuario,
  loginUsuario
} = require("../controllers/usuarios.controller");

router.get("/", obtenerUsuarios);
router.post("/", crearUsuario);
router.post("/login", loginUsuario);


module.exports = router;
