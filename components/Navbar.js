import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaMinusSquare, FaPlusSquare, FaWindowClose } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { IoBagHandle } from "react-icons/io5";
import { useRef } from "react";
import { MdAccountCircle } from "react-icons/md";
import { toast } from "react-toastify";

const Navbar = ({
    logout,
    user,
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    subTotal,
    router,
}) => {
    const [dropdown, setDropdown] = useState(false);

    // Check if current page is checkout
    const isCheckoutPage = router?.pathname === "/checkout";

    const toggleCart = () => {
        if (ref.current.classList.contains("translate-x-full")) {
            ref.current.classList.remove("translate-x-full");
            ref.current.classList.add("translate-x-0");
        } else {
            ref.current.classList.add("translate-x-full");
            ref.current.classList.remove("translate-x-0");
        }
    };

    const handleCheckout = () => {
        // Check if user is logged in
        const myuser = localStorage.getItem("myuser");
        if (!myuser) {
            toast.error("Please login to proceed to checkout!", {
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

        // Check if cart is empty
        if (Object.keys(cart).length === 0) {
            toast.error("Your cart is empty!", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }

        router.push("/checkout");
    };
    const ref = useRef();

    return (
        <div className="flex flex-col md:flex-row md:justify-start items-center py-4 shadow-lg justify-center sticky top-0 bg-white/95 backdrop-blur-md z-50 border-b border-pink-100">
            <div className="logo mr-auto lg:mr-0 md:mr-0 mx-5">
                <Link href={"/"}>
                    <div className="relative group">
                        <Image
                            src="/flogo.png"
                            alt="BharatBuy Logo"
                            height={225}
                            width={125}
                            className="transition-all duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg"></div>
                    </div>
                </Link>
            </div>
            <div className="nav mt-4 lg:ml-10 lg:mt-0 md:mt-0">
                <ul className="flex items-center space-x-8 font-semibold md:text-lg">
                    <Link href={"/tshirts"} className="relative group">
                        <li className="text-gray-700 hover:text-nykaa-primary transition-all duration-300 py-2 px-1">
                            Tshirts
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-nykaa-primary group-hover:w-full transition-all duration-300"></span>
                        </li>
                    </Link>
                    <Link href={"/hoodies"} className="relative group">
                        <li className="text-gray-700 hover:text-nykaa-primary transition-all duration-300 py-2 px-1">
                            Hoodies
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-nykaa-primary group-hover:w-full transition-all duration-300"></span>
                        </li>
                    </Link>
                    <Link href={"/stickers"} className="relative group">
                        <li className="text-gray-700 hover:text-nykaa-primary transition-all duration-300 py-2 px-1">
                            Stickers
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-nykaa-primary group-hover:w-full transition-all duration-300"></span>
                        </li>
                    </Link>
                    <Link href={"/mugs"} className="relative group">
                        <li className="text-gray-700 hover:text-nykaa-primary transition-all duration-300 py-2 px-1">
                            Mugs
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-nykaa-primary group-hover:w-full transition-all duration-300"></span>
                        </li>
                    </Link>
                </ul>
            </div>
            <div className="cursor-pointer items-center cart absolute right-0 top-4 mx-5 flex space-x-4">
                {user.value && (
                    <div className="relative group">
                        <span
                            onMouseOver={() => setDropdown(true)}
                            onMouseLeave={() => setDropdown(false)}
                            className="mx-2 flex items-center space-x-1 text-gray-700 hover:text-nykaa-primary transition-all duration-300 cursor-pointer"
                        >
                            <MdAccountCircle className="text-2xl" />
                            <span className="hidden md:block font-medium">
                                Account
                            </span>
                        </span>
                        {dropdown && (
                            <div
                                onMouseOver={() => setDropdown(true)}
                                onMouseLeave={() => setDropdown(false)}
                                className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-pink-100 py-2 z-50"
                            >
                                <Link
                                    href="/myaccount"
                                    className="block px-4 py-3 text-gray-700 hover:bg-pink-50 hover:text-nykaa-primary transition-all duration-200 rounded-lg mx-2"
                                >
                                    My Account
                                </Link>
                                <Link
                                    href="/orders"
                                    className="block px-4 py-3 text-gray-700 hover:bg-pink-50 hover:text-nykaa-primary transition-all duration-200 rounded-lg mx-2"
                                >
                                    Orders
                                </Link>
                                <button
                                    onClick={logout}
                                    className="block cursor-pointer w-full text-left px-4 py-3 text-gray-700 hover:bg-pink-50 hover:text-nykaa-primary transition-all duration-200 rounded-lg mx-2"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}
                {!user.value && (
                    <Link href={"/login"}>
                        <button className="mx-2 flex cursor-pointer items-center space-x-1 bg-nykaa-primary text-white px-4 py-2 rounded-full hover:bg-nykaa-primary-dark transition-all duration-300 transform hover:scale-105 font-medium">
                            <MdAccountCircle className="text-lg" />
                            <span className="hidden md:block">Login</span>
                        </button>
                    </Link>
                )}

                {!isCheckoutPage && (
                    <div className="relative">
                        <button
                            onClick={toggleCart}
                            className="text-2xl cursor-pointer flex items-center space-x-1 text-gray-700 hover:text-nykaa-primary transition-all duration-300 transform hover:scale-110 relative"
                        >
                            <AiOutlineShoppingCart />
                            {Object.keys(cart).length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-nykaa-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">
                                    {Object.keys(cart).length}
                                </span>
                            )}
                        </button>
                    </div>
                )}
            </div>
            {!isCheckoutPage && (
                <div
                    ref={ref}
                    className={`fixed top-0 border-l border-pink-200 overflow-y-scroll right-0 z-50 bg-white/95 backdrop-blur-md h-[100vh] px-8 py-8 w-80 transition-transform transform shadow-2xl ${
                        Object.keys(cart).length == 0
                            ? "translate-x-full"
                            : "translate-x-0"
                    }`}
                >
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="font-bold text-2xl text-gray-800 flex items-center">
                            <AiOutlineShoppingCart className="mr-2 text-nykaa-primary" />
                            Shopping Cart
                        </h2>
                        <button
                            onClick={toggleCart}
                            className="text-gray-500 cursor-pointer hover:text-nykaa-primary text-2xl transition-all duration-300 hover:rotate-90 transform"
                        >
                            <FaWindowClose />
                        </button>
                    </div>
                    <div className="space-y-4">
                        {Object.keys(cart).length == 0 && (
                            <div className="my-8 text-center py-8">
                                <div className="text-6xl text-gray-300 mb-4">
                                    <AiOutlineShoppingCart className="mx-auto" />
                                </div>
                                <p className="text-gray-500 font-medium mb-2">
                                    Your cart is empty!
                                </p>
                                <p className="text-sm text-gray-400">
                                    Add some beautiful items to get started
                                </p>
                            </div>
                        )}
                        {Object.keys(cart).map((k) => {
                            return (
                                <div key={k} className="nykaa-card p-4 mb-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-800 text-sm mb-1">
                                                {cart[k].name}
                                                {cart[k].category !== "mug" &&
                                                    cart[k].category !==
                                                        "sticker" && (
                                                        <span className="text-gray-500 ml-1">
                                                            ({cart[k].size})
                                                        </span>
                                                    )}
                                            </h4>
                                            <p className="text-nykaa-primary font-bold text-sm">
                                                ₹{cart[k].price}
                                            </p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() =>
                                                    removeFromCart(
                                                        k,
                                                        1,
                                                        cart[k].price,
                                                        cart[k].name,
                                                        cart[k].size,
                                                        cart[k].color
                                                    )
                                                }
                                                className="p-1 cursor-pointer rounded-full hover:bg-pink-100 text-nykaa-primary transition-all duration-200"
                                            >
                                                <FaMinusSquare />
                                            </button>
                                            <span className="font-semibold text-gray-700 px-2">
                                                {cart[k].qty}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    addToCart(
                                                        k,
                                                        1,
                                                        cart[k].price,
                                                        cart[k].name,
                                                        cart[k].size,
                                                        cart[k].color
                                                    )
                                                }
                                                className="p-1 cursor-pointer rounded-full hover:bg-pink-100 text-nykaa-primary transition-all duration-200"
                                            >
                                                <FaPlusSquare />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {Object.keys(cart).length > 0 && (
                        <div className="border-t border-pink-200 pt-6 mt-6">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-lg font-semibold text-gray-800">
                                    Subtotal:
                                </span>
                                <span className="text-xl font-bold text-nykaa-primary">
                                    ₹{subTotal}
                                </span>
                            </div>
                            <div className="space-y-3">
                                <button
                                    onClick={handleCheckout}
                                    className="w-full cursor-pointer btn-nykaa flex items-center justify-center py-3 text-lg font-semibold"
                                >
                                    <IoBagHandle className="mr-2" />
                                    Checkout Now
                                </button>
                                <button
                                    onClick={clearCart}
                                    className="w-full bg-gray-100 cursor-pointer text-gray-700 py-3 px-4 rounded-full font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center"
                                >
                                    <MdDeleteForever className="mr-2 text-lg" />
                                    Clear Cart
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Navbar;
