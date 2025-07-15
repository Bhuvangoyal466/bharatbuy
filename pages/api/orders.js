import Order from "../../models/Order";
import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
const jwt = require("jsonwebtoken");

const handler = async (req, res) => {
    if (req.method === "GET") {
        try {
            // Verify authentication token
            const token =
                req.headers.authorization?.split(" ")[1] ||
                req.headers.authorization;
            if (!token) {
                return res.status(401).json({
                    success: false,
                    error: "Access denied. No token provided.",
                });
            }

            let decoded;
            try {
                decoded = jwt.verify(token, process.env.JWT_SECRET);
            } catch (error) {
                return res.status(401).json({
                    success: false,
                    error: "Invalid token.",
                });
            }

            // Find user by email from token
            const user = await User.findOne({ email: decoded.email });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    error: "User not found.",
                });
            }

            // Query orders for this specific user only
            const query = {
                $or: [
                    { userId: user._id.toString() },
                    { "customerInfo.email": user.email },
                ],
            };

            // Fetch orders from database
            const orders = await Order.find(query)
                .sort({ createdAt: -1 })
                .lean();

            // Convert MongoDB documents to plain JavaScript objects
            const serializedOrders = orders.map((order) => ({
                _id: order._id.toString(),
                orderId: order.orderId,
                userId: order.userId,
                products:
                    order.products?.map((product) => ({
                        productId: product.productId,
                        name: product.name,
                        size: product.size,
                        variant: product.variant,
                        price: product.price,
                        quantity: product.quantity,
                    })) || [],
                address: order.address,
                amount: order.amount,
                status: order.status,
                customerInfo: order.customerInfo,
                paymentStatus: order.paymentStatus,
                paymentId: order.paymentId,
                transactionId: order.transactionId,
                createdAt: order.createdAt.toISOString(),
                updatedAt: order.updatedAt.toISOString(),
            }));

            res.status(200).json({
                success: true,
                orders: serializedOrders,
            });
        } catch (error) {
            console.error("Error fetching orders:", error);
            res.status(500).json({
                success: false,
                error: "Internal server error while fetching orders",
            });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).json({
            success: false,
            error: `Method ${req.method} not allowed`,
        });
    }
};

export default connectDb(handler);
