import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        images: [String],
        categories: [String],
        coverImage: {
            type: String,
            default: "",
        },
        video: {
            type: String,
            default: ""
        }
    },
    { timestamps: true }
);

export default mongoose.model("Project", projectSchema);