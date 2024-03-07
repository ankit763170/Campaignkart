import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/middleware";
import { User } from "@/models";

export async function GET(req: NextRequest) {
  try {
    console.log("***** VERIFY API CALLED *****");
    const verificationResult = await verifyToken(req);

    let role: string | null = null;
    let message: string = "Verification failed";
    let isValid: boolean = false;

    if (verificationResult) {
const usr = await User.findById(verificationResult.id)
    if (usr.isAdmin === "true") {
        isValid = true;
        message = "Token verified successfully";
      } else {
        message = "Role not recognized";
      }
    }

    return NextResponse.json({
      role : "admin",
      message,
      isValid,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      // console.error(error, "API Error");
      return NextResponse.json(
        { role: null, message: error.message, isValid: false },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { role: null, message: "An unknown error occurred", isValid: false },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
// 'auto' | 'force-dynamic' | 'error' | 'force-static'