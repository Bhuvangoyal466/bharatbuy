import React from "react";
import Link from "next/link";
import Product from "../models/Product";
import mongoose from "mongoose";

const Mugs = ({ products }) => {
    return (
        <div>
            <section className="text-gray-600 body-font">
                <div className="container px-30 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4 justify-center">
                        {Object.keys(products).length === 0 && (
                            <p>
                                Sorry, All the Mugs are currently out of stock
                                !! Stay tuned for updates
                            </p>
                        )}
                        {Object.keys(products).map((product) => (
                            <Link
                                href={`/product/${products[product].slug}`}
                                legacyBehavior
                                key={products[product]._id}
                            >
                                <a className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer shadow-lg mb-10">
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
                                                Mug
                                            </h3>
                                            <h2 className="text-gray-900 title-font text-lg font-medium">
                                                {products[product].title}
                                            </h2>
                                            <p className="mt-1">
                                                ₹{products[product].price}
                                            </p>
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
