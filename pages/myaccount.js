import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const MyAccount = ({
    cart,
    user,
    clearCart,
    subTotal,
    addToCart,
    removeFromCart,
}) => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [pin, setPin] = useState("");
    const [userData, setUserData] = useState({});
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleChange = async (e) => {
        if (e.target.name === "name") {
            setName(e.target.value);
        } else if (e.target.name === "email") {
            setEmail(e.target.value);
        } else if (e.target.name === "address") {
            setAddress(e.target.value);
        } else if (e.target.name === "phone") {
            setPhone(e.target.value);
        } else if (e.target.name === "pin") {
            setPin(e.target.value);
        } else if (e.target.name === "password") {
            setPassword(e.target.value);
        } else if (e.target.name === "cpassword") {
            setCpassword(e.target.value);
        }

        // Update button disabled state
        setTimeout(() => {
            const updatedName =
                e.target.name === "name" ? e.target.value : name;
            const updatedAddress =
                e.target.name === "address" ? e.target.value : address;
            const updatedPhone =
                e.target.name === "phone" ? e.target.value : phone;
            const updatedPin = e.target.name === "pin" ? e.target.value : pin;
            const updatedEmail = email; // email doesn't change

            const isFormValid =
                updatedName &&
                updatedEmail &&
                updatedAddress &&
                updatedPhone &&
                updatedPin;
            setDisabled(!isFormValid);
        }, 100);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const myuser = localStorage.getItem("myuser");
            if (!myuser) {
                router.push("/login");
                return;
            }

            try {
                const parsedUser = JSON.parse(myuser);
                if (parsedUser && parsedUser.token) {
                    setUserData(parsedUser);

                    // Fetch user details from backend
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_HOST}/api/getuser`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                token: parsedUser.token,
                            }),
                        }
                    );

                    if (response.ok) {
                        const userData = await response.json();
                        setName(userData.name || "");
                        setEmail(userData.email || "");
                        setAddress(userData.address || "");
                        setPhone(userData.phone || "");
                        setPin(userData.pincode || "");
                    }
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                toast.error("Error loading user data");
                router.push("/login");
            }
        };

        fetchUserData();
    }, [router]);
    const handleUserSubmit = async () => {
        if (!name || !address || !phone || !pin) {
            toast.error("Please fill all required fields");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_HOST}/api/updateuser`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        token: userData.token,
                        name: name,
                        address: address,
                        phone: phone,
                        pincode: pin,
                    }),
                }
            );

            const result = await response.json();

            if (response.ok && result.success) {
                toast.success("Profile updated successfully!");
            } else {
                toast.error(result.error || "Failed to update profile");
            }
        } catch (error) {
            console.error("Error updating user:", error);
            toast.error("Error updating profile");
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordSubmit = async () => {
        if (!password || !cpassword) {
            toast.error("Please fill both password fields");
            return;
        }

        if (password !== cpassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        token: userData.token,
                        password: password,
                    }),
                }
            );

            const result = await response.json();

            if (response.ok && result.success) {
                toast.success("Password updated successfully!");
                setPassword("");
                setCpassword("");
            } else {
                toast.error(result.error || "Failed to update password");
            }
        } catch (error) {
            console.error("Error updating password:", error);
            toast.error("Error updating password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container px-7  md:px-40 m-auto">
            <h1 className="font-semibold text-3xl my-8 text-center">
                Update your Account
            </h1>
            <div className="mx-auto flex my-2">
                <div className=" w-1/2 px-5">
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="leading-7 text-sm text-gray-600"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={handleChange}
                            id="name"
                            name="name"
                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                </div>
                <div className=" w-1/2">
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="leading-7 text-sm text-gray-600"
                        >
                            Email (Cannot be updated)
                        </label>
                        <input
                            value={email}
                            onChange={handleChange}
                            type="email"
                            id="email"
                            name="email"
                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            readOnly
                        />
                    </div>
                </div>
            </div>
            <div className=" w-full my-2">
                <div className="mb-4 pl-5">
                    <label
                        htmlFor="address"
                        className="leading-7 text-sm text-gray-600"
                    >
                        {address ? "Address" : "Enter your address"}
                    </label>
                    <textarea
                        value={address}
                        onChange={handleChange}
                        name="address"
                        id="address"
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    ></textarea>
                </div>
            </div>
            <div className="mx-auto flex my-2">
                <div className=" w-1/2 px-5">
                    <div className="mb-4">
                        <label
                            htmlFor="phone"
                            className="leading-7 text-sm text-gray-600"
                        >
                            Phone
                        </label>
                        <input
                            value={phone}
                            onChange={handleChange}
                            type="number"
                            id="phone"
                            name="phone"
                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                </div>
                <div className=" w-1/2">
                    <div className="mb-4">
                        <label
                            htmlFor="pin"
                            className="leading-7 text-sm text-gray-600"
                        >
                            Pin Code
                        </label>
                        <input
                            value={pin}
                            onChange={handleChange}
                            type="text"
                            id="pin"
                            name="pin"
                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                </div>
            </div>
            <button
                onClick={handleUserSubmit}
                disabled={disabled || loading}
                className="flex disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 mr-2 items-center justify-center mt-6 rounded-lg cursor-pointer font-semibold bg-[#ff8080] border-2 border-black py-2 px-8 focus:outline-none hover:bg-[#f05e5e] text-lg ml-5"
            >
                {loading ? "Updating..." : "Confirm"}
            </button>
            <h2 className="font-semibold text-xl ml-5 mt-12">
                Change Password
            </h2>
            <div className="mx-auto flex my-2">
                <div className=" w-1/2 px-5">
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="leading-7 text-sm text-gray-600"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={handleChange}
                            id="password"
                            name="password"
                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                </div>
                <div className=" w-1/2">
                    <div className="mb-4">
                        <label
                            htmlFor="cpassword"
                            className="leading-7 text-sm text-gray-600"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            value={cpassword}
                            onChange={handleChange}
                            id="cpassword"
                            name="cpassword"
                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                </div>
            </div>
            <button
                onClick={handlePasswordSubmit}
                disabled={loading || !password || !cpassword}
                className="flex disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 mr-2 items-center justify-center mt-6 rounded-lg cursor-pointer font-semibold bg-[#ff8080] border-2 border-black py-2 px-8 focus:outline-none hover:bg-[#f05e5e] text-lg ml-5"
            >
                {loading ? "Updating..." : "Change Password"}
            </button>
        </div>
    );
};

export default MyAccount;
