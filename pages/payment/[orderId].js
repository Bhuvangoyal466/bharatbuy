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

            <div className="min-h-screen bg-gradient-to-br from-[#fff0f6] via-[#ffe3ec] to-[#fff0f6] flex items-center justify-center py-10 px-2">
                <div className="w-full max-w-2xl shadow-2xl rounded-3xl bg-white/90 border border-pink-100 overflow-hidden">
                    <div className="bg-[#f05e5e] bg-gradient-to-r from-[#f05e5e] to-[#ffb6c1] text-white px-8 py-6 rounded-t-3xl flex items-center gap-3">
                        <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="12" fill="#fff" fillOpacity=".1"/><path d="M7 12.5l3 3 7-7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        <h1 className="text-3xl font-extrabold tracking-tight">Complete Payment</h1>
                    </div>
                    <div className="p-8">
                        <div className="mb-8">
                            <h2 className="text-xl font-bold mb-4 text-[#f05e5e] tracking-wide">Order Summary</h2>
                            <div className="bg-[#fff5fa] p-5 rounded-2xl border border-pink-100">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold text-gray-700">Order ID:</span>
                                    <span className="text-[#f05e5e] font-mono text-base">{orderDetails.orderId}</span>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold text-gray-700">Total Amount:</span>
                                    <span className="text-2xl font-extrabold text-[#43b672]">₹{orderDetails.amount}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-gray-700">Status:</span>
                                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">{orderDetails.paymentStatus}</span>
                                </div>
                            </div>
                        </div>
                        <div className="mb-8">
                            <h3 className="text-lg font-bold mb-3 text-[#f05e5e] tracking-wide">Customer Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div><span className="font-semibold text-gray-700">Name:</span> {orderDetails.customerInfo?.name}</div>
                                <div><span className="font-semibold text-gray-700">Email:</span> {orderDetails.customerInfo?.email}</div>
                                <div><span className="font-semibold text-gray-700">Phone:</span> {orderDetails.customerInfo?.phone}</div>
                                <div><span className="font-semibold text-gray-700">City:</span> {orderDetails.customerInfo?.city}</div>
                            </div>
                        </div>
                        <div className="mb-8">
                            <h3 className="text-lg font-bold mb-3 text-[#f05e5e] tracking-wide">Items Ordered</h3>
                            <div className="space-y-3">
                                {orderDetails.products?.map((product, index) => (
                                    <div key={index} className="flex justify-between items-center py-3 border-b border-pink-100 last:border-b-0">
                                        <div>
                                            <span className="font-semibold text-gray-800">{product.name}</span>
                                            {product.size && (
                                                <span className="text-gray-400 ml-2">({product.size})</span>
                                            )}
                                        </div>
                                        <div className="text-right">
                                            <div className="text-gray-600">Qty: {product.quantity}</div>
                                            <div className="font-semibold text-[#f05e5e]">₹{product.price}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="border-t border-pink-100 pt-8">
                            <button
                                onClick={initiatePaytmPayment}
                                className="btn-nykaa w-full py-3 px-6 text-lg font-bold rounded-xl shadow-md transition-all duration-200 bg-[#f05e5e] hover:bg-[#e13c3c] text-white tracking-wide"
                            >
                                Pay with Paytm - ₹{orderDetails.amount}
                            </button>
                            <div className="mt-6 text-center">
                                <p className="text-sm text-[#f05e5e] font-semibold">Secure payment powered by Paytm</p>
                                <p className="text-xs text-gray-400 mt-1">Your payment information is encrypted and secure</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentPage;
