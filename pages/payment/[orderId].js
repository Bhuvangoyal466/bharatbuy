import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Script from "next/script";

const PaymentPage = () => {
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
            } else {
                console.error("Failed to fetch order details");
                router.push("/");
            }
        } catch (error) {
            console.error("Error fetching order details:", error);
            router.push("/");
        } finally {
            setLoading(false);
        }
    };

    const initiatePaytmPayment = () => {
        if (!orderDetails) return;

        // This is where you would integrate with Paytm
        // For now, we'll simulate a successful payment
        console.log(
            "Initiating Paytm payment for order:",
            orderDetails.orderId
        );

        // Simulated payment success - replace with actual Paytm integration
        setTimeout(() => {
            router.push(`/payment-success?orderId=${orderDetails.orderId}`);
        }, 2000);
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
                <p className="mt-4 text-lg">Loading payment details...</p>
            </div>
        );
    }

    if (!orderDetails) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl font-bold text-red-600">
                    Order not found
                </h1>
                <p className="mt-4">
                    Please check your order ID and try again.
                </p>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>Payment - BharatBuy</title>
                <meta
                    name="viewport"
                    content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
                />
            </Head>

            {/* Paytm JS Checkout Script */}
            <Script
                type="application/javascript"
                src="https://securegw.paytm.in/merchantpgpui/checkoutjs/merchants/{MID}.js"
                onLoad={() => {
                    console.log("Paytm checkout script loaded");
                }}
                crossOrigin="anonymous"
            />

            <div className="container mx-auto px-4 py-8 max-w-2xl">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="bg-blue-600 text-white px-6 py-4">
                        <h1 className="text-2xl font-bold">Complete Payment</h1>
                    </div>

                    <div className="p-6">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-4">
                                Order Summary
                            </h2>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-medium">
                                        Order ID:
                                    </span>
                                    <span className="text-blue-600 font-mono">
                                        {orderDetails.orderId}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-medium">
                                        Total Amount:
                                    </span>
                                    <span className="text-2xl font-bold text-green-600">
                                        ₹{orderDetails.amount}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Status:</span>
                                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                                        {orderDetails.paymentStatus}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-3">
                                Customer Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="font-medium">Name:</span>{" "}
                                    {orderDetails.customerInfo?.name}
                                </div>
                                <div>
                                    <span className="font-medium">Email:</span>{" "}
                                    {orderDetails.customerInfo?.email}
                                </div>
                                <div>
                                    <span className="font-medium">Phone:</span>{" "}
                                    {orderDetails.customerInfo?.phone}
                                </div>
                                <div>
                                    <span className="font-medium">City:</span>{" "}
                                    {orderDetails.customerInfo?.city}
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-3">
                                Items Ordered
                            </h3>
                            <div className="space-y-2">
                                {orderDetails.products?.map(
                                    (product, index) => (
                                        <div
                                            key={index}
                                            className="flex justify-between items-center py-2 border-b border-gray-100"
                                        >
                                            <div>
                                                <span className="font-medium">
                                                    {product.name}
                                                </span>
                                                {product.size && (
                                                    <span className="text-gray-500 ml-2">
                                                        ({product.size})
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <div>
                                                    Qty: {product.quantity}
                                                </div>
                                                <div className="font-medium">
                                                    ₹{product.price}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>

                        <div className="border-t pt-6">
                            <button
                                onClick={initiatePaytmPayment}
                                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
                            >
                                Pay with Paytm - ₹{orderDetails.amount}
                            </button>

                            <div className="mt-4 text-center">
                                <p className="text-sm text-gray-600">
                                    Secure payment powered by Paytm
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    Your payment information is encrypted and
                                    secure
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentPage;
