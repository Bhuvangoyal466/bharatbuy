import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const PaymentSuccess = () => {
    const router = useRouter();
    const { orderId, transactionId } = router.query;
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (orderId) {
            fetchOrderDetails();
            updateOrderStatus();
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
            <div className="container mx-auto px-4 py-8 text-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
                <p className="mt-4 text-lg">Confirming your payment...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <div className="bg-green-50 border border-green-200 rounded-lg overflow-hidden shadow-lg">
                <div className="bg-green-600 text-white px-6 py-4 text-center">
                    <div className="text-6xl mb-2">🎉</div>
                    <h1 className="text-3xl font-bold">Payment Successful!</h1>
                </div>

                <div className="p-6">
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
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4">
                                Payment Details
                            </h2>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="font-medium">
                                        Order ID:
                                    </span>
                                    <span className="text-blue-600 font-mono">
                                        {orderDetails.orderId}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">
                                        Transaction ID:
                                    </span>
                                    <span className="text-green-600 font-mono">
                                        {transactionId ||
                                            orderDetails.transactionId ||
                                            `TXN_${Date.now()}`}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">
                                        Amount Paid:
                                    </span>
                                    <span className="text-2xl font-bold text-green-600">
                                        ₹{orderDetails.amount}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">
                                        Payment Status:
                                    </span>
                                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                        Success
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">
                                        Customer:
                                    </span>
                                    <span>
                                        {orderDetails.customerInfo?.name}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Email:</span>
                                    <span>
                                        {orderDetails.customerInfo?.email}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t">
                                <h3 className="font-semibold mb-3">
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
                                                    <span className="font-medium">
                                                        {product.name}
                                                    </span>
                                                    {product.size && (
                                                        <span className="text-gray-500 ml-1">
                                                            ({product.size})
                                                        </span>
                                                    )}
                                                </div>
                                                <div>
                                                    Qty: {product.quantity} × ₹
                                                    {product.price}
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mt-8 text-center space-y-4">
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/">
                                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                    Continue Shopping
                                </button>
                            </Link>
                            <Link href="/orders">
                                <button className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium">
                                    View My Orders
                                </button>
                            </Link>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-blue-800 mb-2">
                                What's Next?
                            </h4>
                            <ul className="text-sm text-blue-700 space-y-1">
                                <li>
                                    • You will receive an order confirmation
                                    email shortly
                                </li>
                                <li>
                                    • Your order will be processed and shipped
                                    within 1-2 business days
                                </li>
                                <li>
                                    • You can track your order status in the "My
                                    Orders" section
                                </li>
                                <li>
                                    • For any queries, contact our customer
                                    support
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
