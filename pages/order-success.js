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

    const fetchOrderDetails = async () => {
        try {
            const response = await fetch(
                `/api/pretransaction?orderId=${orderId}`
            );
            const data = await response.json();

            if (data.success) {
                setOrderDetails(data.order);
            }
        } catch (error) {
            console.error("Error fetching order details:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
                <p className="mt-4 text-lg">Loading order details...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                <div className="text-green-600 text-6xl mb-4">✓</div>
                <h1 className="text-3xl font-bold text-green-800 mb-4">
                    Order Created Successfully!
                </h1>

                {orderDetails && (
                    <div className="bg-white p-6 rounded-lg shadow-md text-left">
                        <h2 className="text-xl font-semibold mb-4">
                            Order Details
                        </h2>
                        <div className="space-y-2">
                            <p>
                                <strong>Order ID:</strong>{" "}
                                {orderDetails.orderId}
                            </p>
                            <p>
                                <strong>Amount:</strong> ₹{orderDetails.amount}
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
                            <h3 className="font-semibold mb-2">
                                Items Ordered:
                            </h3>
                            <ul className="space-y-1">
                                {orderDetails.products?.map(
                                    (product, index) => (
                                        <li key={index} className="text-sm">
                                            {product.name} ({product.size}) -
                                            Qty: {product.quantity} - ₹
                                            {product.price}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                )}

                <div className="mt-8 space-x-4">
                    <Link href="/">
                        <button className="bg-[#f05e5e] text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors">
                            Continue Shopping
                        </button>
                    </Link>
                    <Link href="/orders">
                        <button className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                            View Orders
                        </button>
                    </Link>
                </div>

                <div className="mt-6 text-sm text-gray-600">
                    <p>
                        A confirmation email has been sent to your email
                        address.
                    </p>
                    <p>
                        You can track your order status in the "My Orders"
                        section.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
