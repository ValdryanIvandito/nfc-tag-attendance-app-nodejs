// src/ipc/ipHandler.js
export function setupIPC(mainWindow, nfcReader) {
    nfcReader(uid => {
        mainWindow.webContents.send("card:detected", uid);
    });
}
