/* src/preload/preload.js */

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  startNFC: () => ipcRenderer.send("nfc:start"),
  stopNFC: () => ipcRenderer.send("nfc:stop"),
  onCardDetected: (callback) =>
    ipcRenderer.on("nfc:uid", (_, uid) => callback(uid)),
  createEmployee: (payload) => ipcRenderer.invoke("employee:create", payload),
  // for backward compatibility, a generic receive method:
  receive: (channel, cb) => ipcRenderer.on(channel, (_, data) => cb(data)),
});
