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
                                    <div className="flex  justify-center md:justify-start space-x-4">
                                        {/* LinkedIn */}
                                        <a
                                            href="https://www.linkedin.com/in/bhuvangoyal28/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-nykaa-primary transition-colors duration-300 cursor-pointer"
                                            aria-label="LinkedIn"
                                        >
                                            <svg
                                                className="w-5 h-5"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" />
                                            </svg>
                                        </a>
                                        {/* GitHub */}
                                        <a
                                            href="https://github.com/Bhuvangoyal466"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-nykaa-primary transition-colors duration-300 cursor-pointer"
                                            aria-label="GitHub"
                                        >
                                            <svg
                                                className="w-5 h-5"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.263.82-.582 0-.288-.01-1.05-.015-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.304-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.399 3-.404 1.02.005 2.04.137 3 .404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.803 5.625-5.475 5.922.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.699.825.58C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z" />
                                            </svg>
                                        </a>
                                        {/* Instagram */}
                                        <a
                                            href="https://www.instagram.com/bhuvangoyal28/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-nykaa-primary transition-colors duration-300 cursor-pointer"
                                            aria-label="Instagram"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-5 h-5"
                                                fill="currentColor"
                                                class="bi bi-instagram"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                                            </svg>
                                        </a>
                                    </div>
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
                                        className="btn-nykaa cursor-pointer px-8 py-3 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
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
                                        className="btn-nykaa-outline cursor-pointer px-8 py-3 border-2 border-nykaa-primary text-nykaa-primary font-semibold rounded-lg hover:bg-nykaa-primary hover:text-white transition-all duration-300"
                                    >
                                        Add to Cart
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
                                        className="btn-nykaa cursor-pointer px-6 py-2 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
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
