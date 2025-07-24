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
                                        className="bi bi-instagram"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
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
