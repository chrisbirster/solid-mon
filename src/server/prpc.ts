import { builder$, middleware$ } from "@solid-mediakit/prpc";

const rateLimitMap = new Map<
  string,
  { timestamps: number[]; lastAccess: number }
>();
const RATE_LIMIT_WINDOW_MS = 10000; // 10 seconds
const MAX_REQUESTS = 20;
const CLEANUP_INTERVAL_MS = 60000; // 1 minute

const getClientIp = (event$: any) => {
  const forwarded = event$.request.headers.get("x-forwarded-for");
  return forwarded ? forwarded.split(",").pop().trim() : event$.clientAddress;
};

const rateLimiter = ({ event$ }: { event$: any }) => {
  const ip = getClientIp(event$);

  const currentTime = Date.now();
  const entry = rateLimitMap.get(ip) || {
    timestamps: [],
    lastAccess: currentTime,
  };
  const requestTimes = entry.timestamps.filter(
    (time) => currentTime - time < RATE_LIMIT_WINDOW_MS,
  );

  // console.log(">>>>> entry: ", entry);

  if (requestTimes.length >= MAX_REQUESTS) {
    return {
      deez: "Rate limit exceeded. Please try again later.",
    };
  }

  requestTimes.push(currentTime);
  rateLimitMap.set(ip, { timestamps: requestTimes, lastAccess: currentTime });

  return {
    deez: null,
  };
};

const cleanupRateLimitMap = () => {
  const currentTime = Date.now();
  rateLimitMap.forEach((value, key) => {
    if (currentTime - value.lastAccess > RATE_LIMIT_WINDOW_MS) {
      rateLimitMap.delete(key);
    }
  });
};

setInterval(cleanupRateLimitMap, CLEANUP_INTERVAL_MS);

export const helloBuilder = builder$()
  .middleware$(() => {
    return {
      hello: "world",
    };
  })
  .middleware$((ctx) => {
    return {
      ...ctx,
      world: "nutz",
    };
  });

export const rateLimitMW = middleware$(rateLimiter);
