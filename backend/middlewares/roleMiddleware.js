export function allowRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user?.role_id) {
      return res.status(401).json({ message: "No role found" });
    }

    if (!allowedRoles.map(Number).includes(Number(req.user.role_id))) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
}
