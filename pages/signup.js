import React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast, Bounce } from "react-toastify";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const router = useRouter();
    const [password, setPassword] = useState("");

    const handleChange = (e) => {
        if (e.target.name === "name") {
            setName(e.target.value);
        } else if (e.target.name === "email") {
            setEmail(e.target.value);
        } else if (e.target.name === "password") {
            setPassword(e.target.value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { name, email, password };
        let res = await fetch("/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        let response = await res.json();
        setName("");
        setEmail("");
        setPassword("");
        toast.success("Sign up successful!", {
            position: "top-center",
            autoClose: 1700,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
        setTimeout(() => {
            router.push("/login");
        }, 1000);
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center p-6">
                <ToastContainer
                    position="top-center"
                    autoClose={1700}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Bounce}
                />
                <div className="w-full max-w-md">
                    {/* Logo and Header */}
                    <div className="text-center mb-8">
                        <img
                            className="mx-auto h-50 w-auto mb-6"
                            src="/logo2.png"
                            alt="BharatBuy"
                        />
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            Create Account
                        </h2>
                        <p className="text-gray-600 mb-20">
                            Sign up for a BharatBuy account
                        </p>
                    </div>

                    {/* Signup Form */}
                    <div className="nykaa-card p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    Name
                                </label>
                                <input
                                    value={name}
                                    onChange={handleChange}
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                    className="nykaa-input w-full"
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    Email Address
                                </label>
                                <input
                                    value={email}
                                    onChange={handleChange}
                                    type="email"
                                    name="email"
                                    id="email"
                                    autoComplete="email"
                                    required
                                    className="nykaa-input w-full"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    Password
                                </label>
                                <input
                                    value={password}
                                    onChange={handleChange}
                                    type="password"
                                    name="password"
                                    id="password"
                                    autoComplete="current-password"
                                    required
                                    className="nykaa-input w-full"
                                    placeholder="Enter your password"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full cursor-pointer btn-nykaa py-4 text-lg font-semibold"
                            >
                                Sign Up
                            </button>
                        </form>

                        {/* Sign In Link */}
                        <div className="mt-8 text-center">
                            <p className="text-gray-600">
                                Already a member?{" "}
                                <Link
                                    href="/login"
                                    className="font-semibold text-nykaa-primary hover:text-nykaa-primary-dark transition-colors duration-200"
                                >
                                    Log In
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
