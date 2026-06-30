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