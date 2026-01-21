/* src/utils/loadConfig.js */

const { app } = require("electron");
const path = require("path");
const fs = require("fs");

function loadConfig() {
  const configPath = path.join(app.getPath("userData"), "config.json");
  console.log(app.getPath("userData"));

  if (!fs.existsSync(configPath)) {
    const defaultConfig = path.join(__dirname, "../config/default.json");

    fs.copyFileSync(defaultConfig, configPath);
  }

  return JSON.parse(fs.readFileSync(configPath));
}

module.exports = { loadConfig };
