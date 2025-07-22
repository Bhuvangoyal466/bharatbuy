import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
    try {
        // Test basic API functionality
        res.status(200).json({
            success: true,
            message: "API is working",
            timestamp: new Date().toISOString(),
            environment: {
                hasMongoUri: !!process.env.MONGO_URI,
                hasJwtSecret: !!process.env.JWT_SECRET,
                hasNextPublicHost: !!process.env.NEXT_PUBLIC_HOST,
            },
        });
    } catch (error) {
        console.error("Test API error:", error);
        res.status(500).json({
            error: "Test API failed",
            details: error.message,
        });
    }
};

export default connectDb(handler);
