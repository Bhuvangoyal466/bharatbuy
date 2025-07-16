import Order from "../../models/Order";
import Product from "../../models/Product";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            // Extract data from request body
            const {
                userId,
                cart,
                subTotal,
                name,
                email,
                address,
                phone,
                city,
                pin,
                state,
            } = req.body;

            // Validate required fields
            if (
                !userId ||
                !cart ||
                !subTotal ||
                !name ||
                !email ||
                !address ||
                !phone ||
                !city ||
                !pin ||
                !state
            ) {
                return res.status(400).json({
                    success: false,
                    error: "All required fields must be provided",
                });
            }

            // Validate cart is not empty
            if (Object.keys(cart).length === 0) {
                return res.status(400).json({
                    success: false,
                    error: "Cart cannot be empty",
                });
            }

            // Check stock availability for each product in cart
            const stockCheckResults = [];
            for (const productKey of Object.keys(cart)) {
                const cartItem = cart[productKey];

                // Extract slug from productKey (format: slug-size-color)
                const slugPart = productKey.split("-").slice(0, -2).join("-"); // Remove last 2 parts (size and color)

                // Find product in database by slug
                const product = await Product.findOne({ slug: slugPart });

                if (!product) {
                    return res.status(400).json({
                        success: false,
                        error: `Some products in your cart are not available`,
                        productKey: productKey,
                    });
                }

                // Check if requested quantity is available
                if (product.availableQty < cartItem.qty) {
                    stockCheckResults.push({
                        productName: cartItem.name,
                        requestedQty: cartItem.qty,
                        availableQty: product.availableQty,
                        productKey: productKey,
                    });
                }
            }

            // If any products have insufficient stock, return error
            if (stockCheckResults.length > 0) {
                return res.status(400).json({
                    success: false,
                    error: "Insufficient stock for some products",
                    stockIssues: stockCheckResults,
                    message:
                        "Some items in your cart are out of stock or have insufficient quantity available.",
                });
            }

            // Transform cart data to match Order schema
            const products = Object.keys(cart).map((key) => ({
                productId: key,
                quantity: cart[key].qty,
                name: cart[key].name,
                size: cart[key].size,
                variant: cart[key].variant,
                price: cart[key].price,
            }));

            // Create full address string
            const fullAddress = `${address}, ${city}, ${state} - ${pin}, Phone: ${phone}`;

            // Generate unique order ID
            const orderId = `ORD_${Date.now()}_${Math.random()
                .toString(36)
                .substr(2, 9)}`;

            // Create new order object
            const orderData = {
                userId: userId,
                orderId: orderId,
                products: products,
                address: fullAddress,
                amount: subTotal,
                status: "Pending",
                customerInfo: {
                    name: name,
                    email: email,
                    phone: phone,
                    city: city,
                    pin: pin,
                    state: state,
                },
                paymentStatus: "Initiated",
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            // Save order to database
            const order = new Order(orderData);
            const savedOrder = await order.save();

            // Update product quantities (reduce available stock)
            for (const productKey of Object.keys(cart)) {
                const cartItem = cart[productKey];
                // Extract slug from productKey (format: slug-size-color)
                const slugPart = productKey.split("-").slice(0, -2).join("-");

                await Product.findOneAndUpdate(
                    { slug: slugPart },
                    { $inc: { availableQty: -cartItem.qty } },
                    { new: true }
                );
            }

            // Prepare response data for payment gateway
            const responseData = {
                success: true,
                message: "Order created successfully",
                orderId: orderId,
                mongoOrderId: savedOrder._id,
                amount: subTotal,
                customerInfo: {
                    name: name,
                    email: email,
                    phone: phone,
                },
                products: products,
                redirectUrl: `/payment/${orderId}`, // Redirect URL for payment
            };

            res.status(200).json(responseData);
        } catch (error) {
            console.error("Error creating order:", error);
            res.status(500).json({
                success: false,
                error: "Internal server error while creating order",
                details: error.message,
            });
        }
    } else if (req.method === "GET") {
        // Handle GET request to fetch order details if needed
        try {
            const { orderId } = req.query;

            if (!orderId) {
                return res.status(400).json({
                    success: false,
                    error: "Order ID is required",
                });
            }

            const order = await Order.findOne({ orderId: orderId });

            if (!order) {
                return res.status(404).json({
                    success: false,
                    error: "Order not found",
                });
            }

            res.status(200).json({
                success: true,
                order: order,
            });
        } catch (error) {
            console.error("Error fetching order:", error);
            res.status(500).json({
                success: false,
                error: "Internal server error while fetching order",
            });
        }
    } else {
        // Method not allowed
        res.setHeader("Allow", ["POST", "GET"]);
        res.status(405).json({
            success: false,
            error: `Method ${req.method} not allowed`,
        });
    }
};

export default connectDb(handler);
