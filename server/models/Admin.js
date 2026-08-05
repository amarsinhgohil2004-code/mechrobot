import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String, // hashed
});

export default mongoose.model("Admin", adminSchema);