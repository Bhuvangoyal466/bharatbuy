import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import { IoBagHandle } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import { set } from "mongoose";

const Checkout = ({ cart, clearCart, subTotal, addToCart, removeFromCart }) => {
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

    // Authentication check
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login to continue with checkout!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            router.push("/login");
        }
    }, [router]);

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
                let pins = await fetch(
                    `${process.env.NEXT_PUBLIC_HOST}/api/pincode`
                );
                let pinJson = await pins.json();
                if (Object.keys(pinJson).includes(e.target.value)) {
                    setCity(pinJson[e.target.value][0]);
                    setState(pinJson[e.target.value][1]);
                } else {
                    setCity("");
                    setState("");
                }
            } else {
                setCity("");
                setState("");
            }
        } else if (e.target.name === "state") {
            setState(e.target.value);
        }
        setTimeout(() => {
            if (name && email && address && phone && city && pin && state) {
                setDisabled(false);
            } else {
                setDisabled(true);
            }
        }, 100);
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

            // Validate form fields
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

            // Get userId from localStorage or session (you may need to adjust this based on your auth system)
            const userId =
                localStorage.getItem("userId") || "guest_" + Date.now();

            const orderData = {
                userId: userId,
                cart: cart,
                subTotal: subTotal,
                name: name,
                email: email,
                address: address,
                phone: phone,
                city: city,
                pin: pin,
                state: state,
            };

            // Call pretransaction API
            const response = await fetch("/api/pretransaction", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            });

            const data = await response.json();

            if (data.success) {
                // Order created successfully
                toast.success("Order created successfully!");

                // Clear cart after successful order creation
                clearCart();

                // Redirect to payment page or success page
                if (data.redirectUrl) {
                    router.push(data.redirectUrl);
                } else {
                    // Alternative redirect
                    router.push(`/order-success?orderId=${data.orderId}`);
                }
            } else {
                toast.error(data.error || "Failed to create order");
            }
        } catch (error) {
            console.error("Error initiating payment:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="container px-7  md:px-40 m-auto">
            <h1 className="font-semibold text-3xl my-8 text-center">
                Checkout
            </h1>
            <h2 className="font-semibold text-xl">1. Delivery Details</h2>
            <div className="mx-auto flex my-2">
                <div className=" w-1/2 px-5">
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="leading-7 text-sm text-gray-600"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={handleChange}
                            id="name"
                            name="name"
                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                </div>
                <div className=" w-1/2">
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="leading-7 text-sm text-gray-600"
                        >
                            Email
                        </label>
                        <input
                            value={email}
                            onChange={handleChange}
                            type="email"
                            id="email"
                            name="email"
                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                </div>
            </div>
            <div className=" w-full my-2">
                <div className="mb-4 pl-5">
                    <label
                        htmlFor="address"
                        className="leading-7 text-sm text-gray-600"
                    >
                        {address ? "Address" : "Enter your address"}
                    </label>

                    <textarea
                        value={address}
                        onChange={handleChange}
                        name="address"
                        id="address"
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    ></textarea>
                </div>
            </div>
            <div className="mx-auto flex my-2">
                <div className=" w-1/2 px-5">
                    <div className="mb-4">
                        <label
                            htmlFor="phone"
                            className="leading-7 text-sm text-gray-600"
                        >
                            Phone
                        </label>
                        <input
                            value={phone}
                            onChange={handleChange}
                            type="number"
                            id="phone"
                            name="phone"
                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                </div>
                <div className=" w-1/2">
                    <div className="mb-4">
                        <label
                            htmlFor="city"
                            className="leading-7 text-sm text-gray-600"
                        >
                            City
                        </label>
                        <input
                            value={city}
                            onChange={handleChange}
                            type="text"
                            id="city"
                            name="city"
                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                </div>
            </div>
            <div className="mx-auto flex my-2">
                <div className=" w-1/2 px-5">
                    <div className="mb-4">
                        <label
                            htmlFor="pin"
                            className="leading-7 text-sm text-gray-600"
                        >
                            Pincode
                        </label>
                        <input
                            value={pin}
                            onChange={handleChange}
                            type="number"
                            id="pin"
                            name="pin"
                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                </div>
                <div className=" w-1/2">
                    <div className="mb-4">
                        <label
                            htmlFor="state"
                            className="leading-7 text-sm text-gray-600"
                        >
                            State
                        </label>
                        <input
                            value={state}
                            onChange={handleChange}
                            type="text"
                            id="state"
                            name="state"
                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                </div>
            </div>
            <h2 className="font-semibold text-xl">
                2. Review Your Order & Pay
            </h2>
            <div className=" bg-[#ff8080] border-black border-2 p-6 pl-20 m-4 mt-4 rounded-xl">
                <ol className="list-decimal font-semibold">
                    {Object.keys(cart).length == 0 && (
                        <div className="my-4 font-semibold text-center">
                            Your cart is empty! <br />
                            <br />
                            Please add a few items to place your order.
                        </div>
                    )}
                    {Object.keys(cart).map((k) => {
                        return (
                            <li key={k}>
                                <div className="item flex my-5">
                                    <div className="font-semibold flex items-center justify-center">
                                        {cart[k].name}({cart[k].size})
                                    </div>
                                    <div className="flex font-semibold items-center justify-center w-1/3 text-md ">
                                        <FaMinusSquare
                                            onClick={() =>
                                                removeFromCart(
                                                    k,
                                                    1,
                                                    cart[k].price,
                                                    cart[k].name,
                                                    cart[k].size,
                                                    cart[k].variant
                                                )
                                            }
                                            className="mx-2 cursor-pointer "
                                        />
                                        {cart[k].qty}
                                        <FaPlusSquare
                                            onClick={() =>
                                                addToCart(
                                                    k,
                                                    1,
                                                    cart[k].price,
                                                    cart[k].name,
                                                    cart[k].size,
                                                    cart[k].variant
                                                )
                                            }
                                            className="mx-2 cursor-pointer "
                                        />
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ol>
                <span className="font-bold">Subtotal: ₹{subTotal}</span>
            </div>
            <div className="mx-4">
                <button
                    onClick={initiatePayment}
                    disabled={disabled || loading}
                    className="flex disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 mr-2 items-center justify-center mt-6 
                rounded-lg cursor-pointer font-semibold bg-[#ff8080] border-2 border-black py-2 px-8 focus:outline-none hover:bg-[#f05e5e] text-lg"
                >
                    <IoBagHandle className="mx-1" />
                    {loading ? "Processing..." : "Pay Now"}
                </button>
            </div>
        </div>
    );
};

export default Checkout;
