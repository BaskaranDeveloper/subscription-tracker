const errorMiddleware = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    console.error("Error:", err);

    // 1️⃣ Mongoose Bad ObjectId
    if (err.name === "CastError") {
        error = new Error("Resource not found");
        error.statusCode = 404;
    }

    // 2️⃣ Duplicate key
    if (err.code === 11000) {
        error = new Error("Duplicate field value entered");
        error.statusCode = 400;
    }

    // 3️⃣ Validation error
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors)
            .map((val) => val.message)
            .join(", ");
        error = new Error(message);
        error.statusCode = 400;
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "Server Error",
    });
};

export default errorMiddleware;
