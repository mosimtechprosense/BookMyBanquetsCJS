// backend/utils/logger.js
const fs = require("fs");
const path = require("path");

const logDir = path.join(__dirname, "../logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logFile = path.join(logDir, "server.log");

function log(...args) {
  const timestamp = new Date().toISOString();
  const message = args
    .map(a => (typeof a === "object" ? JSON.stringify(a) : a))
    .join(" ");
  fs.appendFileSync(logFile, `[${timestamp}] ${message}\n`);
}

module.exports = { log };