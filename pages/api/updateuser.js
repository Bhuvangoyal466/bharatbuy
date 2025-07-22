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

            // Update user in database
            let dbuser = await User.findOneAndUpdate(
                { email: user.email },
                {
                    address: req.body.address || "",
                    pincode: req.body.pincode || "",
                    phone: req.body.phone || "",
                    name: req.body.name || "",
                },
                { new: true } // Return updated document
            );

            // Check if user exists
            if (!dbuser) {
                return res.status(404).json({ error: "User not found" });
            }

            res.status(200).json({
                success: true,
                message: "User updated successfully",
            });
        } catch (error) {
            console.error("Error in updateuser API:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
};

export default connectDb(handler);
