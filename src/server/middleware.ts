import { createMiddleware } from "@solidjs/start/middleware";
import {
  rateLimiter,
  cleanupRateLimitMap,
  CLEANUP_INTERVAL_MS,
} from "~/lib/rate-limit";

setInterval(cleanupRateLimitMap, CLEANUP_INTERVAL_MS);

export default createMiddleware({
  onRequest: [
    (event) => {
      const rateLimitResponse = rateLimiter(event);
      console.log("GLOBAL: rateLimitResponse", rateLimitResponse);
      console.log("GLOBAL: method", event.request.method);
      if (event.request.method === "POST") {
        console.log("GLOBAL: body", event.request.body);
      }
    },
  ],
});
