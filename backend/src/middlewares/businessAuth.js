const jwt = require("jsonwebtoken");
const prisma = require("../config/db.js");

const businessAuth = async (req, res, next) => {
  try {

    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const business = await prisma.business.findUnique({
      where: { id: decoded.id }
    });

    if (!business) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.business = business;

    next();

  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = {
  businessAuth
};