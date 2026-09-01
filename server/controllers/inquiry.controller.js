// ===============================
// BACKEND - controllers/inquiry.controller.js
// ===============================
import Inquiry from "../models/Inquiry.js";
import nodemailer from "nodemailer";

export const createInquiry = async (req, res) => {
    try {
        const inquiry = await Inquiry.create(req.body);

        const transporter = nodemailer.createTransport({
            host: "smtp.hostinger.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: process.env.ADMIN_EMAIL,
            subject: "New Inquiry Received - MECHROBOT",
            html: `
                <h2>New Inquiry Submitted</h2>
                <p><b>Company:</b> ${req.body.companyName}</p>
                <p><b>Person:</b> ${req.body.personName}</p>
                <p><b>Email:</b> ${req.body.email}</p>
                <p><b>Phone:</b> ${req.body.phone}</p>
                <p><b>Service:</b> ${req.body.service}</p>
                <p><b>Message:</b> ${req.body.message}</p>
            `,
        });
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: req.body.email,
            subject: "Thank You for Contacting MECHROBOT",
            html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        
        <h2 style="color:#1e3a8a;">
            Thank You for Contacting MECHROBOT
        </h2>

        <p>Dear ${req.body.personName || "Customer"},</p>

        <p>
            Thank you for your inquiry regarding
            <strong>${req.body.service}</strong>.
        </p>

        <p>
            We have successfully received your requirements and our engineering team
            will review them shortly.
        </p>

        <p>
            One of our representatives will contact you as soon as possible.
        </p>

        <hr />

        <h3>Your Submitted Details</h3>

        <p><strong>Company:</strong> ${req.body.companyName}</p>
        <p><strong>Contact Person:</strong> ${req.body.personName}</p>
        <p><strong>Email:</strong> ${req.body.email}</p>
        <p><strong>Phone:</strong> ${req.body.phone}</p>
        <p><strong>Service:</strong> ${req.body.service}</p>

        <hr />

        <p>
            Regards,<br/>
            <strong>MECHROBOT</strong><br/>
            Mechanical Design & Industrial Automation Solutions<br/>
            Ahmedabad, Gujarat
        </p>

    </div>
    `,
        });
        res.status(201).json({
            success: true,
            message: "Inquiry submitted successfully",
            inquiry,
        });

    } catch (error) {
        console.error("Inquiry Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ADMIN - Get All
export const getInquiries = async (req, res) => {
    try {
        const data = await Inquiry.find().sort({ createdAt: -1 });
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ADMIN - Delete
export const deleteInquiry = async (req, res) => {
    try {
        await Inquiry.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Deleted"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ADMIN - Update Status
export const updateInquiryStatus = async (req, res) => {
    try {
        const updated = await Inquiry.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );

        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};