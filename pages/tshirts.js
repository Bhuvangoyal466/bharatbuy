import React from "react";
import Link from "next/link";
import Product from "../models/Product";
import mongoose from "mongoose";

const Tshirts = ({ products }) => {
    return (
        <div>
            <section className="text-gray-600 body-font">
                <div className="container md:px-30 px-15 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4 justify-center">
                        {Object.keys(products).map((product) => {
                            const isOutOfStock =
                                products[product].availableQty === 0 ||
                                !products[product].size ||
                                products[product].size.length === 0;

                            if (isOutOfStock) {
                                return (
                                    <div
                                        key={products[product]._id}
                                        className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-not-allowed shadow-lg mb-10 opacity-80"
                                    >
                                        <div>
                                            <div className="block relative h-48 rounded overflow-hidden">
                                                <img
                                                    alt="ecommerce"
                                                    className="m-auto md:m-0 object-cover object-center w-full h-full block"
                                                    src={products[product].img}
                                                />
                                                <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
                                                    <span className="text-white font-bold text-lg bg-red-600 px-3 py-1 rounded">
                                                        OUT OF STOCK
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mt-4 text-center">
                                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                                                    T-Shirt
                                                </h3>
                                                <h2 className="text-gray-900 title-font text-lg font-medium">
                                                    {products[product].title}
                                                </h2>
                                                <div className="flex items-center justify-center mt-1">
                                                    <p className="text-gray-900 font-medium">
                                                        ₹
                                                        {
                                                            products[product]
                                                                .price
                                                        }
                                                    </p>
                                                    <span className="ml-2 text-red-600 font-semibold text-sm bg-red-100 px-2 py-1 rounded-full">
                                                        Out of Stock
                                                    </span>
                                                </div>
                                                <div className="mt-4">
                                                    {products[product].size &&
                                                        Array.isArray(
                                                            products[product]
                                                                .size
                                                        ) &&
                                                        products[
                                                            product
                                                        ].size.map((size) => (
                                                            <span
                                                                key={size}
                                                                className="border border-gray-500 px-2 mx-1 rounded-lg"
                                                            >
                                                                {size}
                                                            </span>
                                                        ))}
                                                </div>
                                                <div className="mt-4">
                                                    {products[product].color &&
                                                        Array.isArray(
                                                            products[product]
                                                                .color
                                                        ) &&
                                                        products[
                                                            product
                                                        ].color.map((color) => (
                                                            <button
                                                                key={color}
                                                                className="border-1 border-black ml-1 rounded-full w-6 h-6 focus:outline-none"
                                                                style={{
                                                                    backgroundColor:
                                                                        color,
                                                                }}
                                                            ></button>
                                                        ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <Link
                                    href={`/product/${products[product].slug}`}
                                    legacyBehavior
                                    key={products[product]._id}
                                >
                                    <a className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer shadow-lg mb-10 hover:shadow-xl transition-shadow">
                                        <div>
                                            <div className="block relative h-48 rounded overflow-hidden">
                                                <img
                                                    alt="ecommerce"
                                                    className="m-auto md:m-0 object-cover object-center w-full h-full block"
                                                    src={products[product].img}
                                                />
                                            </div>
                                            <div className="mt-4 text-center">
                                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                                                    T-Shirt
                                                </h3>
                                                <h2 className="text-gray-900 title-font text-lg font-medium">
                                                    {products[product].title}
                                                </h2>
                                                <div className="flex items-center justify-center mt-1">
                                                    <p className="text-gray-900 font-medium">
                                                        ₹
                                                        {
                                                            products[product]
                                                                .price
                                                        }
                                                    </p>
                                                </div>
                                                <div className="mt-4">
                                                    {products[product].size &&
                                                        Array.isArray(
                                                            products[product]
                                                                .size
                                                        ) &&
                                                        products[
                                                            product
                                                        ].size.map((size) => (
                                                            <span
                                                                key={size}
                                                                className="border border-gray-500 px-2 mx-1 rounded-lg"
                                                            >
                                                                {size}
                                                            </span>
                                                        ))}
                                                </div>
                                                <div className="mt-4">
                                                    {products[product].color &&
                                                        Array.isArray(
                                                            products[product]
                                                                .color
                                                        ) &&
                                                        products[
                                                            product
                                                        ].color.map((color) => (
                                                            <button
                                                                key={color}
                                                                className="border-1 border-black ml-1 rounded-full w-6 h-6 focus:outline-none"
                                                                style={{
                                                                    backgroundColor:
                                                                        color,
                                                                }}
                                                            ></button>
                                                        ))}
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export async function getServerSideProps() {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI);
    }
    let products = await Product.find({ category: "tshirt" });
    let tshirts = {};
    for (let item of products) {
        if (item.title in tshirts) {
            if (item.color && Array.isArray(item.color)) {
                item.color.forEach((color) => {
                    if (
                        !tshirts[item.title].color.includes(color) &&
                        item.availableQty > 0
                    ) {
                        tshirts[item.title].color.push(color);
                    }
                });
            }
            if (item.size && Array.isArray(item.size)) {
                item.size.forEach((size) => {
                    if (
                        !tshirts[item.title].size.includes(size) &&
                        item.availableQty > 0
                    ) {
                        tshirts[item.title].size.push(size);
                    }
                });
            }
        } else {
            tshirts[item.title] = JSON.parse(JSON.stringify(item));
            if (item.availableQty > 0) {
                tshirts[item.title].color = Array.isArray(item.color)
                    ? [...item.color]
                    : [item.color];
                tshirts[item.title].size = Array.isArray(item.size)
                    ? [...item.size]
                    : [item.size];
            } else {
                tshirts[item.title].color = [];
                tshirts[item.title].size = [];
            }
        }
    }
    return {
        props: { products: JSON.parse(JSON.stringify(tshirts)) },
    };
}

export default Tshirts;
