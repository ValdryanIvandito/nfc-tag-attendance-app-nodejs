/* src/ipc/attendanceIPC.js */

const axios = require("axios");
const { DateTime } = require("luxon");

function attendanceIPC(mainWindow, nfcReader, config) {
  const API_BASE_URL = config.API_BASE_URL;
  const DEVICE_ID = config.DEVICE_ID;

  if (!API_BASE_URL || !DEVICE_ID) {
    console.error("Terminal config missing");

    return mainWindow.webContents.send(
      "card:detected",
      "Terminal configuration error",
    );
  }

  const endpoint = `${API_BASE_URL.replace(/\/$/, "")}/terminal/v1/attendance`;

  nfcReader(async (uid) => {
    try {
      const datetime = DateTime.local().toISO();
      const timezone = DateTime.local().zoneName;

      // CHECK ATTENDANCE
      const checkAtt = await axios.get(endpoint, {
        headers: {
          "Content-Type": "application/json",
          "x-device-id": DEVICE_ID,
        },
        params: { uid, datetime, timezone },
      });

      const att = checkAtt?.data?.data ?? null;

      // CREATE (CHECK-IN)
      if (!att) {
        const createAtt = await axios.post(
          endpoint,
          { uid },
          {
            headers: {
              "Content-Type": "application/json",
              "x-device-id": DEVICE_ID,
            },
          },
        );

        const fullName =
          createAtt?.data?.data?.Employee?.full_name ?? "Employee";

        return mainWindow.webContents.send(
          "card:detected",
          `Welcome, ${fullName}. Wishing you a productive day at work.`,
        );
      }

      // UPDATE (CHECK-OUT)
      if (att.check_in_at && !att.check_out_at) {
        const updateAtt = await axios.patch(
          endpoint,
          { attendance_id: att.attendance_id },
          {
            headers: {
              "Content-Type": "application/json",
              "x-device-id": DEVICE_ID,
            },
          },
        );

        const fullName =
          updateAtt?.data?.data?.Employee?.full_name ?? "Employee";

        return mainWindow.webContents.send(
          "card:detected",
          `See you tomorrow, ${fullName}. Wishing you a great evening.`,
        );
      }

      // THIS LOGIC IS FOR DEVELOPMENT / TESTING PURPOSES ONLY
      return mainWindow.webContents.send(
        "card:detected",
        "Attendance already completed for today.",
      );
    } catch (error) {
      console.error("IPC Attendance Error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });

      return mainWindow.webContents.send(
        "card:detected",
        "Your ID Card not recognized or system error, please contact technical support.",
      );
    }
  });
}

module.exports = { attendanceIPC };
