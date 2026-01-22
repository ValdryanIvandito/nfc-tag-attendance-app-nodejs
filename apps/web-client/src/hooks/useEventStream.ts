/* src/hooks/useEventStream.ts */

import { useEffect } from "react";

export function useEventStream<T>(
  eventName: string,
  onMessage: (data: T) => void,
) {
  useEffect(() => {
    console.log("[SSE] connecting...");

    const es = new EventSource(import.meta.env.VITE_API_STREAM_URL);

    es.onopen = () => {
      console.log("[SSE] connected");
    };

    es.onerror = (err) => {
      console.error("[SSE] error", err);
    };

    es.addEventListener(eventName, (event) => {
      console.log("[SSE EVENT]", eventName, event.data);
      const data = JSON.parse(event.data);
      onMessage(data);
    });

    return () => {
      console.log("[SSE] closed");
      es.close();
    };
  }, [eventName, onMessage]);
}
