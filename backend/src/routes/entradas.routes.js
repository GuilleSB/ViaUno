const express = require("express");
const router = express.Router();

const {
    obtenerEntradas,
    crearEntrada,
    actualizarEntrada,
    eliminarEntrada
  } = require("../controllers/entradas.controller");

router.get("/", obtenerEntradas);
router.post("/", crearEntrada);
router.put("/:id", actualizarEntrada);
router.delete("/:id", eliminarEntrada);


module.exports = router;
