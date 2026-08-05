import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import seedAdmin from "./data/seedAdmin.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    seedAdmin();

    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    });
});