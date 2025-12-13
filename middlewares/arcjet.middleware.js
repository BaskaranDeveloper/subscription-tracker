/**
 * Arcjet Security Middleware
 * --------------------------
 * Protects API routes against:
 *  - Rate limiting abuse
 *  - Automated bots
 *  - Suspicious traffic
 *
 * How it works:
 *  - Arcjet analyzes each incoming request
 *  - Returns a decision (allow / deny)
 *  - If denied, responds with appropriate HTTP status
 *  - If allowed, forwards request to next middleware
 *
 * Usage:
 *  app.use(arcjetMiddleware)
 *  OR
 *  router.get("/secure", arcjetMiddleware, controller)
 */

import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
    try {
        // Ask Arcjet to evaluate the request
        const decision = await aj.protect(req,{requested:1});

        // If request is denied
        if (decision.isDenied()) {
            // Rate limiting exceeded
            if (decision.reason?.isRateLimit()) {
                return res.status(429).json({
                    message: "Rate limit reached. Please try again later.",
                });
            }

            // Bot detected
            if (decision.reason?.isBot()) {
                return res.status(403).json({
                    message: "Automated traffic is not allowed.",
                });
            }

            // Generic denial
            return res.status(403).json({
                message: "Access denied.",
            });
        }

        // Request is safe → continue
        next();
    } catch (err) {
        console.error("Arcjet middleware error:", err);

        // Fail-safe: block request if security check fails
        res.status(500).json({
            message: "Security verification failed",
        });
    }
};

export default arcjetMiddleware;
