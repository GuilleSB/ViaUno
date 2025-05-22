const prisma = require("../config/prisma");

// GET /api/entradas
exports.obtenerEntradas = async (req, res) => {
  try {
    const entradas = await prisma.entradas.findMany();
    res.json(entradas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener entradas." });
  }
};

// POST /api/entradas
exports.crearEntrada = async (req, res) => {
  try {
    const { usuario_id, tipo, titulo, descripcion, fecha_objetivo } = req.body;

    if (!titulo || !usuario_id || !tipo) {
      return res.status(400).json({ error: "Campos obligatorios faltantes." });
    }

    const nueva = await prisma.entradas.create({
      data: {
        titulo,
        tipo,
        usuario_id,
        descripcion,
        fecha_objetivo: fecha_objetivo ? new Date(fecha_objetivo) : null,
      },
    });

    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ error: "Error al crear entrada. " + error });
  }
};

// PUT /api/entradas/:id
exports.actualizarEntrada = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, tipo, fecha_objetivo, completado } = req.body;

    const actualizada = await prisma.entradas.update({
      where: { id: parseInt(id) },
      data: {
        titulo,
        descripcion,
        tipo,
        fecha_objetivo: fecha_objetivo ? new Date(fecha_objetivo) : undefined,
        completado,
      },
    });

    res.json(actualizada);
  } catch (error) {
    res.status(404).json({ error: "Entrada no encontrada o error al actualizar." });
  }
};

// DELETE /api/entradas/:id
exports.eliminarEntrada = async (req, res) => {
  try {
    const { id } = req.params;

    const eliminada = await prisma.entradas.delete({
      where: { id: parseInt(id) },
    });

    res.json({ mensaje: "Entrada eliminada.", entrada: eliminada });
  } catch (error) {
    res.status(404).json({ error: "Entrada no encontrada o error al eliminar." });
  }
};
