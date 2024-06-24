import { createMiddleware } from "@solidjs/start/middleware";
import { type FetchEvent } from "@solidjs/start/server";
import { RateLimitDeez } from "~/lib/rate-limit";

const rlDeez = RateLimitDeez.getInstance();

async function rateLimit(event: FetchEvent) {
  if (event.request.method === "POST") {
    const rateLimiterResponse = rlDeez.rateLimiter(event);
    console.log(">>>> rateLimiterResponse: ", rateLimiterResponse);
    event.locals.deez = rateLimiterResponse.deez;
  }
}

export default createMiddleware({
  onRequest: [rateLimit],
});
