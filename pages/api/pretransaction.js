import Order from "../../models/Order";
import Product from "../../models/Product";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            console.log("Pretransaction API called with data:", req.body);

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
            console.log("Received data fields:", {
                hasCart: !!cart,
                hasSubTotal: !!subTotal,
                hasName: !!name,
                hasEmail: !!email,
                hasAddress: !!address,
                hasPhone: !!phone,
                hasCity: !!city,
                hasPin: !!pin,
                hasState: !!state,
                cartKeys: cart ? Object.keys(cart).length : 0,
            });

            if (
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
                const missingFields = [];
                if (!cart) missingFields.push("cart");
                if (!subTotal) missingFields.push("subTotal");
                if (!name) missingFields.push("name");
                if (!email) missingFields.push("email");
                if (!address) missingFields.push("address");
                if (!phone) missingFields.push("phone");
                if (!city) missingFields.push("city");
                if (!pin) missingFields.push("pin");
                if (!state) missingFields.push("state");

                console.log("Missing required fields:", missingFields);
                return res.status(400).json({
                    success: false,
                    error: `Missing required fields: ${missingFields.join(
                        ", "
                    )}`,
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
            console.log("Cart contents:", cart);
            console.log("Cart keys:", Object.keys(cart));

            for (const productKey of Object.keys(cart)) {
                const cartItem = cart[productKey];
                console.log(
                    `Processing product key: ${productKey}, cart item:`,
                    cartItem
                );

                // Extract product slug from cart key
                // Cart key format examples:
                // "be-different-graphic-tee-M-#cdb4db"
                // "built-different-crew-neck-tee-S,M,L,XL,XXL-#cdb4db,#ffafcc,#bde0fe,#e63946"
                let productSlug = null;
                let requestedSize = cartItem.size;
                let requestedColor = cartItem.variant;

                // Extract slug by removing size and color parts
                const parts = productKey.split("-");

                // Look for size patterns in the parts
                let sizeIndex = -1;
                for (let i = 0; i < parts.length; i++) {
                    const part = parts[i];
                    // Check if this part contains size info
                    if (
                        part.match(/^(S|M|L|XL|XXL)$/) ||
                        part.includes("S,") ||
                        part.includes("M,") ||
                        part.includes("L,") ||
                        part.includes("XL,") ||
                        part.includes("XXL")
                    ) {
                        sizeIndex = i;
                        break;
                    }
                }

                if (sizeIndex !== -1) {
                    // Extract slug from before size info
                    productSlug = parts.slice(0, sizeIndex).join("-");
                } else {
                    // Fallback: assume last 2 parts are size and color
                    productSlug = parts.slice(0, -2).join("-");
                }

                console.log(
                    `Extracted slug: "${productSlug}" from productKey: "${productKey}"`
                );

                // Find product by slug
                let product = null;

                try {
                    product = await Product.findOne({ slug: productSlug });
                    if (product) {
                        console.log(
                            `✅ Found product: ${product.title} (${product.slug})`
                        );
                        console.log(
                            `Available sizes: [${product.size?.join(", ")}]`
                        );
                        console.log(
                            `Available colors: [${product.color?.join(", ")}]`
                        );
                        console.log(
                            `Available quantity: ${product.availableQty}`
                        );
                    } else {
                        console.log(
                            `❌ No product found with slug: "${productSlug}"`
                        );
                    }
                } catch (error) {
                    console.log(
                        "Error finding product by slug:",
                        error.message
                    );
                }

                // If slug extraction failed, try by product name (fallback)
                if (!product && cartItem.name) {
                    try {
                        // Clean the product name for better matching
                        const cleanName = cartItem.name
                            .replace(/'/g, "")
                            .trim();
                        product = await Product.findOne({
                            title: { $regex: cleanName, $options: "i" },
                        });
                        if (product) {
                            console.log(
                                `✅ Found product by title match: "${cartItem.name}" -> "${product.title}"`
                            );
                        }
                    } catch (error) {
                        console.log(
                            "Error finding product by title:",
                            error.message
                        );
                    }
                }

                // If still not found, show available products for debugging
                if (!product) {
                    console.log(
                        `❌ Product not found for key: "${productKey}"`
                    );
                    console.log("Available products (first 5):");
                    const allProducts = await Product.find({})
                        .select("_id slug title size color availableQty")
                        .limit(5);
                    allProducts.forEach((p) => {
                        console.log(
                            `- ${p.title} | slug: "${
                                p.slug
                            }" | sizes: [${p.size?.join(
                                ", "
                            )}] | colors: [${p.color?.join(", ")}]`
                        );
                    });

                    return res.status(400).json({
                        success: false,
                        error: `Product not found in database`,
                        productKey: productKey,
                        extractedSlug: productSlug,
                        cartItemName: cartItem.name,
                        availableProducts: allProducts.map((p) => ({
                            title: p.title,
                            slug: p.slug,
                        })),
                    });
                }

                // Validate size availability (if product has sizes)
                if (
                    product.size &&
                    Array.isArray(product.size) &&
                    product.size.length > 0
                ) {
                    if (requestedSize) {
                        // Handle multiple sizes in request (e.g., "S,M,L,XL,XXL")
                        const requestedSizes = requestedSize
                            .split(",")
                            .map((s) => s.trim());
                        const availableSizes = product.size;

                        let validSize = false;
                        for (const size of requestedSizes) {
                            if (availableSizes.includes(size)) {
                                validSize = true;
                                break;
                            }
                        }

                        if (!validSize) {
                            console.log(
                                `❌ Size validation failed. Requested: [${requestedSize}], Available: [${availableSizes.join(
                                    ", "
                                )}]`
                            );
                            return res.status(400).json({
                                success: false,
                                error: `Selected size "${requestedSize}" not available for ${product.title}`,
                                productName: product.title,
                                requestedSize: requestedSize,
                                availableSizes: availableSizes,
                            });
                        } else {
                            console.log(
                                `✅ Size validation passed: ${requestedSize}`
                            );
                        }
                    } else {
                        console.log(
                            `⚠️ No size specified for product that has sizes`
                        );
                    }
                }

                // Validate color availability (if product has colors)
                if (
                    product.color &&
                    Array.isArray(product.color) &&
                    product.color.length > 0
                ) {
                    if (requestedColor) {
                        // Handle multiple colors in request (e.g., "#cdb4db,#ffafcc,#bde0fe")
                        const requestedColors = requestedColor
                            .split(",")
                            .map((c) => c.trim());
                        const availableColors = product.color;

                        let validColor = false;
                        for (const color of requestedColors) {
                            if (availableColors.includes(color)) {
                                validColor = true;
                                break;
                            }
                        }

                        if (!validColor) {
                            console.log(
                                `❌ Color validation failed. Requested: [${requestedColor}], Available: [${availableColors.join(
                                    ", "
                                )}]`
                            );
                            return res.status(400).json({
                                success: false,
                                error: `Selected color "${requestedColor}" not available for ${product.title}`,
                                productName: product.title,
                                requestedColor: requestedColor,
                                availableColors: availableColors,
                            });
                        } else {
                            console.log(
                                `✅ Color validation passed: ${requestedColor}`
                            );
                        }
                    } else {
                        console.log(
                            `⚠️ No color specified for product that has colors`
                        );
                    }
                }

                // Check stock availability
                if (product.availableQty < cartItem.qty) {
                    console.log(
                        `❌ Insufficient stock. Requested: ${cartItem.qty}, Available: ${product.availableQty}`
                    );
                    stockCheckResults.push({
                        productName: cartItem.name,
                        requestedQty: cartItem.qty,
                        availableQty: product.availableQty,
                        productKey: productKey,
                    });
                } else {
                    console.log(
                        `✅ Stock check passed: ${cartItem.qty}/${product.availableQty}`
                    );
                }

                console.log(
                    `✅ Product validation completed for: ${product.title}`
                );
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
                userId: userId || email, // Use userId if provided, otherwise use email
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

                // Multi-strategy product lookup for stock reduction
                let product = null;

                // Strategy 1: Try finding by _id
                if (productKey.match(/^[0-9a-fA-F]{24}$/)) {
                    try {
                        product = await Product.findByIdAndUpdate(
                            productKey,
                            { $inc: { availableQty: -cartItem.qty } },
                            { new: true }
                        );
                    } catch (error) {
                        console.log(
                            "Stock update strategy 1 failed:",
                            error.message
                        );
                    }
                }

                // Strategy 2: Try finding by itemCode
                if (!product) {
                    try {
                        product = await Product.findOneAndUpdate(
                            { itemCode: productKey },
                            { $inc: { availableQty: -cartItem.qty } },
                            { new: true }
                        );
                    } catch (error) {
                        console.log(
                            "Stock update strategy 2 failed:",
                            error.message
                        );
                    }
                }

                // Strategy 3: Try finding by slug (extract from productKey)
                if (!product) {
                    try {
                        const slugPart = productKey
                            .split("-")
                            .slice(0, -2)
                            .join("-");
                        product = await Product.findOneAndUpdate(
                            { slug: slugPart },
                            { $inc: { availableQty: -cartItem.qty } },
                            { new: true }
                        );
                    } catch (error) {
                        console.log(
                            "Stock update strategy 3 failed:",
                            error.message
                        );
                    }
                }

                // Strategy 4: Try exact slug match
                if (!product) {
                    try {
                        product = await Product.findOneAndUpdate(
                            { slug: productKey },
                            { $inc: { availableQty: -cartItem.qty } },
                            { new: true }
                        );
                    } catch (error) {
                        console.log(
                            "Stock update strategy 4 failed:",
                            error.message
                        );
                    }
                }

                if (!product) {
                    console.log(
                        "Failed to update stock for productKey:",
                        productKey
                    );
                }
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
