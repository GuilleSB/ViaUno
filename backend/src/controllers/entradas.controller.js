const prisma = require("../config/prisma");

// GET /api/entradas
exports.obtenerEntradas = async (req, res) => {
  try {
    const entradas = await prisma.entradas.findMany({
      where: { usuario_id: req.usuario.id }
    });
    res.json(entradas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener entradas." });
  }
};

// POST /api/entradas
exports.crearEntrada = async (req, res) => {
  try {
    const { tipo, titulo, descripcion, fecha_objetivo } = req.body;

    if (!titulo || !tipo) {
      return res.status(400).json({ error: "Título y tipo son obligatorios." });
    }

    const nueva = await prisma.entradas.create({
      data: {
        usuario_id: req.usuario.id,
        tipo,
        titulo,
        descripcion,
        fecha_objetivo: fecha_objetivo ? new Date(fecha_objetivo) : null
      }
    });

    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ error: "Error al crear entrada." });
  }
};

// PUT /api/entradas/:id
exports.actualizarEntrada = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, tipo, fecha_objetivo, completado } = req.body;

    const entrada = await prisma.entradas.findUnique({
      where: { id: parseInt(id) }
    });

    if (!entrada || entrada.usuario_id !== req.usuario.id) {
      return res.status(403).json({ error: "No autorizado para modificar esta entrada." });
    }

    const actualizada = await prisma.entradas.update({
      where: { id: parseInt(id) },
      data: {
        titulo,
        descripcion,
        tipo,
        fecha_objetivo: fecha_objetivo ? new Date(fecha_objetivo) : undefined,
        completado
      }
    });

    res.json(actualizada);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar entrada." });
  }
};

// DELETE /api/entradas/:id
exports.eliminarEntrada = async (req, res) => {
  try {
    const { id } = req.params;

    const entrada = await prisma.entradas.findUnique({
      where: { id: parseInt(id) }
    });

    if (!entrada || entrada.usuario_id !== req.usuario.id) {
      return res.status(403).json({ error: "No autorizado para eliminar esta entrada." });
    }

    const eliminada = await prisma.entradas.delete({
      where: { id: parseInt(id) }
    });

    res.json({ mensaje: "Entrada eliminada.", entrada: eliminada });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar entrada." });
  }
};
