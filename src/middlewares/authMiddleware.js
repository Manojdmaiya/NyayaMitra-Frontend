const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Missing or invalid token" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;

        // Set custom headers based on user role
        if (decoded.role === "admin") {
            res.setHeader("X-User-Role", "admin");
            res.setHeader("X-Permissions", "all-access");
        } else {
            res.setHeader("X-User-Role", "user");
            res.setHeader("X-Permissions", "read-only");
        }

        next();
    } catch (err) {
        return res.status(403).json({ message: "Token verification failed" });
    }
};

module.exports = verifyToken;
