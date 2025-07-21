import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";

const handler = async (req, res) => {
    if (req.method == "POST") {
        try {
            let token = req.body.token;
            let user = jwt.verify(token, process.env.JWT_SECRET);

            // Hash the new password
            const hashedPassword = CryptoJS.AES.encrypt(
                req.body.password,
                process.env.AES_SECRET
            ).toString();

            await User.findOneAndUpdate(
                { email: user.email },
                { password: hashedPassword }
            );

            res.status(200).json({
                success: true,
                message: "Password updated successfully",
            });
        } catch (error) {
            console.error("Error updating password:", error);
            res.status(500).json({
                success: false,
                error: "Failed to update password",
            });
        }
    } else {
        res.status(400).json({ error: "This method is not allowed" });
    }
};

export default connectDb(handler);
