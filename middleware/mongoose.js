import mongoose from "mongoose";

const connectDb = (handler) => async (req, res) => {
    // Check if already connected
    if (mongoose.connections[0].readyState) {
        return handler(req, res);
    }

    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully");
        return handler(req, res);
    } catch (error) {
        console.error("MongoDB connection error:", error);
        return res.status(500).json({ error: "Database connection failed" });
    }
};

export default connectDb;
