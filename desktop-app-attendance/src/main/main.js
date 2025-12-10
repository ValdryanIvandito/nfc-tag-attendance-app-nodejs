const { app, BrowserWindow } = require("electron");
const path = require("path");
require("dotenv").config();

const { startNFC } = require("../utils/nfcReader");
const { setupIPC } = require("../ipc/nfcHandler");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
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

  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadFile(path.join(__dirname, "../renderer/pages/index.html"));
  setupIPC(mainWindow, startNFC);
}

app.whenReady().then(createWindow);
