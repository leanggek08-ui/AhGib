export function isAdmin(req, res, next) {
    if (req.user.role_id !== 1) {
        return res.status(403).json({ message: "Admin only" });
    }
    next();
}

export function isStudent(req, res, next) {
    if (req.user.role_id !== 2) {
        return res.status(403).json({ message: "Student only" });
    }
    next();
}

export function allowRoles(...allowedRoles) {
  return (req, res, next) => {
    console.log("USER ROLE:", req.user?.role_id);

    if (!req.user?.role_id) {
      return res.status(401).json({ message: "No role found" });
    }

    if (!allowedRoles.includes(req.user.role_id)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
}