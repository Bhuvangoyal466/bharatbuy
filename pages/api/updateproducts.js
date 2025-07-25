import Product from "../../models/Product";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
    if (req.method == "POST") {
        for (let i = 0; i < req.body.length; i++) {
            let p = await Product.findByIdAndUpdate(
                req.body[i]._id,
                req.body[i]
            );
        }
        res.status(200).json({ success: "Products edited successfully" });
    } else {
        res.status(400).json({ error: "This method is not allowed" });
    }
};

export default connectDb(handler);
