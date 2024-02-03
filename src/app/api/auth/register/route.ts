import User from "@/models/User";
import connect from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

export const POST = async (req: NextRequest, res: NextResponse) => {
    const body = await req.formData();
    await connect();
    let userData = await User.findOne({ email: body.get('email') });
    if (userData) {
        return new NextResponse(JSON.stringify({ "success": true, "msz": "User Already Exist" }));
    }
    else {
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(body.get('password') as string, salt);
        let newUser = new User({
            'username': body.get('username'),
            'email': body.get('email'),
            'profile': body.get('profile'),
            'password': hashedPassword,
            'provider': 'email'
        })
        await newUser.save();
        return new NextResponse(JSON.stringify({ "success": true }));
    }
}