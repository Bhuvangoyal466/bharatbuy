import React from "react";
import Link from "next/link";

const InfiniteCarousel = () => {
    const items = [
        { href: "/tshirts", img: "/tshirt.png", alt: "T-Shirt" },
        { href: "/hoodies", img: "/hoodie.png", alt: "Hoodie" },
        { href: "/mugs", img: "/mug.png", alt: "Mug" },
        { href: "/stickers", img: "/sticker.png", alt: "Sticker" },
    ];

    const repeatedItems = [...items, ...items, ...items, ...items, ...items];

    return (
        <div className="bg-gray-200 overflow-hidden w-full max-w-screen-xl mx-auto mt-10 rounded-lg">
            <div className="flex items-center animate-slide whitespace-nowrap">
                {repeatedItems.map((item, index) => (
                    <Link
                        href={item.href}
                        key={index}
                        className="flex-shrink-0 w-1/4 px-2"
                    >
                        <img
                            src={item.img}
                            alt={item.alt}
                            className="rounded-box w-full h-auto object-contain"
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default InfiniteCarousel;
