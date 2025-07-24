import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer token

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = { userId: decoded.userId, role: decoded.role };
    next();
  } catch (err) {
    res.status(401).json({ error: "Token is invalid or expired" });
  }
};

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ error: "Access denied: insufficient role" });
    }
    next();
  };
};

export const canEditUser = (req, res, next) => {
  const { userId, role } = req.user;
  // Allow if: logged-in user is editing their own data OR is an admin
  if (userId === req.params.id || role === "admin") {
    return next();
  }

  return res
    .status(403)
    .json({ error: "You can only modify your own account" });
};
