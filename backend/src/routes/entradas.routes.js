const express = require("express");
const router = express.Router();
const verificarToken = require("../middleware/auth");

const {
    obtenerEntradas,
    crearEntrada,
    actualizarEntrada,
    eliminarEntrada
  } = require("../controllers/entradas.controller");

router.use(verificarToken); // Protege todas las rutas con el middleware de verificación de token

// Rutas para las entradas
router.get("/", obtenerEntradas);
router.post("/", crearEntrada);
router.put("/:id", actualizarEntrada);
router.delete("/:id", eliminarEntrada);


module.exports = router;
