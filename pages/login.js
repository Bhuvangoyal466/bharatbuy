import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ToastContainer, toast, Bounce } from "react-toastify";

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (e) => {
        if (e.target.name === "email") {
            setEmail(e.target.value);
        } else if (e.target.name === "password") {
            setPassword(e.target.value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { email, password };
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        let response = await res.json();
        setEmail("");
        setPassword("");
        if (response.success) {
            localStorage.setItem("token", response.token);
            toast.success("Log in succesfull!", {
                position: "bottom-left",
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
                router.push(`${process.env.NEXT_PUBLIC_HOST}`);
            }, 1000);
        } else {
            toast.error(response.error || "Login failed", {
                position: "bottom-left",
                autoClose: 1700,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    };
    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <ToastContainer
                    position="bottom-left"
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
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-40 w-auto"
                        src="/logo2.png"
                        alt="Your Company"
                    />
                    <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 md:px-10 px-15 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                        method="POST"
                    >
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    value={email}
                                    onChange={handleChange}
                                    type="email"
                                    name="email"
                                    id="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Password
                                </label>
                                <div className="text-sm">
                                    <Link legacyBehavior href={"/forgot"}>
                                        <a
                                            href="#"
                                            className="font-semibold text-red-600 hover:text-red-500"
                                        >
                                            Forgot password?
                                        </a>
                                    </Link>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    value={password}
                                    onChange={handleChange}
                                    type="password"
                                    name="password"
                                    id="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full cursor-pointer justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Not a member?
                        <Link legacyBehavior href={"/signup"}>
                            <a className="font-semibold text-red-600 hover:text-red-500">
                                {" "}
                                Sign up now
                            </a>
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;
