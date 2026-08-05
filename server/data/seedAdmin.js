import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

const seedAdmin = async () => {
    try {
        const username = process.env.ADMIN_USERNAME || "admin";
        const password = process.env.ADMIN_PASSWORD;

        if (!password) {
            console.log("ADMIN_PASSWORD missing");
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await Admin.findOneAndUpdate(
            { username },
            { username, password: hashedPassword },
            { upsert: true, new: true }
        );

        console.log("Admin synced successfully");
    } catch (err) {
        console.log("Seed error:", err.message);
    }
};

export default seedAdmin;