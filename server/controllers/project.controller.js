import Project from "../models/Project.js";
import cloudinary from "../config/cloudinary.js";

// ======================
// GET ALL PROJECTS
// ======================
export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ======================
// GET SINGLE PROJECT
// ======================
export const getSingleProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ======================
// CREATE PROJECT (WITH VIDEO FIXED)
// ======================
export const createProject = async (req, res) => {
    try {
        let coverImage = "";
        let images = [];
        let video = "";

        const coverFile = req.files?.coverImage?.[0];
        const videoFile = req.files?.video?.[0];
        const galleryFiles = req.files?.images || [];

        // ======================
        // COVER IMAGE
        // ======================
        if (coverFile) {
            const result = await cloudinary.v2.uploader.upload(
                `data:${coverFile.mimetype};base64,${coverFile.buffer.toString("base64")}`,
                { folder: "mechrobot/projects" }
            );

            coverImage = result.secure_url;
        }

        // ======================
        // VIDEO
        // ======================
        if (videoFile) {
            const result = await cloudinary.v2.uploader.upload(
                `data:${videoFile.mimetype};base64,${videoFile.buffer.toString("base64")}`,
                {
                    resource_type: "video",
                    folder: "mechrobot/projects/videos"
                }
            );

            video = result.secure_url;
        }

        // ======================
        // GALLERY
        // ======================
        for (const file of galleryFiles) {
            const result = await cloudinary.v2.uploader.upload(
                `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
                { folder: "mechrobot/projects" }
            );

            images.push(result.secure_url);
        }

        const newProject = await Project.create({
            title: req.body.title,
            description: req.body.description,
            categories: req.body.categories,
            coverImage,
            images,
            video
        });

        res.status(201).json({
            success: true,
            project: newProject
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ======================
// UPDATE PROJECT (VIDEO INCLUDED)
// ======================
export const updateProject = async (req, res) => {
    try {
        const updateData = {
            title: req.body.title,
            description: req.body.description,
            categories: req.body.categories,
        };

        const coverFile = req.files?.coverImage?.[0];
        const videoFile = req.files?.video?.[0];
        const galleryFiles = req.files?.images || [];

        // ======================
        // COVER IMAGE
        // ======================
        if (coverFile) {
            const result = await cloudinary.v2.uploader.upload(
                `data:${coverFile.mimetype};base64,${coverFile.buffer.toString("base64")}`,
                { folder: "mechrobot/projects" }
            );

            updateData.coverImage = result.secure_url;
        }

        // ======================
        // VIDEO UPDATE
        // ======================
        if (videoFile) {
            const result = await cloudinary.v2.uploader.upload(
                `data:${videoFile.mimetype};base64,${videoFile.buffer.toString("base64")}`,
                {
                    resource_type: "video",
                    folder: "mechrobot/projects/videos"
                }
            );

            updateData.video = result.secure_url;
        }

        // ======================
        // GALLERY IMAGES
        // ======================
        if (galleryFiles.length > 0) {
            let newImages = [];

            for (const file of galleryFiles) {
                const result = await cloudinary.v2.uploader.upload(
                    `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
                    { folder: "mechrobot/projects" }
                );

                newImages.push(result.secure_url);
            }

            updateData.images = newImages;
        }

        const updated = await Project.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json(updated);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
        });
    }
};
// ======================
// DELETE PROJECT
// ======================
export const deleteProject = async (req, res) => {
    try {
        const deleted = await Project.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json({ message: "Deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};