/** src/controllers/eventStreamController.ts */

import { Request, Response } from "express";
import eventBus from "../utils/eventBus.js";

class EventStreamController {
  static stream(req: Request, res: Response) {
    console.log("[SSE] client connected");

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const send = (event: string, data: any) => {
      res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
    };

    const attendanceCreated = (data: any) => send("attendance:created", data);
    const attendanceUpdated = (data: any) => send("attendance:updated", data);

    eventBus.on("attendance:created", attendanceCreated);
    eventBus.on("attendance:updated", attendanceUpdated);

    req.on("close", () => {
      eventBus.off("attendance:created", attendanceCreated);
      eventBus.off("attendance:updated", attendanceUpdated);
    });
  }
}

export default EventStreamController;
