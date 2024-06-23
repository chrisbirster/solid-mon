interface RateLimitEntry {
  timestamps: number[];
  lastAccess: number;
}

export class RateLimitDeez {
  private static instance: RateLimitDeez;
  private rateLimitMap: Map<string, RateLimitEntry>;
  private RATE_LIMIT_WINDOW_MS: number;
  private MAX_REQUESTS: number;
  private CLEANUP_INTERVAL_MS: number;

  private constructor() {
    this.rateLimitMap = new Map<string, RateLimitEntry>();
    this.RATE_LIMIT_WINDOW_MS = 10000; // 10 seconds
    this.MAX_REQUESTS = 5;
    this.CLEANUP_INTERVAL_MS = 60000; // 1 minute

    setInterval(this.#cleanupRateLimitMap, this.CLEANUP_INTERVAL_MS);
  }

  public static getInstance(): RateLimitDeez {
    if (!RateLimitDeez.instance) {
      RateLimitDeez.instance = new RateLimitDeez();
    }
    return RateLimitDeez.instance;
  }

  #getClientIp(event: any) {
    const forwarded = event.request.headers.get("x-forwarded-for");
    return forwarded ? forwarded.split(",").pop().trim() : event.clientAddress;
  }

  rateLimiter(event: any) {
    const ip = this.#getClientIp(event);

    const currentTime = Date.now();
    const entry = this.rateLimitMap.get(ip) || {
      timestamps: [],
      lastAccess: currentTime,
    };
    const requestTimes = entry.timestamps.filter(
      (time) => currentTime - time < this.RATE_LIMIT_WINDOW_MS,
    );

    console.log(">>>>> event: ", event);
    // console.log(">>>>> entry: ", entry);

    if (requestTimes.length >= this.MAX_REQUESTS) {
      return {
        deez: "Rate limit exceeded. Please try again later.",
      };
    }

    requestTimes.push(currentTime);
    this.rateLimitMap.set(ip, {
      timestamps: requestTimes,
      lastAccess: currentTime,
    });

    return {
      deez: null,
    };
  }

  #cleanupRateLimitMap = () => {
    const currentTime = Date.now();
    this.rateLimitMap.forEach((value, key) => {
      if (currentTime - value.lastAccess > this.RATE_LIMIT_WINDOW_MS) {
        this.rateLimitMap.delete(key);
      }
    });
  };
}
