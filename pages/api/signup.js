import User from "../../models/User";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
    if (req.method == "POST") {
        console.log(req.body);
        let u = new User(req.body);
        u.save();
        res.status(200).json({ success: "Sign up successful" });
    } else {
        res.status(400).json({ error: "This method is not allowed" });
    }
};

export default connectDb(handler);
