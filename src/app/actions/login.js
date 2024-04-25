'use server';
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

connect();

export async function Login(request) {
    try {

        const {email, password} = request;
        console.log(request);

        //check if user exists
        const user = await User.findOne({email})
        if (!user) {
            return {error: "user does not exists"}, {status: 400};
        }

        return user;

    } catch (error) {
        return {error: error.message}, {status: 500}
    }
}


export async function GetData(request) {
    try {

        const {email, password} = request;
        console.log(request);

        //check if user exists
        const user = await User.findOne({email})
        if (!user) {
            return {error: "user does not exists"}, {status: 400};
        }

        return user;

    } catch (error) {
        return {error: error.message}, {status: 500}
    }
}