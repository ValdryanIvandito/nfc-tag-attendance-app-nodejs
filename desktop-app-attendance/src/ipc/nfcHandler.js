// src/ipc/ipHandler.js
const axios = require("axios");

function setupIPC(mainWindow, nfcReader) {
  nfcReader(async (uid) => {
    const API_BASE_URL = process.env.API_BASE_URL;
    const API_KEY = process.env.API_KEY;

    if (!API_BASE_URL) {
      console.error("API_BASE_URL is missing in .env");
      return mainWindow.webContents.send("error:api", {
        status: false,
        message: "API_BASE_URL is missing.",
      });
    }

    const endpoint = `${API_BASE_URL.replace(/\/$/, "")}/v1/attendance`;

    try {
      // --- Step 1: Check Existing Attendance ---
      const checkResponse = await axios.get(endpoint, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        params: { uid },
      });

      const data = checkResponse.data.data;
      const { attendance_id, check_in_at, check_out_at } = data;

      // Employee already checked in + out
      if (check_in_at && check_out_at) {
        return mainWindow.webContents.send(
          "card:detected",
          "Your attendance is already recorded."
        );
      }

      // Employee checked in but not yet checked out → update attendance
      if (check_in_at && !check_out_at) {
        const updateResponse = await axios.patch(
          endpoint,
          { attendance_id },
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key": API_KEY,
            },
          }
        );

        const fullName = updateResponse.data.data.Employee.full_name;

        return mainWindow.webContents.send(
          "card:detected",
          `See you tomorrow, ${fullName}. Wishing you a great evening.`
        );
      }
    } catch (err) {
      // --- Step 2: Create New Attendance ---
      try {
        const createResponse = await axios.post(
          endpoint,
          { uid },
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key": API_KEY,
            },
          }
        );

        const fullName = createResponse.data.data.Employee.full_name;

        return mainWindow.webContents.send(
          "card:detected",
          `Welcome, ${fullName}. Wishing you a productive day at work.`
        );
      } catch (apiErr) {
        console.error("Failed to create attendance:", apiErr);
        return mainWindow.webContents.send("error:api", {
          status: false,
          message: "Failed to create attendance.",
        });
      }
    }
  });
}

module.exports = { setupIPC };
