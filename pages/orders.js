import React from "react";
import mongoose from "mongoose";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Order from "../models/Order";

const Orders = () => {
    const router = useRouter();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            router.push("/");
        }
    }, []);
    return (
        <div className="px-30">
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">
                        <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
                            My Orders
                        </h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                            Here you can view and manage your orders.
                        </p>
                    </div>
                    <div className="lg:w-2/3 w-full mx-auto overflow-auto">
                        <table className="table-auto w-full text-left whitespace-no-wrap">
                            <thead>
                                <tr>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                                        Plan
                                    </th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                                        Speed
                                    </th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                                        Storage
                                    </th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                                        Price
                                    </th>
                                    <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="px-4 py-3">Start</td>
                                    <td className="px-4 py-3">5 Mb/s</td>
                                    <td className="px-4 py-3">15 GB</td>
                                    <td className="px-4 py-3 text-lg text-gray-900">
                                        Free
                                    </td>
                                    <td className="w-10 text-center">
                                        <input name="plan" type="radio" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-t-2 border-gray-200 px-4 py-3">
                                        Pro
                                    </td>
                                    <td className="border-t-2 border-gray-200 px-4 py-3">
                                        25 Mb/s
                                    </td>
                                    <td className="border-t-2 border-gray-200 px-4 py-3">
                                        25 GB
                                    </td>
                                    <td className="border-t-2 border-gray-200 px-4 py-3 text-lg text-gray-900">
                                        $24
                                    </td>
                                    <td className="border-t-2 border-gray-200 w-10 text-center">
                                        <input name="plan" type="radio" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-t-2 border-gray-200 px-4 py-3">
                                        Business
                                    </td>
                                    <td className="border-t-2 border-gray-200 px-4 py-3">
                                        36 Mb/s
                                    </td>
                                    <td className="border-t-2 border-gray-200 px-4 py-3">
                                        40 GB
                                    </td>
                                    <td className="border-t-2 border-gray-200 px-4 py-3 text-lg text-gray-900">
                                        $50
                                    </td>
                                    <td className="border-t-2 border-gray-200 w-10 text-center">
                                        <input name="plan" type="radio" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                                        Exclusive
                                    </td>
                                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                                        48 Mb/s
                                    </td>
                                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">
                                        120 GB
                                    </td>
                                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-lg text-gray-900">
                                        $72
                                    </td>
                                    <td className="border-t-2 border-b-2 border-gray-200 w-10 text-center">
                                        <input name="plan" type="radio" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
};

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI);
    }
    let orders = await Order.find();

    return {
        props: {
            orders: orders,
        },
    };
}

export default Orders;
