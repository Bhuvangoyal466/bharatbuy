import React from "react";
import Link from "next/link";
import Product from "../models/Product";
import mongoose from "mongoose";

const Mugs = ({ products }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    {/* Page Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Premium
                            <span className="text-nykaa-primary ml-3">
                                Mugs
                            </span>
                        </h1>
                        <div className="w-24 h-1 bg-nykaa-primary rounded-full mx-auto mb-6"></div>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Sip in style with our premium mugs collection!
                            Perfect for coffee, tea, and gifting.
                        </p>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
                        {Object.keys(products).map((product) => {
                            const isOutOfStock =
                                products[product].availableQty === 0;

                            if (isOutOfStock) {
                                return (
                                    <div
                                        key={products[product]._id}
                                        className="w-full max-w-sm relative group"
                                    >
                                        <div className="nykaa-card overflow-hidden opacity-60 cursor-not-allowed">
                                            <div className="relative aspect-square overflow-hidden">
                                                <img
                                                    alt="ecommerce"
                                                    className="w-full h-full object-cover object-center transition-transform duration-500"
                                                    src={products[product].img}
                                                />
                                                <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center">
                                                    <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                                                        OUT OF STOCK
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-6">
                                                <h3 className="text-gray-500 text-sm tracking-wider mb-2 uppercase">
                                                    Mug
                                                </h3>
                                                <h2 className="text-gray-900 title-font text-lg font-semibold mb-3">
                                                    {products[product].title}
                                                </h2>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-gray-900 font-bold text-xl">
                                                        ₹
                                                        {
                                                            products[product]
                                                                .price
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <div
                                    key={products[product]._id}
                                    className="w-full max-w-sm relative group"
                                >
                                    <Link
                                        href={`/product/${products[product].slug}`}
                                    >
                                        <div className="nykaa-card overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105">
                                            <div className="relative aspect-square overflow-hidden">
                                                <img
                                                    alt="ecommerce"
                                                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                                                    src={products[product].img}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                                {/* Wishlist Heart */}
                                                <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-nykaa-primary hover:text-white cursor-pointer">
                                                    <svg
                                                        className="w-5 h-5"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>

                                            <div className="p-6">
                                                <h3 className="text-nykaa-primary text-sm tracking-wider mb-2 uppercase font-medium">
                                                    Mug
                                                </h3>
                                                <h2 className="text-gray-900 title-font text-lg font-semibold mb-3 line-clamp-2">
                                                    {products[product].title}
                                                </h2>

                                                <div className="flex items-center justify-between mb-4">
                                                    <p className="text-gray-900 font-bold text-xl">
                                                        ₹
                                                        {
                                                            products[product]
                                                                .price
                                                        }
                                                    </p>
                                                    <div className="flex items-center space-x-1">
                                                        {[...Array(5)].map(
                                                            (_, i) => (
                                                                <svg
                                                                    key={i}
                                                                    className="w-4 h-4 text-yellow-400"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 20 20"
                                                                >
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                            )
                                                        )}
                                                        <span className="text-gray-500 text-sm ml-1">
                                                            (4.5)
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>

                    {/* Empty State */}
                    {Object.keys(products).length === 0 && (
                        <div className="text-center py-20">
                            <div className="text-6xl text-gray-300 mb-6">
                                ☕
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                No Mugs Available
                            </h2>
                            <p className="text-gray-600 mb-8">
                                We're working on bringing you amazing mugs.
                                Check back soon!
                            </p>
                            <Link href="/">
                                <button className="btn-nykaa">
                                    Continue Shopping
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export async function getServerSideProps() {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI);
    }
    let products = await Product.find({ category: "mug" });
    let Mugs = {};
    for (let item of products) {
        if (item.title in Mugs) {
            if (item.color && Array.isArray(item.color)) {
                item.color.forEach((color) => {
                    if (
                        !Mugs[item.title].color.includes(color) &&
                        item.availableQty > 0
                    ) {
                        Mugs[item.title].color.push(color);
                    }
                });
            }
            if (item.size && Array.isArray(item.size)) {
                item.size.forEach((size) => {
                    if (
                        !Mugs[item.title].size.includes(size) &&
                        item.availableQty > 0
                    ) {
                        Mugs[item.title].size.push(size);
                    }
                });
            }
        } else {
            Mugs[item.title] = JSON.parse(JSON.stringify(item));
            if (item.availableQty > 0) {
                Mugs[item.title].color = Array.isArray(item.color)
                    ? [...item.color]
                    : [item.color];
                Mugs[item.title].size = Array.isArray(item.size)
                    ? [...item.size]
                    : [item.size];
            } else {
                Mugs[item.title].color = [];
                Mugs[item.title].size = [];
            }
        }
    }
    return {
        props: { products: JSON.parse(JSON.stringify(Mugs)) },
    };
}

export default Mugs;
