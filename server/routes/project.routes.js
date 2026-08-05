import express from "express";
import auth from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.js";

import {
    getProjects,
    getSingleProject,
    createProject,
    deleteProject,
    updateProject
} from "../controllers/project.controller.js";

const router = express.Router();

// =====================
// PUBLIC ROUTES
// =====================
router.get("/", getProjects);
router.get("/:id", getSingleProject);

// =====================
// ADMIN ROUTES
// =====================

// CREATE
router.post(
    "/",
    auth,
    upload.fields([
        { name: "coverImage", maxCount: 1 },
        { name: "images", maxCount: 20 },
        { name: "video", maxCount: 1 }
    ]),
    createProject
);

// UPDATE
router.put(
    "/:id",
    auth,
    upload.fields([
        { name: "coverImage", maxCount: 1 },
        { name: "images", maxCount: 20 },
        { name: "video", maxCount: 1 }
    ]),
    updateProject
);

// DELETE
router.delete("/:id", auth, deleteProject);

export default router;