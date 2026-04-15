const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const redirectRoutes = require("./src/routes/redirect.routes.js");
const apiRoutes = require("./src/routes/index.js");
const errorHandler = require("./src/middlewares/errorHandler.js");




dotenv.config();

const app = express();
app.set("trust proxy", 1);
const PORT = process.env.PORT || 3000;


app.use("/api", (req, res, next) => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});



// CORS (Allowed Origins)
app.use(
  cors({
origin: [
  "http://localhost:5173",
  "http://localhost:4173",
  "https://www.bookmybanquets.in",
  "https://bookmybanquets.in",
],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// basic security headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
  })
);


// Rate Limiting per IP address
app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1500,
    message: {
      success: false,
      message: "Too many requests, please try again later.",
    },
  })
);

app.use(express.json());


// lets the browser access stored images
app.use(
  "/uploads",
  express.static("uploads", {
    maxAge: "1y", // cache for 30 days
    etag: true,
    lastModified: true,
    setHeaders: (res, path) => {
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    },
  })
);


// Fix BigInt JSON problem on API
BigInt.prototype.toJSON = function () {
  return this.toString();
};


// prefix all routes with /api
app.use("/", redirectRoutes);
app.use("/api", apiRoutes);


app.get("/debug-routes", (req,res)=>{
  res.send("API working");
});


// global error handler
app.use(errorHandler);


// server start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
