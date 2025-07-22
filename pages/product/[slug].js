import React, { useState } from "react";
import { useRouter } from "next/router";
import mongoose from "mongoose";
import Product from "../../models/Product";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = ({ addToCart, buyNow, product, variants, error }) => {
    const router = useRouter();
    const { slug } = router.query;
    const [pin, setPin] = useState("");
    const [service, setService] = useState("");

    // Initialize state with available options
    const [color, setColor] = useState(
        product &&
            product.color &&
            Array.isArray(product.color) &&
            product.color.length > 0
            ? product.color[0]
            : ""
    );
    const [size, setSize] = useState(
        product &&
            product.size &&
            Array.isArray(product.size) &&
            product.size.length > 0
            ? product.size[0]
            : ""
    );

    const checkServiceability = async () => {
        let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
        let pinJson = await pins.json();
        if (Object.keys(pinJson).includes(pin)) {
            setService(true);
            toast.success("Your Pincode is serviceable!", {
                position: "top-left",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            setService(false);
            toast.error("Sorry! We do not service this area yet", {
                position: "top-left",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const onChangePin = (e) => {
        setPin(e.target.value);
    };

    if (error) {
        return <div>Product not found</div>;
    }

    return (
        <>
            <section className="text-gray-600 body-font overflow-hidden min-h-screen bg-gradient-to-br from-pink-50 to-white">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <img
                            alt={product.title}
                            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded-2xl shadow-2xl"
                            src={product.img}
                        />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest uppercase font-medium mb-2">
                                {product.category}
                            </h2>
                            <h1 className="text-gray-900 text-3xl title-font font-bold mb-4 leading-tight">
                                {product.title}
                            </h1>
                            <div className="flex mb-4 items-center">
                                <span className="flex items-center">
                                    {[...Array(5)].map((star, index) => (
                                        <svg
                                            key={index}
                                            fill="currentColor"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="w-4 h-4 text-nykaa-primary"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                    ))}
                                    <span className="text-gray-600 ml-3 font-medium">
                                        4.5 (24 Reviews)
                                    </span>
                                </span>
                                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-3">
                                    <a
                                        href="#"
                                        className="text-gray-500 hover:text-nykaa-primary transition-colors"
                                    >
                                        <svg
                                            fill="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="w-5 h-5"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                        </svg>
                                    </a>
                                    <a
                                        href="#"
                                        className="text-gray-500 hover:text-nykaa-primary transition-colors"
                                    >
                                        <svg
                                            fill="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="w-5 h-5"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                        </svg>
                                    </a>
                                    <a
                                        href="#"
                                        className="text-gray-500 hover:text-nykaa-primary transition-colors"
                                    >
                                        <svg
                                            fill="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="w-5 h-5"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                        </svg>
                                    </a>
                                </span>
                            </div>
                            <p className="leading-relaxed text-gray-700 mb-6 text-lg">
                                {product.desc}
                            </p>
                            {product.category !== "mug" &&
                                product.category !== "sticker" && (
                                    <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                                        <div className="flex items-center">
                                            <span className="mr-4 font-medium text-gray-700">
                                                Color
                                            </span>
                                            <div className="flex space-x-2">
                                                {product.color &&
                                                    Array.isArray(
                                                        product.color
                                                    ) &&
                                                    product.color.map(
                                                        (colorOption) => (
                                                            <button
                                                                key={
                                                                    colorOption
                                                                }
                                                                onClick={() =>
                                                                    setColor(
                                                                        colorOption
                                                                    )
                                                                }
                                                                className={`border-2 
                                                                    cursor-pointer rounded-full w-8 h-8 focus:outline-none transition-all hover:scale-110 ${
                                                                        color ===
                                                                        colorOption
                                                                            ? "ring-2 ring-nykaa-primary ring-opacity-30"
                                                                            : "border-gray-600"
                                                                    }`}
                                                                style={{
                                                                    backgroundColor:
                                                                        colorOption,
                                                                }}
                                                                title={
                                                                    colorOption
                                                                }
                                                            ></button>
                                                        )
                                                    )}
                                            </div>
                                        </div>
                                        <div className="flex ml-8 items-center">
                                            <span className="mr-4 font-medium text-gray-700">
                                                Size
                                            </span>
                                            <div className="relative">
                                                <select
                                                    value={size}
                                                    onChange={(e) =>
                                                        setSize(e.target.value)
                                                    }
                                                    className="nykaa-input rounded-lg border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-nykaa-primary focus:border-nykaa-primary text-base pl-3 pr-10 bg-white"
                                                >
                                                    {product.size &&
                                                        Array.isArray(
                                                            product.size
                                                        ) &&
                                                        product.size.map(
                                                            (sizeOption) => (
                                                                <option
                                                                    key={
                                                                        sizeOption
                                                                    }
                                                                    value={
                                                                        sizeOption
                                                                    }
                                                                >
                                                                    {sizeOption}
                                                                </option>
                                                            )
                                                        )}
                                                </select>
                                                <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                                    <svg
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        className="w-4 h-4"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M6 9l6 6 6-6"></path>
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            <div className="flex items-center justify-between">
                                <span className="title-font font-bold text-3xl text-gray-900">
                                    ₹{product.price}
                                </span>
                                <div className="flex space-x-3">
                                    <button
                                        onClick={() => {
                                            const uniqueKey = `${product.slug}-${size}-${color}`;
                                            buyNow(
                                                uniqueKey,
                                                1,
                                                product.price,
                                                product.title,
                                                size,
                                                color
                                            );
                                        }}
                                        className="btn-nykaa px-8 py-3 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                    >
                                        Buy Now
                                    </button>
                                    <button
                                        onClick={() => {
                                            const uniqueKey = `${product.slug}-${size}-${color}`;
                                            addToCart(
                                                uniqueKey,
                                                1,
                                                product.price,
                                                product.title,
                                                size,
                                                color
                                            );
                                        }}
                                        className="btn-nykaa-outline px-8 py-3 border-2 border-nykaa-primary text-nykaa-primary font-semibold rounded-lg hover:bg-nykaa-primary hover:text-white transition-all duration-300"
                                    >
                                        Add to Cart
                                    </button>
                                    <button className="rounded-full w-12 h-12 bg-gray-100 hover:bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 hover:text-nykaa-primary ml-4 transition-all duration-300">
                                        <svg
                                            fill="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="w-5 h-5"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="mt-8 p-4 bg-pink-50 rounded-lg border border-pink-100">
                                <h3 className="font-semibold text-gray-900 mb-3">
                                    Check Delivery
                                </h3>
                                <div className="flex space-x-3">
                                    <input
                                        type="text"
                                        placeholder="Enter your pincode"
                                        value={pin}
                                        onChange={onChangePin}
                                        className="flex-1 nykaa-input border-2 border-nykaa-primary rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-nykaa-primary focus:border-transparent"
                                    />
                                    <button
                                        onClick={checkServiceability}
                                        className="btn-nykaa px-6 py-2 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                                    >
                                        Check
                                    </button>
                                </div>
                                {service !== "" && (
                                    <div className="mt-3">
                                        {service ? (
                                            <p className="text-green-600 font-medium flex items-center">
                                                <svg
                                                    className="w-5 h-5 mr-2"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                Delivery available in your area
                                            </p>
                                        ) : (
                                            <p className="text-red-600 font-medium flex items-center">
                                                <svg
                                                    className="w-5 h-5 mr-2"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                Sorry, we don't deliver to this
                                                pincode yet
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ToastContainer />
        </>
    );
};

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI);
    }

    let product = await Product.findOne({ slug: context.query.slug });

    if (!product) {
        return {
            props: {
                error: 404,
            },
        };
    }

    let variants = {};
    let products = await Product.find({
        title: product.title,
        category: product.category,
    });

    for (let item of products) {
        if (Object.keys(variants).includes(item.color)) {
            variants[item.color][item.size] = { slug: item.slug };
        } else {
            variants[item.color] = {};
            variants[item.color][item.size] = { slug: item.slug };
        }
    }

    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
            variants: JSON.parse(JSON.stringify(variants)),
        },
    };
}

export default ProductDetails;
