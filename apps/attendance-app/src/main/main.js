/* src/main/main.js */

const { app, BrowserWindow } = require("electron");
const path = require("path");

const { attendanceIPC } = require("../ipc/attendanceIPC");
const { startNFC } = require("../utils/readNFC");
const { loadConfig } = require("../utils/loadConfig");

let mainWindow = null;
const iconPath = path.join(__dirname, "../../assets/icon.png");
const config = loadConfig();

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    icon: iconPath,
    webPreferences: {
      preload: path.join(__dirname, "../preload/preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      // webSecurity: false, // 🔥 Disable CORS
      // allowRunningInsecureContent: true, // (optional) allow HTTP/HTTPS mix
    },
  });

  mainWindow.setMenuBarVisibility(false);

  mainWindow.loadFile(path.join(__dirname, "../renderer/pages/index.html"));

  attendanceIPC(mainWindow, startNFC, config);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
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
