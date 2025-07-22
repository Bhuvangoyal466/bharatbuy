import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
    if (req.method == "POST") {
        try {
            // Check if token is provided
            if (!req.body.token) {
                return res.status(400).json({ error: "Token is required" });
            }

            // Check if JWT_SECRET is configured
            if (!process.env.JWT_SECRET) {
                console.error("JWT_SECRET is not configured");
                return res
                    .status(500)
                    .json({ error: "Server configuration error" });
            }

            let token = req.body.token;

            // Verify JWT token with error handling
            let user;
            try {
                user = jwt.verify(token, process.env.JWT_SECRET);
            } catch (jwtError) {
                console.error("JWT verification failed:", jwtError.message);
                return res
                    .status(401)
                    .json({ error: "Invalid or expired token" });
            }

            // Check if user email exists in token
            if (!user.email) {
                return res.status(400).json({ error: "Invalid token payload" });
            }

            // Find user in database
            let dbuser = await User.findOne({ email: user.email });

            // Check if user exists in database
            if (!dbuser) {
                return res.status(404).json({ error: "User not found" });
            }

            // Extract user details safely
            const { name, email, address, pincode, phone } = dbuser;
            res.status(200).json({ name, email, address, pincode, phone });
        } catch (error) {
            console.error("Error in getuser API:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
};

export default connectDb(handler);
