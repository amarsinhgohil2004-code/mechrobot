// ===============================
// BACKEND - models/Inquiry.js
// ===============================

import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
    {
        companyName: { type: String, required: true },
        personName: { type: String, required: true },
        phone: { type: String, default: "other" },
        email: { type: String, required: true },
        service: { type: String, required: true },
        message: { type: String, required: true },

        status: {
            type: String,
            enum: ["new", "contacted", "closed"],
            default: "new"
        }
    },
    { timestamps: true }
);

export default mongoose.model("Inquiry", inquirySchema);