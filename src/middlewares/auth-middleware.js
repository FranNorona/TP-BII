export const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "No autenticado. Inicia Sesion" });
    }

    if (req.user.role !== requiredRole) {
      return res
        .status(403)
        .json({ error: "Acceso denegado. No tienes permisos" });
    }
  };
};

export const authorizeMultipleRoles = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: "Acceso denegado. No tienes permisos." });
    }
    next();
  };
};