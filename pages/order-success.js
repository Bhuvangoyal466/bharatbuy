import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const OrderSuccess = () => {
    const router = useRouter();
    const { orderId } = router.query;
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (orderId) {
            fetchOrderDetails();
        }
    }, [orderId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-nykaa-primary mx-auto"></div>
                    <p className="mt-4 text-lg text-gray-700">
                        Loading order details...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-50 px-4 py-12">
            <div className="w-full max-w-2xl">
                <div className="nykaa-card p-10 text-center">
                    <div className="text-nykaa-primary text-6xl mb-4">
                        &#10003;
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Order Created Successfully!
                    </h1>

                    {orderDetails && (
                        <div className="bg-white p-6 rounded-lg shadow-md text-left mb-6">
                            <h2 className="text-xl font-semibold mb-4 text-nykaa-primary">
                                Order Details
                            </h2>
                            <div className="space-y-2">
                                <p>
                                    <strong>Order ID:</strong>{" "}
                                    <span className="text-nykaa-primary font-mono">
                                        {orderDetails.orderId}
                                    </span>
                                </p>
                                <p>
                                    <strong>Amount:</strong>{" "}
                                    <span className="text-nykaa-primary font-bold">
                                        ₹{orderDetails.amount}
                                    </span>
                                </p>
                                <p>
                                    <strong>Status:</strong>
                                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded ml-2">
                                        {orderDetails.status}
                                    </span>
                                </p>
                                <p>
                                    <strong>Customer:</strong>{" "}
                                    {orderDetails.customerInfo?.name}
                                </p>
                                <p>
                                    <strong>Email:</strong>{" "}
                                    {orderDetails.customerInfo?.email}
                                </p>
                                <p>
                                    <strong>Phone:</strong>{" "}
                                    {orderDetails.customerInfo?.phone}
                                </p>
                            </div>

                            <div className="mt-4">
                                <h3 className="font-semibold mb-2 text-gray-900">
                                    Items Ordered:
                                </h3>
                                <ul className="space-y-1">
                                    {orderDetails.products?.map(
                                        (product, index) => (
                                            <li key={index} className="text-sm">
                                                <span className="font-medium text-gray-800">
                                                    {product.name}
                                                </span>
                                                {product.size && (
                                                    <span className="text-gray-500 ml-1">
                                                        ({product.size})
                                                    </span>
                                                )}{" "}
                                                - Qty: {product.quantity} -{" "}
                                                <span className="text-nykaa-primary font-semibold">
                                                    ₹{product.price}
                                                </span>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </div>
                    )}

                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/" passHref legacyBehavior>
                            <a className="w-full sm:w-auto">
                                <button className="btn-nykaa px-6 py-3 text-lg font-semibold w-full sm:w-auto">
                                    Continue Shopping
                                </button>
                            </a>
                        </Link>
                        <Link href="/orders" passHref legacyBehavior>
                            <a className="w-full sm:w-auto">
                                <button className="bg-gray-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-700 transition-all duration-300 w-full sm:w-auto">
                                    View Orders
                                </button>
                            </a>
                        </Link>
                    </div>

                    <div className="mt-6 text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">
                        <p>
                            A confirmation email has been sent to your email
                            address.
                            <br />
                            You can track your order status in the{" "}
                            <span className="font-semibold text-nykaa-primary">
                                My Orders
                            </span>{" "}
                            section.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
