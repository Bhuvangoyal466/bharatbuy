import React, { use } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const MyAccount = () => {
    const router = useRouter();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            router.push("/");
        }
    }, []);
    return <div>My Account</div>;
};

export default MyAccount;
