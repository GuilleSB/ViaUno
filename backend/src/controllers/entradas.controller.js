// Simulación de datos (luego se conectará a la BD)
let entradas = [];

exports.obtenerEntradas = (req, res) => {
  res.json(entradas);
};

exports.crearEntrada = (req, res) => {
  const { titulo, descripcion } = req.body;

  if (!titulo) {
    return res.status(400).json({ mensaje: "El título es obligatorio." });
  }

  const nueva = {
    id: entradas.length + 1,
    titulo,
    descripcion: descripcion || "",
    completado: false,
    fecha: new Date()
  };

  entradas.push(nueva);
  res.status(201).json(nueva);
};

exports.actualizarEntrada = (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, completado } = req.body;
  
    const entrada = entradas.find(e => e.id === parseInt(id));
    if (!entrada) {
      return res.status(404).json({ mensaje: "Entrada no encontrada." });
    }
  
    if (titulo !== undefined) entrada.titulo = titulo;
    if (descripcion !== undefined) entrada.descripcion = descripcion;
    if (completado !== undefined) entrada.completado = completado;
  
    res.json(entrada);
  };
  
  exports.eliminarEntrada = (req, res) => {
    const { id } = req.params;
    const index = entradas.findIndex(e => e.id === parseInt(id));
    if (index === -1) {
      return res.status(404).json({ mensaje: "Entrada no encontrada." });
    }
  
    const eliminada = entradas.splice(index, 1);
    res.json({ mensaje: "Entrada eliminada.", entrada: eliminada[0] });
  };