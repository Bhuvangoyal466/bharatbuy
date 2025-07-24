import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";
import { set } from "mongoose";

export default function App({ Component, pageProps }) {
    const [cart, setCart] = useState({});
    const [progress, setProgress] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [user, setUser] = useState({ value: null });
    const [key, setKey] = useState(0);
    const router = useRouter();

    useEffect(() => {
        router.events.on("routeChangeStart", () => {
            setProgress(40);
        });
        router.events.on("routeChangeComplete", () => {
            setProgress(100);
        });
        try {
            if (localStorage.getItem("cart")) {
                setCart(JSON.parse(localStorage.getItem("cart")));
                saveCart(JSON.parse(localStorage.getItem("cart")));
            }
        } catch (error) {
            console.error(error);
            localStorage.clear();
        }
        const myuser = JSON.parse(localStorage.getItem("myuser"));
        if (myuser) {
            setUser({ value: myuser.token, email: myuser.email });
        }
        setKey(Math.random());
    }, [router.query]);

    const saveCart = (myCart) => {
        localStorage.setItem("cart", JSON.stringify(myCart));
        let subt = 0;
        let keys = Object.keys(myCart);
        for (let i = 0; i < keys.length; i++) {
            subt += myCart[keys[i]].qty * myCart[keys[i]].price;
        }
        setSubTotal(subt);
    };

    const buyNow = (itemCode, qty, price, name, size, variant) => {
        // Check if user is logged in
        const myuser = localStorage.getItem("myuser");
        if (!myuser) {
            toast.error("Please login to buy products!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            router.push("/login");
            return;
        }

        let newCart = { itemCode: { qty: 1, price, name, size, variant } };
        setCart(newCart);
        saveCart(newCart);
        router.push("/checkout");
    };

    const clearCart = () => {
        setCart({});
        saveCart({});
    };

    const addToCart = (itemCode, qty, price, name, size, variant) => {
        // Check if user is logged in
        const myuser = localStorage.getItem("myuser");
        if (!myuser) {
            toast.error("Please login to add items to cart!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            router.push("/login");
            return;
        }

        let newCart = JSON.parse(JSON.stringify(cart)); // Create a deep copy
        if (itemCode in newCart) {
            newCart[itemCode].qty = newCart[itemCode].qty + qty;
        } else {
            newCart[itemCode] = { qty: 1, price, name, size, variant };
        }
        setCart(newCart);
        saveCart(newCart);

        toast.success("Item added to cart!", {
            position: "bottom-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const removeFromCart = (itemCode, qty, price, name, size, variant) => {
        let newCart = JSON.parse(JSON.stringify(cart)); // Create a deep copy
        if (itemCode in newCart) {
            newCart[itemCode].qty = newCart[itemCode].qty - qty;
        }
        if (newCart[itemCode]["qty"] <= 0) {
            delete newCart[itemCode];
        }
        setCart(newCart);
        saveCart(newCart);
    };
    const logout = () => {
        localStorage.removeItem("myuser");
        setUser({ value: null });
        setKey(Math.random());

        toast.success("Logged out successfully!", {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        // Add a small delay before redirecting to allow toast to show
        setTimeout(() => {
            router.push("/");
        }, 500);
    };

    return (
        <>
            <LoadingBar
                color="#f05e5e"
                progress={progress}
                waitingTime={400}
                onLoaderFinished={() => {
                    setProgress(0);
                }}
            />
            {key && (
                <Navbar
                    className="overflow-x-hidden"
                    logout={logout}
                    user={user}
                    key={key}
                    cart={cart}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                    clearCart={clearCart}
                    subTotal={subTotal}
                    router={router}
                />
            )}
            <Component
                user={user}
                buyNow={buyNow}
                cart={cart}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
                subTotal={subTotal}
                {...pageProps}
            />
            <Footer />
            <ToastContainer
                position="bottom-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}
