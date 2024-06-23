import { createMiddleware } from "@solidjs/start/middleware";
import { RateLimitDeez } from "~/lib/rate-limit";

const rlDeez = RateLimitDeez.getInstance();

export default createMiddleware({
  onRequest: [
    (event) => {
      if (event.request.method === "POST") {
        const rateLimiterResponse = rlDeez.rateLimiter(event);
        if (rateLimiterResponse.deez) {
          console.error("Rate Limit Exceeded: ", rateLimiterResponse.deez);
          return new Response(rateLimiterResponse.deez, { status: 429 });
        }
      }
    },
  ],
});
