const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const outputDir = path.join(process.cwd(), "public/listing_image_resized");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const sizes = [120, 300, 600];

// generate random name
const generateName = () => {
  return crypto.randomBytes(16).toString("hex");
};

const processImage = async (filePath) => {
  const baseName = generateName();

  const originalOutput = path.join(outputDir, `${baseName}.avif`);

  // 🔥 Convert original → AVIF
  await sharp(filePath)
    .avif({ quality: 50 })
    .toFile(originalOutput);

  // 🔥 Create resized versions
  await Promise.all(
    sizes.map((size) => {
      return sharp(filePath)
        .resize(size)
        .avif({ quality: 50 })
        .toFile(path.join(outputDir, `${baseName}_${size}.avif`));
    })
  );

  // 🧹 remove original uploaded file (safe delete)
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  return `${baseName}.avif`;
};

module.exports = { processImage };