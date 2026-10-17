import { rateLimit } from "express-rate-limit";

const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  limit: 20, // Maximum 20 requests per window

  standardHeaders: false,
  legacyHeaders: false,

  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: "Too many requests. Please try again after a minute.",
    });
  },
});

export { apiLimiter };