/* src/ipc/registerIPC.js */

const { ipcMain } = require("electron");
const axios = require("axios");

const { startReadNFC, stopReadNFC } = require("../utils/readNFC");

function registerIPC(mainWindow, config) {
  const API_BASE_URL = config.API_BASE_URL;
  const DEVICE_ID = config.DEVICE_ID;

  if (!API_BASE_URL || !DEVICE_ID) {
    console.error("Terminal config missing");

    mainWindow.webContents.send(
      "card:detected",
      "Terminal configuration error",
    );

    return;
  }

  const endpoint = `${API_BASE_URL.replace(/\/$/, "")}/terminal/v1/employee`;

  // Prevent duplicated listeners
  ipcMain.removeAllListeners("nfc:start");
  ipcMain.removeAllListeners("nfc:stop");
  ipcMain.removeAllListeners("employee:create");

  // Start NFC
  ipcMain.on("nfc:start", () => {
    console.log("Starting NFC listener...");

    startReadNFC((uid) => {
      mainWindow.webContents.send("nfc:uid", uid);
    });
  });

  // Stop NFC
  ipcMain.on("nfc:stop", () => {
    console.log("Stopping NFC listener...");
    stopReadNFC();
  });

  // Create employee
  ipcMain.handle("employee:create", async (_, payload) => {
    try {
      const res = await axios.post(endpoint, payload, {
        headers: {
          "Content-Type": "application/json",
          "x-device-id": DEVICE_ID,
        },
      });

      const data = res.data;

      if (data.status === 201 || data.success === true) {
        return {
          status: true,
          message: "Employee successfully registered!",
        };
      }

      return {
        status: false,
        message:
          "This NFC card is already registered. Please use a new NFC card.",
      };
    } catch (err) {
      console.error("Employee create error:", err.message);

      return {
        status: false,
        message: err.response?.data?.message || err.message,
      };
    }
  });
}

module.exports = { registerIPC };
