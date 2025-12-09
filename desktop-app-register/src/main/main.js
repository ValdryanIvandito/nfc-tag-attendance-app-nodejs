// src/main/main.js
const path = require("path");
const { app, BrowserWindow } = require("electron");
require("dotenv").config();

const registerIPC = require("../ipc/ipcHandler"); // module.exports = registerIPC

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "../preload/preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // adjust path relative to this file (src/main)
  win.loadFile(path.join(__dirname, "../renderer/pages/index.html"));

  // Register all IPC listeners
  registerIPC(win);
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
