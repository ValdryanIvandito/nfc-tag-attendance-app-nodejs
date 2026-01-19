// src/preload/preload.js

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld("nfcAPI", {
  onCardDetected: (callback) =>
    ipcRenderer.on("card:detected", (_, msg) => {
      callback(msg);
    }),
});
