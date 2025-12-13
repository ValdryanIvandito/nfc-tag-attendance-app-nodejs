// src/controllers/eventStreamController.js
import eventBus from "../utils/eventBus.js";

class EventStreamController {
  static stream(req, res) {
    console.log("[SSE] client connected");

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const send = (event, data) => {
      res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
    };

    const attendanceCreated = (data) => send("attendance:created", data);
    eventBus.on("attendance:created", attendanceCreated);

    req.on("close", () => {
      eventBus.off("attendance:created", attendanceCreated);
    });
  }
}

export default EventStreamController;
