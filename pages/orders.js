import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Orders = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
        } else {
            setUser({ token });
            fetchOrders();
        }
    }, [router]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");

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
                    localStorage.removeItem("token");
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
            <div className="container mx-auto px-4 py-8 text-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
                <p className="mt-4 text-lg">Loading your orders...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
                <p className="mt-4 text-lg">Loading...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto md:px-30 px-15 py-24">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    My Orders
                </h1>
                <p className="text-gray-600 max-w-2xl mb-20 mx-auto">
                    Track and manage all your orders in one place. View order
                    details, payment status, and shipping information.
                </p>
            </div>

            {orders && orders.length > 0 ? (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="bg-white rounded-lg shadow-lg border border-gray-200 mb-15 overflow-hidden"
                        >
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
                                        <div>
                                            <p className="text-sm text-gray-600">
                                                Order ID
                                            </p>
                                            <p className="font-mono font-medium text-[#f05e5e]">
                                                {order.orderId}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">
                                                Order Date
                                            </p>
                                            <p className="font-medium">
                                                {formatDate(order.createdAt)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">
                                                Total Amount
                                            </p>
                                            <p className="font-bold text-lg text-green-600">
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
                            </div>

                            <div className="px-6 py-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-3">
                                            Customer Information
                                        </h3>
                                        <div className="space-y-1 text-sm">
                                            <p>
                                                <span className="font-medium">
                                                    Name:
                                                </span>{" "}
                                                {order.customerInfo?.name}
                                            </p>
                                            <p>
                                                <span className="font-medium">
                                                    Email:
                                                </span>{" "}
                                                {order.customerInfo?.email}
                                            </p>
                                            <p>
                                                <span className="font-medium">
                                                    Phone:
                                                </span>{" "}
                                                {order.customerInfo?.phone}
                                            </p>
                                            <p>
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
                                                            <span className="font-medium">
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
                                                            <span>
                                                                Qty:{" "}
                                                                {
                                                                    product.quantity
                                                                }
                                                            </span>
                                                            <span className="ml-2 font-medium">
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
                                    <div className="mt-4 pt-4 border-t border-gray-200">
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
                                        <p className="text-sm">
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
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="text-6xl text-gray-300 mb-4">📦</div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                        No Orders Found
                    </h2>
                    <p className="text-gray-600 mb-6">
                        You haven't placed any orders yet.
                    </p>
                    <button
                        onClick={() => router.push("/")}
                        className="bg-[#f05e5e] text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors font-medium"
                    >
                        Start Shopping
                    </button>
                </div>
            )}
        </div>
    );
};

export default Orders;
