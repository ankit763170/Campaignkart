import { dbConnect } from '@/../lib/dbconnect';
import { User } from '@/models/index';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

dbConnect();

export async function POST(request: NextRequest) {
    try {
        const reqbody = await request.json();
        const { email, password } = reqbody;

        // Check if email and password are provided
        if (!email || !password) {
            return NextResponse.json('Bad Request', { status: 400 });
        }

        // Find user by email
        const user = await User.findOne({ email: email });

        // If user doesn't exist, return error
        if (!user) {
            return NextResponse.json({ error: 'User does not exist' }, { status: 404 });
        }

        console.log("User exists");

        // Check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password);

        // If password is invalid, return error
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }

        console.log("Password is valid");

        // Create token data
        const tokendata = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        // Create toke
        const token = jwt.sign(tokendata, 'veysecret', { expiresIn: "1d" });


        const response = NextResponse.json({
            message: "Login successful",
            success: true,
         token : token,
         email : email,
         
        });
        response.cookies.set("token", token, {
            httpOnly: true,
        });
        console.log(response)

        return response;
    
    }
    catch (error: any) {
        // Handle any unexpected errors
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
