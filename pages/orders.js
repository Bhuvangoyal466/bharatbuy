import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Orders = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const myuser = localStorage.getItem("myuser");
        if (!myuser) {
            router.push("/login");
        } else {
            try {
                const parsedUser = JSON.parse(myuser);
                if (parsedUser && parsedUser.token) {
                    setUser(parsedUser);
                    fetchOrders(parsedUser.token);
                } else {
                    router.push("/login");
                }
            } catch (error) {
                console.error("Error parsing user data:", error);
                router.push("/login");
            }
        }
    }, [router]);

    const fetchOrders = async (token) => {
        try {
            setLoading(true);

            if (!token) {
                router.push("/login");
                return;
            }

            const response = await fetch("/api/orders", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();

            if (data.success) {
                setOrders(data.orders);
            } else {
                console.error("Failed to fetch orders:", data.error);
                if (
                    data.error.includes("Invalid token") ||
                    data.error.includes("Access denied")
                ) {
                    localStorage.removeItem("myuser");
                    router.push("/login");
                }
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Success":
                return "bg-green-100 text-green-800";
            case "Pending":
                return "bg-yellow-100 text-yellow-800";
            case "Failed":
                return "bg-red-100 text-red-800";
            case "Cancelled":
                return "bg-gray-100 text-gray-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-nykaa-primary mx-auto"></div>
                    <p className="mt-4 text-lg text-gray-700">
                        Loading your orders...
                    </p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-nykaa-primary mx-auto"></div>
                    <p className="mt-4 text-lg text-gray-700">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 px-4 py-12">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        My Orders
                    </h1>
                    <p className="text-gray-600 max-w-2xl mb-8 mx-auto">
                        Track and manage all your orders in one place. View
                        order details, payment status, and shipping information.
                    </p>
                </div>

                {orders && orders.length > 0 ? (
                    <div className="space-y-8">
                        {orders.map((order) => (
                            <div
                                key={order._id}
                                className="nykaa-card p-8 mb-8"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-200 pb-4 mb-4">
                                    <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
                                        <div>
                                            <p className="text-xs text-gray-500">
                                                Order ID
                                            </p>
                                            <p className="font-mono font-semibold text-nykaa-primary">
                                                {order.orderId}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">
                                                Order Date
                                            </p>
                                            <p className="font-medium text-black">
                                                {formatDate(order.createdAt)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">
                                                Total Amount
                                            </p>
                                            <p className="font-bold text-lg text-nykaa-primary">
                                                ₹{order.amount}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-4 md:mt-0 flex space-x-2">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                                order.status
                                            )}`}
                                        >
                                            {order.status}
                                        </span>
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                                order.paymentStatus
                                            )}`}
                                        >
                                            Payment: {order.paymentStatus}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-3">
                                            Customer Information
                                        </h3>
                                        <div className="space-y-1 text-sm">
                                            <p className="text-black">
                                                <span className="font-medium ">
                                                    Name:
                                                </span>{" "}
                                                {order.customerInfo?.name}
                                            </p>
                                            <p className="text-black">
                                                <span className="font-medium">
                                                    Email:
                                                </span>{" "}
                                                {order.customerInfo?.email}
                                            </p>
                                            <p className="text-black">
                                                <span className="font-medium">
                                                    Phone:
                                                </span>{" "}
                                                {order.customerInfo?.phone}
                                            </p>
                                            <p className="text-black">
                                                <span className="font-medium">
                                                    City:
                                                </span>{" "}
                                                {order.customerInfo?.city},{" "}
                                                {order.customerInfo?.state}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-3">
                                            Order Items
                                        </h3>
                                        <div className="space-y-2">
                                            {order.products?.map(
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
                                                                    (
                                                                    {
                                                                        product.size
                                                                    }
                                                                    )
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="text-right">
                                                            <span className="text-black">
                                                                Qty:{" "}
                                                                {
                                                                    product.quantity
                                                                }
                                                            </span>
                                                            <span className="ml-2 font-semibold text-nykaa-primary">
                                                                ₹{product.price}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {order.address && (
                                    <div className="mt-6 pt-4 border-t border-gray-200">
                                        <h3 className="font-semibold text-gray-900 mb-2">
                                            Delivery Address
                                        </h3>
                                        <p className="text-sm text-gray-700">
                                            {order.address}
                                        </p>
                                    </div>
                                )}

                                {order.transactionId && (
                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                        <p className="text-sm text-black">
                                            <span className="font-medium">
                                                Transaction ID:
                                            </span>
                                            <span className="font-mono text-green-600 ml-2">
                                                {order.transactionId}
                                            </span>
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="text-6xl text-gray-300 mb-4">📦</div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                            No Orders Found
                        </h2>
                        <p className="text-gray-600 mb-6">
                            You haven't placed any orders yet.
                        </p>
                        <button
                            onClick={() => router.push("/")}
                            className="btn-nykaa px-6 py-3 text-lg font-semibold"
                        >
                            Start Shopping
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
