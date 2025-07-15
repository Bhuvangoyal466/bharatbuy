import Order from "../../models/Order";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            const { orderId, status, paymentStatus, transactionId } = req.body;

            // Validate required fields
            if (!orderId) {
                return res.status(400).json({
                    success: false,
                    error: "Order ID is required",
                });
            }

            // Find and update the order
            const updatedOrder = await Order.findOneAndUpdate(
                { orderId: orderId },
                {
                    status: status || "Success",
                    paymentStatus: paymentStatus || "Success",
                    transactionId: transactionId,
                    updatedAt: new Date(),
                },
                { new: true }
            );

            if (!updatedOrder) {
                return res.status(404).json({
                    success: false,
                    error: "Order not found",
                });
            }

            res.status(200).json({
                success: true,
                message: "Order status updated successfully",
                order: updatedOrder,
            });
        } catch (error) {
            console.error("Error updating order status:", error);
            res.status(500).json({
                success: false,
                error: "Internal server error while updating order status",
            });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).json({
            success: false,
            error: `Method ${req.method} not allowed`,
        });
    }
};

export default connectDb(handler);
