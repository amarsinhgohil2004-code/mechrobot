import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import inquiryRoutes from "./routes/inquiry.routes.js";
import projectRoutes from "./routes/project.routes.js";
import settingsRoutes from "./routes/settings.routes.js";

dotenv.config();

const app = express();

// ===============================
// SECURITY
// ===============================
app.use(helmet());

// ===============================
// CORS (PRODUCTION FIX)
// ===============================

const corsOptions = {
    origin: function (origin, callback) {
        // allow all origins safely (fix for Render + Vercel)
        return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// ===============================
// BODY PARSER
// ===============================
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ===============================
// ROUTES
// ===============================
app.get("/", (req, res) => {
    res.status(200).send("GB CAD MECH Backend Running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/settings", settingsRoutes);

// ===============================
// 404
// ===============================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found",
    });
});

// ===============================
// ERROR HANDLER
// ===============================
app.use((err, req, res, next) => {
    console.error("Server Error:", err);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

export default app;