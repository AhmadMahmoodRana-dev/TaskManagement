import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Expecting "Bearer <token>"

  if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your actual secret
    req.user = decoded; // You can access user data in next middleware/controller
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token." });
  }
};

