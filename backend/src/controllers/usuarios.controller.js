const prisma = require("../config/prisma");

// GET /api/usuarios
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await prisma.usuarios.findMany({
      select: {
        id: true,
        nombre: true,
        correo: true,
        creado_en: true
      }
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios." });
  }
};

// POST /api/usuarios (registro)
// Ruta para crear un nuevo usuario
exports.crearUsuario = async (req, res) => {
  try {
    const { nombre, correo, contrasena } = req.body;

    if (!nombre || !correo || !contrasena) {
      return res.status(400).json({ error: "Todos los campos son obligatorios." });
    }

    const usuarioExistente = await prisma.usuarios.findUnique({
      where: { correo }
    });

    if (usuarioExistente) {
      return res.status(409).json({ error: "Correo ya registrado." });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Crear el nuevo usuario
    const nuevo = await prisma.usuarios.create({
      data: { nombre, correo, contrasena: hashedPassword }
    });

    // No enviar la contraseña en la respuesta
    res.status(201).json({
      id: nuevo.id,
      nombre: nuevo.nombre,
      correo: nuevo.correo
    });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar usuario." });
  }
};


const bcrypt = require("bcryptjs"); // Asegúrate de instalar bcryptjs
const jwt = require("jsonwebtoken"); // Asegúrate de instalar jsonwebtoken

// POST /api/usuarios/login
// Ruta para el login de usuarios
exports.loginUsuario = async (req, res) => {
  const { correo, contrasena } = req.body;

  if (!correo || !contrasena) {
    return res.status(400).json({ error: "Correo y contraseña requeridos." });
  }

  try {
    const usuario = await prisma.usuarios.findUnique({
      where: { correo }
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    const match = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!match) {
      return res.status(401).json({ error: "Contraseña incorrecta." });
    }

    const token = jwt.sign(
      { id: usuario.id, correo: usuario.correo },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      mensaje: "Login exitoso",
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error en el login." });
  }
};
