import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        if (mongoose.connection.readyState >= 1) {
            console.log("✅ Already connected to MongoDB");
            return;
        }

        await mongoose.connect(process.env.MONGO_URL, {
            dbName: "zams", // ✅ Add your actual database name
        });

        console.log("✅ MongoDB Connected to zams");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error);
        process.exit(1);
    }
};

