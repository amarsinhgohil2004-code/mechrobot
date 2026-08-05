import Settings from "../models/Settings.js";

// GET SETTINGS (ALL PAGES USE THIS)
export const getSettings = async (req, res) => {
    const data = await Settings.findOne();
    res.json(data || {});
};

// UPDATE SETTINGS (ADMIN)
export const updateSettings = async (req, res) => {
    const data = await Settings.findOneAndUpdate(
        {},
        req.body,
        { new: true, upsert: true }
    );

    res.json(data);
};