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
        <div className="min-h-screen bg-pink-50 py-10 flex flex-col items-center font-sans">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-pink-100">
                <h1 className="font-bold text-3xl md:text-4xl text-center text-[#e80071] mb-8 tracking-tight">
                    Update your Account
                </h1>
                <div className="flex flex-col md:flex-row gap-6 mb-4">
                    <div className="w-full md:w-1/2">
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={handleChange}
                            id="name"
                            name="name"
                            className="w-full bg-pink-50 rounded-lg border border-pink-200 focus:border-[#e80071] focus:ring-2 focus:ring-[#e80071]/20 text-base outline-none text-gray-700 py-2 px-4 transition-colors duration-200 ease-in-out shadow-sm"
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            Email (Cannot be updated)
                        </label>
                        <input
                            value={email}
                            onChange={handleChange}
                            type="email"
                            id="email"
                            name="email"
                            className="w-full bg-pink-50 rounded-lg border border-pink-200 text-base outline-none text-gray-400 py-2 px-4 shadow-sm cursor-not-allowed"
                            readOnly
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="address"
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >
                        {address ? "Address" : "Enter your address"}
                    </label>
                    <textarea
                        value={address}
                        onChange={handleChange}
                        name="address"
                        id="address"
                        className="w-full bg-pink-50 rounded-lg border border-pink-200 focus:border-[#e80071] focus:ring-2 focus:ring-[#e80071]/20 text-base outline-none text-gray-700 py-2 px-4 transition-colors duration-200 ease-in-out shadow-sm min-h-[80px]"
                    ></textarea>
                </div>
                <div className="flex flex-col md:flex-row gap-6 mb-4">
                    <div className="w-full md:w-1/2">
                        <label
                            htmlFor="phone"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            Phone
                        </label>
                        <input
                            value={phone}
                            onChange={handleChange}
                            type="number"
                            id="phone"
                            name="phone"
                            className="w-full bg-pink-50 rounded-lg border border-pink-200 focus:border-[#e80071] focus:ring-2 focus:ring-[#e80071]/20 text-base outline-none text-gray-700 py-2 px-4 transition-colors duration-200 ease-in-out shadow-sm"
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <label
                            htmlFor="pin"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            Pin Code
                        </label>
                        <input
                            value={pin}
                            onChange={handleChange}
                            type="text"
                            id="pin"
                            name="pin"
                            className="w-full bg-pink-50 rounded-lg border border-pink-200 focus:border-[#e80071] focus:ring-2 focus:ring-[#e80071]/20 text-base outline-none text-gray-700 py-2 px-4 transition-colors duration-200 ease-in-out shadow-sm"
                        />
                    </div>
                </div>
                <button
                    onClick={handleUserSubmit}
                    disabled={disabled || loading}
                    className="w-full md:w-auto flex disabled:cursor-not-allowed disabled:bg-pink-100 disabled:text-pink-300 items-center justify-center mt-4 rounded-full cursor-pointer font-semibold bg-[#e80071] border-2 border-[#e80071] py-2 px-8 focus:outline-none hover:bg-[#c2005a] hover:border-[#c2005a] text-lg text-white shadow-md transition-all duration-200"
                >
                    {loading ? "Updating..." : "Confirm"}
                </button>
                <h2 className="font-semibold text-2xl text-[#e80071] mt-12 mb-4 text-center tracking-tight">
                    Change Password
                </h2>
                <div className="flex flex-col md:flex-row gap-6 mb-4">
                    <div className="w-full md:w-1/2">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={handleChange}
                            id="password"
                            name="password"
                            className="w-full bg-pink-50 rounded-lg border border-pink-200 focus:border-[#e80071] focus:ring-2 focus:ring-[#e80071]/20 text-base outline-none text-gray-700 py-2 px-4 transition-colors duration-200 ease-in-out shadow-sm"
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <label
                            htmlFor="cpassword"
                            className="block mb-2 text-sm font-medium text-gray-700"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            value={cpassword}
                            onChange={handleChange}
                            id="cpassword"
                            name="cpassword"
                            className="w-full bg-pink-50 rounded-lg border border-pink-200 focus:border-[#e80071] focus:ring-2 focus:ring-[#e80071]/20 text-base outline-none text-gray-700 py-2 px-4 transition-colors duration-200 ease-in-out shadow-sm"
                        />
                    </div>
                </div>
                <button
                    onClick={handlePasswordSubmit}
                    disabled={loading || !password || !cpassword}
                    className="w-full md:w-auto flex disabled:cursor-not-allowed disabled:bg-pink-100 disabled:text-pink-300 items-center justify-center mt-4 rounded-full cursor-pointer font-semibold bg-[#e80071] border-2 border-[#e80071] py-2 px-8 focus:outline-none hover:bg-[#c2005a] hover:border-[#c2005a] text-lg text-white shadow-md transition-all duration-200"
                >
                    {loading ? "Updating..." : "Change Password"}
                </button>
            </div>
        </div>
    );
};

export default MyAccount;
