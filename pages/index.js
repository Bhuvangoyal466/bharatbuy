import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
    return (
        <>
            <Head>
                <title>BharatBuy.com - India's own shopping destination</title>
                <meta
                    name="description"
                    content="BharatBuy.com - India's own shopping destination. Discover premium quality products and support local artisans."
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>

            {/* Hero Section with Modern Design */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-purple-50"></div>
                <div className="relative bg-gradient-to-r from-gray-900 to-gray-700 flex items-center justify-start pl-8 md:pl-16 py-20 md:py-32">
                    <div className="text-white max-w-lg fade-in-up">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                            Style.
                            <span className="text-nykaa-primary">
                                Redefined.
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl mb-6 drop-shadow-md">
                            Discover India's finest collection
                        </p>
                        <Link href="/tshirts">
                            <button className="btn-nykaa cursor-pointer text-lg px-8 py-4">
                                Explore Collection
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            <section className="text-gray-600 body-font py-20">
                <div className="container px-5 mx-auto">
                    <div className="flex flex-wrap w-full mb-16 flex-col items-center text-center">
                        <h1 className="text-4xl md:text-5xl font-bold title-font mb-6 text-gray-900 fade-in-up">
                            India's Own
                            <span className="text-nykaa-primary block md:inline md:ml-3">
                                Shopping Destination
                            </span>
                        </h1>
                        <div className="w-20 h-1 bg-nykaa-primary rounded-full mb-6"></div>
                        <p className="lg:w-2/3 w-full leading-relaxed text-gray-600 text-lg mb-4">
                            Discover the beauty of local craftsmanship and
                            support small businesses across India. Our curated
                            collection celebrates the artistry and tradition
                            that makes Indian products truly special.
                        </p>
                        <p className="lg:w-2/3 w-full leading-relaxed text-gray-600 text-lg">
                            From handcrafted apparel to unique accessories,
                            every product tells a story of passion, heritage,
                            and exceptional quality.
                        </p>
                    </div>

                    {/* Feature Cards */}
                    <div className="flex flex-wrap -m-4 justify-center">
                        <div className="xl:w-1/3 md:w-1/2 p-4">
                            <div className="nykaa-card p-8 text-center h-full">
                                <div className="w-16 h-16 mx-auto mb-6 nykaa-gradient rounded-full flex items-center justify-center text-white text-2xl">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="w-8 h-8"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                    </svg>
                                </div>
                                <h2 className="text-2xl text-gray-900 font-bold title-font mb-4">
                                    Premium Quality
                                </h2>
                                <p className="leading-relaxed text-gray-600">
                                    Every product in our collection is carefully
                                    selected and quality-tested to ensure you
                                    receive only the finest items that represent
                                    the best of Indian craftsmanship.
                                </p>
                            </div>
                        </div>
                        <div className="xl:w-1/3 md:w-1/2 p-4">
                            <div className="nykaa-card p-8 text-center h-full">
                                <div className="w-16 h-16 mx-auto mb-6 nykaa-gradient rounded-full flex items-center justify-center text-white text-2xl">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="w-8 h-8"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle cx="6" cy="6" r="3"></circle>
                                        <circle cx="6" cy="18" r="3"></circle>
                                        <path d="m20 4-8.58 8.58a1 1 0 0 0 0 1.41L20 22"></path>
                                    </svg>
                                </div>
                                <h2 className="text-2xl text-gray-900 font-bold title-font mb-4">
                                    Fast Delivery
                                </h2>
                                <p className="leading-relaxed text-gray-600">
                                    Swift and secure delivery across India
                                    ensures your favorite products reach you
                                    quickly, so you can enjoy your shopping
                                    experience without any delays.
                                </p>
                            </div>
                        </div>
                        <div className="xl:w-1/3 md:w-1/2 p-4">
                            <div className="nykaa-card p-8 text-center h-full">
                                <div className="w-16 h-16 mx-auto mb-6 nykaa-gradient rounded-full flex items-center justify-center text-white text-2xl">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="w-8 h-8"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                </div>
                                <h2 className="text-2xl text-gray-900 font-bold title-font mb-4">
                                    Support Local
                                </h2>
                                <p className="leading-relaxed text-gray-600">
                                    By choosing BharatBuy, you directly support
                                    local artisans and small businesses, helping
                                    preserve traditional crafts and empowering
                                    communities across India.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="text-center mt-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            Ready to Explore?
                        </h2>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/tshirts">
                                <button className="btn-nykaa cursor-pointer">
                                    Shop T-Shirts
                                </button>
                            </Link>
                            <Link href="/hoodies">
                                <button className="bg-white cursor-pointer border-2 border-nykaa-primary text-nykaa-primary px-6 py-3 rounded-full font-semibold hover:bg-nykaa-primary hover:text-white transition-all duration-300">
                                    Browse Hoodies
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
