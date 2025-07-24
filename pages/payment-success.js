import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const PaymentSuccess = ({ clearCart }) => {
    const router = useRouter();
    const { orderId, transactionId } = router.query;
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cartCleared, setCartCleared] = useState(false);

    useEffect(() => {
        if (orderId) {
            fetchOrderDetails();
            updateOrderStatus();
        }
    }, [orderId]);

    // Clear cart after payment is confirmed and only once
    useEffect(() => {
        if (!loading && orderDetails && !cartCleared) {
            clearCart && clearCart();
            setCartCleared(true);
        }
    }, [loading, orderDetails, clearCart, cartCleared]);

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

    const updateOrderStatus = async () => {
        try {
            // Here you would typically call an API to update the order status to "Success"
            // and record the transaction ID
            const response = await fetch("/api/update-order-status", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    orderId: orderId,
                    status: "Success",
                    paymentStatus: "Success",
                    transactionId: transactionId || `TXN_${Date.now()}`,
                }),
            });
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-nykaa-primary mx-auto"></div>
                    <p className="mt-4 text-lg text-gray-700">
                        Confirming your payment...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-50 px-4 py-12">
            <div className="w-full max-w-2xl">
                <div className="nykaa-card p-10 text-center">
                    <div className="text-nykaa-primary text-6xl mb-4">🎉</div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Payment Successful!
                    </h1>

                    <div className="text-center mb-6">
                        <p className="text-lg text-gray-700 mb-2">
                            Thank you for your purchase!
                        </p>
                        <p className="text-sm text-gray-600">
                            Your order has been confirmed and will be processed
                            shortly.
                        </p>
                    </div>

                    {orderDetails && (
                        <div className="bg-white p-6 rounded-lg shadow-md text-left mb-6">
                            <h2 className="text-xl font-semibold mb-4 text-nykaa-primary">
                                Payment Details
                            </h2>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="font-medium text-black">
                                        Order ID:
                                    </span>
                                    <span className="text-nykaa-primary font-mono">
                                        {orderDetails.orderId}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-black">
                                        Transaction ID:
                                    </span>
                                    <span className="text-green-600 font-mono">
                                        {transactionId ||
                                            orderDetails.transactionId ||
                                            `TXN_${Date.now()}`}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-black">
                                        Amount Paid:
                                    </span>
                                    <span className="text-2xl font-bold text-nykaa-primary">
                                        ₹{orderDetails.amount}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-black">
                                        Payment Status:
                                    </span>
                                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                        Success
                                    </span>
                                </div>
                                <div className="flex justify-between text-black">
                                    <span className="font-medium ">
                                        Customer:
                                    </span>
                                    <span>
                                        {orderDetails.customerInfo?.name}
                                    </span>
                                </div>
                                <div className="flex justify-between text-black">
                                    <span className="font-medium ">Email:</span>
                                    <span>
                                        {orderDetails.customerInfo?.email}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t">
                                <h3 className="font-semibold mb-3 text-gray-900">
                                    Items Purchased:
                                </h3>
                                <div className="space-y-2">
                                    {orderDetails.products?.map(
                                        (product, index) => (
                                            <div
                                                key={index}
                                                className="flex justify-between items-center text-sm"
                                            >
                                                <div>
                                                    <span className="font-medium text-gray-800">
                                                        {product.name}
                                                    </span>
                                                    {product.size && (
                                                        <span className="text-gray-500 ml-1">
                                                            ({product.size})
                                                        </span>
                                                    )}
                                                </div>
                                                <div>
                                                    Qty: {product.quantity} ×{" "}
                                                    <span className="text-nykaa-primary font-semibold">
                                                        ₹{product.price}
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
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
                                    View My Orders
                                </button>
                            </a>
                        </Link>
                    </div>

                    <div className="mt-6 text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2">
                            What's Next?
                        </h4>
                        <ul className="text-sm text-blue-700 space-y-1 text-left">
                            <li>
                                • You will receive an order confirmation email
                                shortly
                            </li>
                            <li>
                                • Your order will be processed and shipped
                                within 1-2 business days
                            </li>
                            <li>
                                • You can track your order status in the{" "}
                                <span className="font-semibold text-nykaa-primary">
                                    My Orders
                                </span>{" "}
                                section
                            </li>
                            <li>
                                • For any queries, contact our customer support
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
