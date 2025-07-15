const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        orderId: { type: String, required: true, unique: true },
        products: [
            {
                productId: { type: String, required: true },
                quantity: { type: Number, default: 1, required: true },
                name: { type: String },
                size: { type: String },
                variant: { type: String },
                price: { type: Number },
            },
        ],
        address: { type: String, required: true },
        amount: { type: Number, required: true },
        status: { type: String, default: "Pending", required: true },
        customerInfo: {
            name: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String, required: true },
            city: { type: String, required: true },
            pin: { type: String, required: true },
            state: { type: String, required: true },
        },
        paymentStatus: {
            type: String,
            default: "Pending",
            enum: ["Pending", "Initiated", "Success", "Failed", "Cancelled"],
        },
        paymentId: { type: String },
        transactionId: { type: String },
    },
    { timestamps: true }
);

mongoose.models = {};
export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
