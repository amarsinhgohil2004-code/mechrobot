import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
    phone: String,
    email: String,
    whatsapp: String,
});

export default mongoose.model("Settings", settingsSchema);