"use client";
import Link from "next/link";
import React,{useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Login, GetData } from '@/app/actions/login';

const LoginPage = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login Success", response.data);
            toast.success("Login Success");
            router.push("/profile");
        } catch (error: any) {
            console.log("login failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
        // Login(user).then((res: any) => {
        //     console.log('res', res)
        //     if (res.success) router.push("/profile");
        // });
        const data = await GetData(user);
        console.log("data", data)
    }

    // async function GetData () {
    //     'use server'
    //     const dbUser = await User.findOne({ email: user.email})
    //     return dbUser;
    // }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length>0 ) {
            setButtonDisabled(false);
        } else{
            setButtonDisabled(true);
        }
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Toaster />
            <div className='p-2 h1 text-2xl'>{loading ? "Processing" : "Login"}</div>
            <div className='flex flex-col border-2 w-80  p-4 rounded-md'>
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
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none hover:border-gray-600"
                    onClick={onLogin}
                >
                    Login here
                </button>
                <Link
                    href="/signup"
                    className="p-2 flex justify-center border border-gray-300 rounded-lg mb-4 focus:outline-none hover:border-gray-600"
                >
                    Signup
                </Link>
            </div>
        </div>
    )
}

export default LoginPage;