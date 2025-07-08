import React from "react";
import Link from "next/link";
import Product from "../models/Product";
import mongoose from "mongoose";

const Tshirts = ({ products }) => {
    return (
        <div>
            <section className="text-gray-600 body-font">
                <div className="container px-30 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4 justify-center">
                        {products.map((product) => (
                            <Link
                                href={`/product/${product.slug}`}
                                legacyBehavior
                                key={product._id}
                            >
                                <a className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer shadow-lg mb-10">
                                    <div>
                                        <div className="block relative h-48 rounded overflow-hidden">
                                            <img
                                                alt="ecommerce"
                                                className="m-auto md:m-0 object-cover object-center w-full h-full block"
                                                src={product.img}
                                            />
                                        </div>
                                        <div className="mt-4 text-center">
                                            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                                                T-Shirt
                                            </h3>
                                            <h2 className="text-gray-900 title-font text-lg font-medium">
                                                {product.title}
                                            </h2>
                                            <p className="mt-1">
                                                ₹{product.price}
                                            </p>
                                            <p className="mt-1">S,M,L,XL</p>
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        ))}
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
    return {
        props: { products: JSON.parse(JSON.stringify(products)) },
    };
}

export default Tshirts;
