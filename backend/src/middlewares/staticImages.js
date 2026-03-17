const express = require("express");
const path = require("path");

const listingImageMiddleware = express.static(
  path.join(__dirname, "../../public/listing_image"),
  {
    maxAge: "1y",
    etag: true,
    lastModified: true,
    setHeaders: (res, filePath) => {
      // 1 year caching
      res.setHeader(
        "Cache-Control",
        "public, max-age=31536000, immutable"
      );

      // Correct content types
      if (filePath.endsWith(".webp")) {
        res.setHeader("Content-Type", "image/webp");
      }

      if (filePath.endsWith(".avif")) {
        res.setHeader("Content-Type", "image/avif");
      }

      if (filePath.endsWith(".jpg") || filePath.endsWith(".jpeg")) {
        res.setHeader("Content-Type", "image/jpeg");
      }
    },
  }
);

module.exports = listingImageMiddleware;