// src/ipc/ipHandler.js

const axios = require("axios");
const { DateTime } = require("luxon");

function attendanceIPC(mainWindow, nfcReader) {
  nfcReader(async (uid) => {
    try {
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
      const datetime = DateTime.local().toISO();
      const timezone = DateTime.local().zoneName;

      // =====================
      // CHECK ATTENDANCE
      // =====================
      const checkAtt = await axios.get(endpoint, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        params: { uid, datetime, timezone },
      });

      const att = checkAtt?.data?.data ?? null;
      console.log("\nResponse:", att);

      // =====================
      // CREATE (CHECK-IN)
      // =====================
      if (!att) {
        const createAtt = await axios.post(
          endpoint,
          { uid },
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key": API_KEY,
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

      // =====================
      // UPDATE (CHECK-OUT)
      // =====================
      if (att.check_in_at && !att.check_out_at) {
        const updateAtt = await axios.patch(
          endpoint,
          { attendance_id: att.attendance_id },
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key": API_KEY,
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

      // =====================
      // ALREADY COMPLETED FOR DEVELOPMENT / TESTING
      // =====================
      // const createAtt = await axios.post(
      //   endpoint,
      //   { uid },
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       "x-api-key": API_KEY,
      //     },
      //   }
      // );

      // const fullName = createAtt?.data?.data?.Employee?.full_name ?? "Employee";

      // return mainWindow.webContents.send(
      //   "card:detected",
      //   `Welcome, ${fullName}. Wishing you a productive day at work.`
      // );

      // =====================
      // ALREADY COMPLETED FOR PRODUCTION
      // =====================
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
        "Attendance service error, please try again.",
      );
    }
  });
}

module.exports = { attendanceIPC };
