const { app, BrowserWindow } = require("electron");
const path = require("path");

const { startNFC } = require("../utils/nfcReader");
const { setupIPC } = require("../ipc/nfcHandler");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 500,
    height: 300,
    webPreferences: {
      preload: path.join(__dirname, "../preload/preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    }
  });

  mainWindow.loadFile(path.join(__dirname, "../renderer/pages/index.html"));

  setupIPC(mainWindow, startNFC);
}

app.whenReady().then(createWindow);
