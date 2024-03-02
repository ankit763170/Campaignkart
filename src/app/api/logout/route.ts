import { NextResponse } from "next/server";
import { logout } from "@/stores/features/auth-slice"; // Import the logout action
import { useDispatch } from "react-redux";

export async function GET() {
    const dispatch= useDispatch();
    try {
        const response = NextResponse.json(
            {
                message: "Logout successful",
                success: true,

            }
            dispatch(logout())
        )
        response.cookies.set("token", "", 
        { httpOnly: true, expires: new Date(0) 
        });
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
        
    }
