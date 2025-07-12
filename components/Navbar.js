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

const Navbar = ({
    logout,
    user,
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    subTotal,
}) => {
    const [dropdown, setDropdown] = useState(false);

    const toggleCart = () => {
        if (ref.current.classList.contains("translate-x-full")) {
            ref.current.classList.remove("translate-x-full");
            ref.current.classList.add("translate-x-0");
        } else {
            ref.current.classList.add("translate-x-full");
            ref.current.classList.remove("translate-x-0");
        }
    };
    const ref = useRef();

    return (
        <div className="flex flex-col md:flex-row md:justify-start  items-center py-2 shadow-md justify-center sticky top-0 bg-white z-10">
            <div className="logo mr-auto lg:mr-0  md:mr-0 mx-5">
                <Link href={"/"}>
                    <Image
                        src="/flogo.png"
                        alt="BharatBuy Logo"
                        height={225}
                        width={125}
                    />
                </Link>
            </div>
            <div className="nav mt-4 lg:ml-10 lg:mt-0 md:mt-0">
                <ul className="flex items-center space-x-6 font-bold md:text-lg">
                    <Link href={"/tshirts"} className="hover:text-[#f05e5e]">
                        <li>Tshirts</li>
                    </Link>
                    <Link href={"/hoodies"} className="hover:text-[#f05e5e]">
                        <li>Hoodies</li>
                    </Link>
                    <Link href={"/stickers"} className="hover:text-[#f05e5e]">
                        <li>Stickers</li>
                    </Link>
                    <Link href={"/mugs"} className="hover:text-[#f05e5e]">
                        <li>Mugs</li>
                    </Link>
                </ul>
            </div>
            <div className="cursor-pointer items-center cart absolute right-0 top-4 mx-5 flex">
                {user.value && (
                    <div
                        className="relative"
                        onMouseEnter={() => setDropdown(true)}
                        onMouseLeave={() => setDropdown(false)}
                    >
                        <MdAccountCircle className="text-xl md:text-3xl mx-2" />
                        {dropdown && (
                            <div className="absolute right-0 w-40 top-8 rounded-md px-5 bg-blue-100 shadow-lg">
                                <ul>
                                    <Link href={"/myaccount"}>
                                        <li className="py-2 text-md hover:font-semibold cursor-pointer">
                                            My Account
                                        </li>
                                    </Link>
                                    <Link href={"/orders"}>
                                        <li className="py-2 text-md hover:font-semibold cursor-pointer">
                                            Orders
                                        </li>
                                    </Link>
                                    <Link onClick={logout} href={""}>
                                        <li className="py-2 text-md hover:font-semibold cursor-pointer">
                                            Logout
                                        </li>
                                    </Link>
                                </ul>
                            </div>
                        )}
                    </div>
                )}
                {!user.value && (
                    <Link href={"/login"}>
                        <button className="bg-[#f05e5e] cursor-pointer mr-4 text-white px-7 py-2 rounded-md">
                            Login
                        </button>
                    </Link>
                )}

                <AiOutlineShoppingCart
                    onClick={toggleCart}
                    className="text-xl md:text-3xl"
                />
            </div>
            <div
                ref={ref}
                className={`fixed top-0 border-l-2 overflow-y-scroll rounded-l-3xl right-0 z-50 bg-[#f78787] h-[100vh] px-10 py-10 w-72 transition-transform transform ${
                    Object.keys(cart).length == 0
                        ? "translate-x-full"
                        : "translate-x-0"
                }`}
            >
                <h2 className="font-bold mb-15 text-center text-xl">
                    Shopping Cart
                </h2>
                <span
                    onClick={toggleCart}
                    className="absolute top-5 right-5 text-xl cursor-pointer"
                >
                    <FaWindowClose />
                </span>
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
                                    <div className="font-semibold w-2/3">
                                        <div className="flex items-center">
                                            <span>
                                                {cart[k].name}({cart[k].size})
                                            </span>
                                        </div>
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
                                                    cart[k].color
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
                                                    cart[k].color
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
                <div className="font-bold my-2">Subtotal: ₹{subTotal}</div>
                <div className="flex flex-col items-center">
                    <Link href={"/checkout"}>
                        <button className="flex mr-2 items-center justify-center mt-16 cursor-pointer font-semibold bg-[#ff8080] border-2 border-black py-2 px-8 focus:outline-none hover:bg-[#f05e5e] rounded text-lg">
                            <IoBagHandle className="mx-1" />
                            Checkout
                        </button>
                    </Link>
                    <button
                        onClick={clearCart}
                        className="flex mr-2 items-center justify-center mt-4 cursor-pointer font-semibold bg-[#ff8080] border-2 border-black py-2 px-8 focus:outline-none hover:bg-[#f05e5e] rounded text-lg"
                    >
                        <MdDeleteForever className="mx-1 text-2xl" /> Clear Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
