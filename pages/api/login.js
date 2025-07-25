import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const handler = async (req, res) => {
    if (req.method == "POST") {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            // Instead of error, send a special response for frontend to redirect
            return res
                .status(200)
                .json({ success: false, redirectToSignup: true });
        }
        const bytes = CryptoJS.AES.decrypt(
            user.password,
            process.env.AES_SECRET
        );
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
        if (
            req.body.email == user.email &&
            req.body.password == originalPassword
        ) {
            var token = jwt.sign(
                { email: user.email, name: user.name },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );
            res.status(200).json({
                success: true,
                token,
                email: user.email,
            });
        } else {
            res.status(400).json({
                success: false,
                error: "Invalid credentials",
            });
        }
    } else {
        res.status(400).json({ error: "Method not allowed" });
    }
};

export default connectDb(handler);
