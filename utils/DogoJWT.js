const jwt = require('jsonwebtoken');

// Middleware para validar JWT
const validateJWT = (req, res, next) => {
  // Obtener el token desde los headers
  const token = req.header('Authorization');

  // Validar si el token existe
  if (!token) {
    return res.status(401).json({
      msg: 'No token provided, authorization denied'
    });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Si es válido, añadimos los datos decodificados al request (opcional)
    req.user = decoded;

    // Continuamos al siguiente middleware o la ruta
    next();
  } catch (error) {
    // Si el token no es válido, retornamos un error
    return res.status(401).json({
      msg: 'Token is not valid'
    });
  }
};

module.exports = validateJWT;