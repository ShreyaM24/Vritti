const jwt = require("jsonwebtoken");
const User = require("../models/User");

function generateToken(user) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not defined in environment");
  }
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

async function verifyTokenMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  console.log("🔑 Incoming Authorization:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token missing" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch full user (optional, but useful)
    const user = await User.findById(decoded.id).select("-password"); 
    if (!user) return res.status(401).json({ error: "User not found" });

    req.user = user; // full user object
    next();
  } catch (err) {
    console.error("❌ Token verification failed:", err.message);
    return res.status(401).json({ error: "Token invalid" });
  }
}


function adminOnly(req, res, next) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ error: "Admins only" });
  }
  next();
}

module.exports = { generateToken, verifyTokenMiddleware, adminOnly };
