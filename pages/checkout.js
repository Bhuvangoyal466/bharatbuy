import React from "react";
import Link from "next/link";
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import { IoBagHandle } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";

const Checkout = ({ cart, clearCart, subTotal, addToCart, removeFromCart }) => {
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
                            id="name"
                            name="name"
                            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
                            type="email"
                            id="email"
                            name="email"
                            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
                        Address
                    </label>

                    <textarea
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
                            type="number"
                            id="phone"
                            name="phone"
                            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
                            type="text"
                            id="city"
                            name="city"
                            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
                            type="number"
                            id="pin"
                            name="pin"
                            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
                            type="text"
                            id="state"
                            name="state"
                            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
                                    <div className="font-semibold">
                                        {cart[k].name}
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
                <Link href={"/checkout"}>
                    <button
                        className="flex mr-2 items-center justify-center mt-6 
                    rounded-lg cursor-pointer font-semibold bg-[#ff8080] border-2 border-black py-2 px-8 focus:outline-none hover:bg-[#f05e5e] text-lg"
                    >
                        <IoBagHandle className="mx-1" />
                        Pay Now
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Checkout;
