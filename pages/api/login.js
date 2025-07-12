import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    if (req.method == "POST") {
        let user = await User.findOne({ email: req.body.email });
        const bytes = CryptoJS.AES.decrypt(user.password, "secret123");
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
        if (user) {
            if (
                req.body.email == user.email &&
                req.body.password == originalPassword
            ) {
                res.status(200).json({
                    success: true,
                    email: user.email,
                    name: user.name,
                });
            } else {
                res.status(400).json({
                    success: false,
                    error: "Invalid credentials",
                });
            }
        } else {
            res.status(400).json({ success: false, error: "No user found" });
        }
    } else {
        res.status(400).json({ error: "Method not allowed" });
    }
};

export default connectDb(handler);
