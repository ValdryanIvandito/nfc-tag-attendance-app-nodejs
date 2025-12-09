// src/ipc/ipcHandler.js

const { ipcMain } = require("electron");
const { startNFC, stopNFC } = require("../utils/nfcReader");
fetch = require("node-fetch");

function registerIPC(mainWindow) {
  // Start NFC
  ipcMain.on("nfc:start", () => {
    console.log("Starting NFC listener...");
    startNFC((uid) => {
      console.log("Card detected (UID):", uid);
      mainWindow.webContents.send("nfc:uid", uid);
    });
  });

  // Stop NFC
  ipcMain.on("nfc:stop", () => {
    console.log("Stopping NFC listener...");
    stopNFC();
  });

  // Create employee (performed in main to keep API_KEY on backend)
  ipcMain.handle("employee:create", async (_, payload) => {
    const API_BASE_URL = process.env.API_BASE_URL;
    const API_KEY = process.env.API_KEY;

    if (!API_BASE_URL) {
      return {
        status: false,
        message: "API_BASE_URL is missing in .env",
      };
    }

    try {
      // const checkUid = await fetch(
      //   `${API_BASE_URL.replace(/\/$/, "")}/v1/employee?uid=${payload.uid}`,
      //   {
      //     method: "GET",
      //     headers: {
      //       "Content-Type": "application/json",
      //       "x-api-key": API_KEY,
      //     },
      //   }
      // );

      // console.log("CHECK UID", checkUid.status);

      // if (checkUid.status === 200) {
      //   return {
      //     status: false,
      //     message:
      //       "This NFC card is already registered, please a new NFC card!",
      //   };
      // }

      const res = await fetch(
        `${API_BASE_URL.replace(/\/$/, "")}/v1/employee`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (data.status === 201) {
        return {
          status: true,
          message: "Employee successfully registered!",
        };
      } else {
        return {
          status: false,
          message:
            "This NFC card is already registered, please a new NFC card!",
        };
      }
    } catch (err) {
      return {
        status: false,
        message: err.message || String(err),
      };
    }
  });
}

module.exports = registerIPC;
