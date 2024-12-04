const jwt = require('jsonwebtoken');

// Middleware para validar JWT
const validateJWT = (req, res, next) => {
  const authHeader = req.header('Authorization');

  // Validar si el encabezado existe y tiene el formato esperado
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      msg: 'No token provided or invalid token format, authorization denied',
    });
  }

  // Extraer el token después de "Bearer "
  const token = authHeader.split(' ')[1];

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Si es válido, añadimos los datos decodificados al request
    req.user = decoded;

    // Continuamos al siguiente middleware o la ruta
    next();
  } catch (error) {
    // Si el token no es válido, retornamos un error
    return res.status(401).json({
      msg: 'Token is not valid',
    });
  }
};

module.exports = validateJWT;