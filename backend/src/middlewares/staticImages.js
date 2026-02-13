const express = require("express");
const path = require("path");

const listingImageMiddleware = express.static(
  path.join(__dirname, "../../public/listing_image"),
  {
    setHeaders: (res, filePath) => {
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
