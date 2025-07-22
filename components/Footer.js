import Link from "next/link";
import React from "react";
import Image from "next/image";

const Footer = () => {
    return (
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
            <footer className="text-gray-300 body-font">
                <div className="container px-5 py-16 mx-auto">
                    <div className="flex flex-wrap md:text-left text-center order-first">
                        {/* Brand Section */}
                        <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-8">
                            <Link
                                href={"/"}
                                className="flex title-font font-medium items-center md:justify-start justify-center text-white mb-4"
                            >
                                <Image
                                    src="/flogo.png"
                                    alt="Logo"
                                    width={150}
                                    height={60}
                                    className="filter brightness-110"
                                />
                            </Link>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                India's premier shopping destination for premium
                                quality products. Celebrating local artisans and
                                supporting small businesses across the nation.
                            </p>
                            <div className="flex mt-6 justify-center md:justify-start space-x-4">
                                <a className="text-gray-400 hover:text-nykaa-primary transition-colors duration-300 cursor-pointer">
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
                                <a className="text-gray-400 hover:text-nykaa-primary transition-colors duration-300 cursor-pointer">
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
                                <a className="text-gray-400 hover:text-nykaa-primary transition-colors duration-300 cursor-pointer">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="w-5 h-5"
                                        viewBox="0 0 24 24"
                                    >
                                        <rect
                                            width="20"
                                            height="20"
                                            x="2"
                                            y="2"
                                            rx="5"
                                            ry="5"
                                        ></rect>
                                        <path d="m16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Shop Links */}
                        <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-8">
                            <h2 className="title-font font-semibold text-white tracking-wider text-sm mb-4 uppercase">
                                Shop Categories
                            </h2>
                            <nav className="list-none space-y-3">
                                <li>
                                    <Link
                                        href={"/tshirts"}
                                        className="text-gray-400 hover:text-nykaa-primary transition-colors duration-300 hover:translate-x-1 transform inline-block"
                                    >
                                        Premium T-Shirts
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={"/hoodies"}
                                        className="text-gray-400 hover:text-nykaa-primary transition-colors duration-300 hover:translate-x-1 transform inline-block"
                                    >
                                        Cozy Hoodies
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={"/stickers"}
                                        className="text-gray-400 hover:text-nykaa-primary transition-colors duration-300 hover:translate-x-1 transform inline-block"
                                    >
                                        Creative Stickers
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={"/mugs"}
                                        className="text-gray-400 hover:text-nykaa-primary transition-colors duration-300 hover:translate-x-1 transform inline-block"
                                    >
                                        Designer Mugs
                                    </Link>
                                </li>
                            </nav>
                        </div>

                        {/* Customer Service */}
                        <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-8">
                            <h2 className="title-font font-semibold text-white tracking-wider text-sm mb-4 uppercase">
                                Customer Care
                            </h2>
                            <nav className="list-none space-y-3">
                                <li>
                                    <Link
                                        href={"/contact"}
                                        className="text-gray-400 hover:text-nykaa-primary transition-colors duration-300 hover:translate-x-1 transform inline-block"
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <a className="text-gray-400 hover:text-nykaa-primary transition-colors duration-300 hover:translate-x-1 transform inline-block cursor-pointer">
                                        24/7 Support
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-400 hover:text-nykaa-primary transition-colors duration-300 hover:translate-x-1 transform inline-block cursor-pointer">
                                        Size Guide
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-400 hover:text-nykaa-primary transition-colors duration-300 hover:translate-x-1 transform inline-block cursor-pointer">
                                        FAQ
                                    </a>
                                </li>
                            </nav>
                        </div>

                        {/* Policies */}
                        <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-8">
                            <h2 className="title-font font-semibold text-white tracking-wider text-sm mb-4 uppercase">
                                Legal & Policies
                            </h2>
                            <nav className="list-none space-y-3">
                                <li>
                                    <a className="text-gray-400 hover:text-nykaa-primary transition-colors duration-300 hover:translate-x-1 transform inline-block cursor-pointer">
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-400 hover:text-nykaa-primary transition-colors duration-300 hover:translate-x-1 transform inline-block cursor-pointer">
                                        Terms of Service
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-400 hover:text-nykaa-primary transition-colors duration-300 hover:translate-x-1 transform inline-block cursor-pointer">
                                        Return Policy
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-400 hover:text-nykaa-primary transition-colors duration-300 hover:translate-x-1 transform inline-block cursor-pointer">
                                        Shipping Info
                                    </a>
                                </li>
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="bg-gradient-to-r from-nykaa-primary to-nykaa-primary-dark">
                    <div className="container mx-auto py-8 px-5 flex flex-wrap flex-col sm:flex-row">
                        <div className="flex-grow flex flex-wrap justify-center sm:justify-between items-center">
                            <div className="text-center sm:text-left mb-4 sm:mb-0">
                                <h3 className="text-white font-bold text-lg mb-2">
                                    Stay Updated!
                                </h3>
                                <p className="text-pink-100 text-sm">
                                    Get the latest deals and new arrivals
                                    delivered to your inbox.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="px-4 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/50 min-w-[250px]"
                                />
                                <button className="bg-white cursor-pointer text-nykaa-primary px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="bg-gray-900">
                    <div className="container mx-auto py-6 px-5 flex flex-wrap flex-col sm:flex-row items-center justify-between">
                        <p className="text-gray-400 text-sm text-center sm:text-left">
                            © 2025 BharatBuy.com — Empowering Local, Celebrating
                            Indian Craftsmanship
                        </p>
                        <div className="flex space-x-6 mt-4 sm:mt-0">
                            <span className="text-gray-400 text-sm">
                                🇮🇳 Made in India
                            </span>
                            <span className="text-gray-400 text-sm">
                                ✨ Premium Quality
                            </span>
                            <span className="text-gray-400 text-sm">
                                🚚 Fast Delivery
                            </span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
