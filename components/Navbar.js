import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaMinus, FaPlus, FaWindowClose } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { IoBagHandle } from "react-icons/io5";
import { useRef } from "react";

const Navbar = () => {
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
        <div className="flex flex-col md:flex-row md:justify-start  items-center py-2 shadow-md justify-center">
            <div className="logo mx-5">
                <Link href={"/"}>
                    <Image
                        src="/flogo.png"
                        alt="BharatBuy Logo"
                        height={225}
                        width={125}
                    />
                </Link>
            </div>
            <div className="nav">
                <ul className="flex items-center space-x-6 font-bold md:text-lg">
                    <Link href={"/tshirts"}>
                        <li>Tshirts</li>
                    </Link>
                    <Link href={"/hoodies"}>
                        <li>Hoodies</li>
                    </Link>
                    <Link href={"/stickers"}>
                        <li>Stickers</li>
                    </Link>
                    <Link href={"/mugs"}>
                        <li>Mugs</li>
                    </Link>
                </ul>
            </div>
            <div
                onClick={toggleCart}
                className="cursor-pointer cart absolute right-0 top-4 mx-5"
            >
                <AiOutlineShoppingCart className="text-xl md:text-3xl" />
            </div>
            <div
                ref={ref}
                className="w-72 h-full   sideCart absolute top-0 right-0 bg-[#f78787] px-10 py-10 transition-transform translate-x-full transform"
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
                    <li>
                        <div className="item flex my-5">
                            <div className="font-semibold w-2/3">
                                T Shirt - Allen Solly
                            </div>
                            <div className="flex font-semibold items-center justify-center w-1/3 text-md ">
                                <FaMinus className="mx-2 " />1
                                <FaPlus className="mx-2 " />
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="item flex my-5">
                            <div className="font-semibold w-2/3">
                                T Shirt - Allen Solly
                            </div>
                            <div className="flex font-semibold items-center justify-center w-1/3 text-md ">
                                <FaMinus className="mx-2 " />1
                                <FaPlus className="mx-2 " />
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="item flex my-5">
                            <div className="font-semibold w-2/3">
                                T Shirt - Allen Solly
                            </div>
                            <div className="flex font-semibold items-center justify-center w-1/3 text-md ">
                                <FaMinus className="mx-2 " />1
                                <FaPlus className="mx-2 " />
                            </div>
                        </div>
                    </li>
                </ol>
                <div className="flex flex-col items-center">
                    <button className="flex mr-2 items-center justify-center mt-16 cursor-pointer font-semibold bg-[#f05e5e] border-2 border-black py-2 px-8 focus:outline-none hover:bg-[#ff8080] rounded text-lg">
                        <IoBagHandle className="mx-1" />
                        Checkout
                    </button>
                    <button className="flex mr-2 items-center justify-center mt-4 cursor-pointer font-semibold bg-[#f05e5e] border-2 border-black py-2 px-8 focus:outline-none hover:bg-[#ff8080] rounded text-lg">
                        <MdDeleteForever className="mx-1 text-2xl" /> Clear All
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
