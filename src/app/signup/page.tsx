"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";

export default function SignupPage () {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    })
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/profile");
            toast.success("Signup success");
        } catch (error: any) {
            console.log("signup failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length>0 && user.username.length>0) {
            setButtonDisabled(false);
        } else{
            setButtonDisabled(true);
        }
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Toaster />
            <div className='p-2 h1 text-2xl'>{loading ? "Processing" : "Signup"}</div>
            <div className='flex flex-col border-2 w-80  p-4 rounded-md'>
                <label htmlFor="username">Username</label>
                <input
                className="p-2 border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600 text-black"
                    id="username"
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser({...user, username: e.target.value})}
                    placeholder="username"
                />
                <label htmlFor="email">Email</label>
                <input
                className="p-2 border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600 text-black"
                    id="email"
                    type="text"
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    placeholder="email"
                />
                <label htmlFor="password">Password</label>
                <input
                className="p-2 border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600 text-black"
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({...user, password: e.target.value})}
                    placeholder="password"
                />
                <button
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                    onClick={onSignup}
                >
                    {buttonDisabled ? "No signup" : "Signup"}
                </button>
                <Link
                    href="/login"
                    className="p-2 flex justify-center border border-gray-300 rounded-lg mb-4 focus:outline-none hover:border-gray-600"
                >
                    Visit login
                </Link>
            </div>
        </div>
    )
}