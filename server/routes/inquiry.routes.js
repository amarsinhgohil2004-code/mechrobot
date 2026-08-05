// ===============================
// BACKEND - routes/inquiry.route.js
// ===============================

import express from "express";
import nodemailer from "nodemailer";
import auth from "../middleware/auth.middleware.js";

import {
    createInquiry,
    getInquiries,
    deleteInquiry,
    updateInquiryStatus
} from "../controllers/inquiry.controller.js";

const router = express.Router();

// Mail Transporter
export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// PUBLIC
router.post("/", createInquiry);

// ADMIN
router.get("/", auth, getInquiries);
router.delete("/:id", auth, deleteInquiry);
router.put("/:id", auth, updateInquiryStatus);

export default router;