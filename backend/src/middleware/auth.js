const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado." });
  }

  try {
    const verificado = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = verificado; // datos decodificados del token
    next();
  } catch (error) {
    res.status(403).json({ error: "Token inválido o expirado." });
  }
};

module.exports = verificarToken;
