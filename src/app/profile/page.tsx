"use client";
import axios from "axios";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("");

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout successful");
            router.push('/login')
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me")
        console.log(res.data);
        setData(res.data.data._id);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Toaster />
            <div className='p-2 h1 text-2xl p-4'>Profile</div>
            <div className='flex flex-col border-2 w-80  p-4 rounded-md'>
                <p className="flex justify-center ">Profile Page</p>
                <h2 className="p-3 rounded ">{data === "" ? "No User" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
                <hr />
                <button
                    className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={logout}
                >
                    Logout
                </button>
                <button
                    className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={getUserDetails}
                >
                    Get User Details
                </button>
            </div>
        </div>
    )
}