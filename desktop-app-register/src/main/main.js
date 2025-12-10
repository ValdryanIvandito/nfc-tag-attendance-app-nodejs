// src/main/main.js
require("dotenv").config();
const path = require("path");
const { app, BrowserWindow } = require("electron");
const registerIPC = require("../ipc/ipcHandler");

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "../preload/preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      // webSecurity: false, // 🔥 Disable CORS
      // allowRunningInsecureContent: true, // (optional) allow HTTP/HTTPS mix
    },
  });

  win.setMenuBarVisibility(false);
  win.loadFile(path.join(__dirname, "../renderer/pages/index.html"));
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
