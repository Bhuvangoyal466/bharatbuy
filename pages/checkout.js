import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import { IoBagHandle } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";

const Checkout = ({
    cart,
    user,
    clearCart,
    subTotal,
    addToCart,
    removeFromCart,
}) => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [pin, setPin] = useState("");
    const [state, setState] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    // Authentication check and user data initialization
    useEffect(() => {
        const fetchUserAndInitialize = async () => {
            const myuser = localStorage.getItem("myuser");
            if (!myuser) {
                toast.error("Please login to continue with checkout!", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                router.push("/login");
                return;
            }

            try {
                const parsedUser = JSON.parse(myuser);
                if (parsedUser && parsedUser.token) {
                    // Fetch user details from backend to auto-fill form
                    const response = await fetch("/api/getuser", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            token: parsedUser.token,
                        }),
                    });

                    if (response.ok) {
                        const userData = await response.json();
                        setName(userData.name || "");
                        setEmail(userData.email || "");
                        setAddress(userData.address || "");
                        setPhone(userData.phone || "");
                        setPin(userData.pincode || "");

                        // Auto-fill city and state if pincode is available
                        if (userData.pincode && userData.pincode.length === 6) {
                            try {
                                const pins = await fetch("/api/pincode");
                                const pinJson = await pins.json();
                                if (
                                    Object.keys(pinJson).includes(
                                        userData.pincode
                                    )
                                ) {
                                    setCity(pinJson[userData.pincode][0]);
                                    setState(pinJson[userData.pincode][1]);
                                }
                            } catch (error) {
                                console.error(
                                    "Error fetching pincode data:",
                                    error
                                );
                            }
                        }
                    }
                }
            } catch (error) {
                console.error("Error parsing user data:", error);
                toast.error("Please login to continue with checkout!");
                router.push("/login");
            }
        };

        fetchUserAndInitialize();
    }, [router]);

    // Update disabled state whenever form fields change
    useEffect(() => {
        const isFormValid =
            name && email && address && phone && city && pin && state;
        setDisabled(!isFormValid);
    }, [name, email, address, phone, city, pin, state]);

    const handleChange = async (e) => {
        if (e.target.name === "name") {
            setName(e.target.value);
        } else if (e.target.name === "email") {
            setEmail(e.target.value);
        } else if (e.target.name === "address") {
            setAddress(e.target.value);
        } else if (e.target.name === "phone") {
            setPhone(e.target.value);
        } else if (e.target.name === "city") {
            setCity(e.target.value);
        } else if (e.target.name === "pin") {
            setPin(e.target.value);
            if (e.target.value.length == 6) {
                let pins = await fetch("/api/pincode");
                let pinJson = await pins.json();
                if (Object.keys(pinJson).includes(e.target.value)) {
                    setCity(pinJson[e.target.value][0]);
                    setState(pinJson[e.target.value][1]);
                } else {
                    setCity("");
                    setState("");
                    toast.error("We don't deliver to this pincode yet.", {
                        position: "top-center",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                }
            } else {
                setCity("");
                setState("");
            }
        } else if (e.target.name === "state") {
            setState(e.target.value);
        }
    };

    const initiatePayment = async () => {
        setLoading(true);

        try {
            // Validate cart
            if (Object.keys(cart).length === 0) {
                toast.error("Your cart is empty!");
                setLoading(false);
                return;
            }

            // Validate form
            if (
                !name ||
                !email ||
                !address ||
                !phone ||
                !city ||
                !pin ||
                !state
            ) {
                toast.error("Please fill all required fields!");
                setLoading(false);
                return;
            }

            const data = {
                cart,
                subTotal,
                name,
                email,
                address,
                phone,
                city,
                pin,
                state,
            };

            let response = await fetch("/api/pretransaction", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            let txnRes = await response.json();

            if (txnRes.success) {
                const orderId = txnRes.orderId;
                router.push(`/payment/${orderId}`);
            } else {
                toast.error(txnRes.error || "Something went wrong!");
            }
        } catch (error) {
            console.error("Payment initiation error:", error);
            toast.error("Failed to initiate payment. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
            <div className="container px-5 py-16 mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Complete Your
                        <span className="text-nykaa-primary ml-3">Order</span>
                    </h1>
                    <div className="w-24 h-1 bg-nykaa-primary rounded-full mx-auto mb-6"></div>
                    <p className="text-gray-600 text-lg">
                        Just a few more details to get your products delivered!
                    </p>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Delivery Details Form */}
                    <div className="order-1">
                        <div className="nykaa-card p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">
                                🚚 Delivery Details
                            </h2>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-semibold text-gray-700 mb-2"
                                        >
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={handleChange}
                                            id="name"
                                            name="name"
                                            className="nykaa-input w-full"
                                            placeholder="Enter your full name"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-semibold text-gray-700 mb-2"
                                        >
                                            Email Address *
                                        </label>
                                        <input
                                            value={email}
                                            onChange={handleChange}
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="nykaa-input w-full bg-gray-50"
                                            placeholder="Your email address"
                                            readOnly
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            Email cannot be changed
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="address"
                                        className="block text-sm font-semibold text-gray-700 mb-2"
                                    >
                                        Complete Address *
                                    </label>
                                    <textarea
                                        value={address}
                                        onChange={handleChange}
                                        name="address"
                                        id="address"
                                        rows={3}
                                        className="nykaa-input w-full resize-none"
                                        placeholder="Enter your complete address with landmarks"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label
                                            htmlFor="phone"
                                            className="block text-sm font-semibold text-gray-700 mb-2"
                                        >
                                            Phone Number *
                                        </label>
                                        <input
                                            value={phone}
                                            onChange={handleChange}
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            className="nykaa-input w-full"
                                            placeholder="Enter your phone number"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="pin"
                                            className="block text-sm font-semibold text-gray-700 mb-2"
                                        >
                                            Pin Code *
                                        </label>
                                        <input
                                            value={pin}
                                            onChange={handleChange}
                                            type="text"
                                            id="pin"
                                            name="pin"
                                            maxLength="6"
                                            className="nykaa-input w-full"
                                            placeholder="Enter 6-digit pincode"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label
                                            htmlFor="city"
                                            className="block text-sm font-semibold text-gray-700 mb-2"
                                        >
                                            City *
                                        </label>
                                        <input
                                            value={city}
                                            onChange={handleChange}
                                            type="text"
                                            id="city"
                                            name="city"
                                            className="nykaa-input w-full bg-gray-50"
                                            placeholder="Auto-filled from pincode"
                                            readOnly
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="state"
                                            className="block text-sm font-semibold text-gray-700 mb-2"
                                        >
                                            State *
                                        </label>
                                        <input
                                            value={state}
                                            onChange={handleChange}
                                            type="text"
                                            id="state"
                                            name="state"
                                            className="nykaa-input w-full bg-gray-50"
                                            placeholder="Auto-filled from pincode"
                                            readOnly
                                        />
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={initiatePayment}
                                    disabled={disabled || loading}
                                    className={`w-full cursor-pointer btn-nykaa py-4 text-lg font-semibold ${
                                        disabled || loading
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                    }`}
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                            Processing...
                                        </div>
                                    ) : (
                                        <>
                                            <IoBagHandle className="inline mr-2" />
                                            Proceed to Payment - ₹{subTotal}
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="order-2 lg:order-2">
                        <div className="nykaa-card p-8 sticky top-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                <IoBagHandle className="mr-3 text-nykaa-primary" />
                                Order Summary
                            </h2>

                            <div className="space-y-4 max-h-80 overflow-y-auto">
                                {Object.keys(cart).length === 0 ? (
                                    <div className="text-center py-8">
                                        <div className="text-6xl text-gray-300 mb-4">
                                            🛒
                                        </div>
                                        <p className="text-gray-500 font-medium">
                                            Your cart is empty!
                                        </p>
                                        <Link href="/">
                                            <button className="btn-nykaa cursor-pointer mt-4">
                                                Continue Shopping
                                            </button>
                                        </Link>
                                    </div>
                                ) : (
                                    Object.keys(cart).map((k) => (
                                        <div
                                            key={k}
                                            className="bg-gray-50 rounded-xl p-4"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-gray-800 mb-1">
                                                        {cart[k].name}
                                                        {cart[k].category !==
                                                            "mug" &&
                                                            cart[k].category !==
                                                                "sticker" && (
                                                                <span className="text-gray-500 ml-2">
                                                                    (
                                                                    {
                                                                        cart[k]
                                                                            .size
                                                                    }
                                                                    )
                                                                </span>
                                                            )}
                                                    </h4>
                                                    <p className="text-nykaa-primary font-bold">
                                                        ₹{cart[k].price}
                                                    </p>
                                                </div>
                                                <div className="flex items-center space-x-3">
                                                    <div className="flex items-center space-x-2">
                                                        <button
                                                            onClick={() =>
                                                                removeFromCart(
                                                                    k,
                                                                    1,
                                                                    cart[k]
                                                                        .price,
                                                                    cart[k]
                                                                        .name,
                                                                    cart[k]
                                                                        .size,
                                                                    cart[k]
                                                                        .color
                                                                )
                                                            }
                                                            className="p-2 rounded-full cursor-pointer hover:bg-pink-100 text-nykaa-primary transition-all duration-200"
                                                        >
                                                            <FaMinusSquare />
                                                        </button>
                                                        <span className="font-semibold text-gray-700 px-3 py-1 bg-white rounded-lg min-w-[40px] text-center">
                                                            {cart[k].qty}
                                                        </span>
                                                        <button
                                                            onClick={() =>
                                                                addToCart(
                                                                    k,
                                                                    1,
                                                                    cart[k]
                                                                        .price,
                                                                    cart[k]
                                                                        .name,
                                                                    cart[k]
                                                                        .size,
                                                                    cart[k]
                                                                        .color
                                                                )
                                                            }
                                                            className="p-2 cursor-pointer rounded-full hover:bg-pink-100 text-nykaa-primary transition-all duration-200"
                                                        >
                                                            <FaPlusSquare />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {Object.keys(cart).length > 0 && (
                                <>
                                    <div className="border-t border-gray-200 pt-6 mt-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-lg font-semibold text-gray-800">
                                                Subtotal:
                                            </span>
                                            <span className="text-xl font-bold text-gray-900">
                                                ₹{subTotal}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-sm text-gray-600">
                                                Shipping:
                                            </span>
                                            <span className="text-sm text-green-600 font-semibold">
                                                FREE
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center mb-6 pt-4 border-t border-gray-200">
                                            <span className="text-xl font-bold text-gray-900">
                                                Total:
                                            </span>
                                            <span className="text-2xl font-bold text-nykaa-primary">
                                                ₹{subTotal}
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={clearCart}
                                        className="w-full bg-gray-100 
                                        cursor-pointer text-gray-700 py-3 px-4 rounded-full font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center mb-4"
                                    >
                                        <MdDeleteForever className="mr-2 text-lg" />
                                        Clear Cart
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
