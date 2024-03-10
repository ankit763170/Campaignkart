import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models";
import {dbConnect} from "@/../lib/dbconnect";
import { verifyToken } from "@/middleware";

export async function POST(req: NextRequest) {
  try {
    const verificationResult = await verifyToken(req);
    if (verificationResult && !(verificationResult.role === "admin")) {
      return verificationResult;
    }
    const body = await req.json();

    if (!body.name || !body.email || !body.password) {
      throw Error("Please enter the missing fields");
    }
    if (verificationResult.role === "superadmin") {
      await dbConnect();
      body.added_by = verificationResult.data._id;
      await User.create(body);
      return NextResponse.json({ message: "User data submitted successfully" });
    } else {
      return NextResponse.json({
        message: "Unauthorized",
        status: 403,
        statusText: "Unautorized",
      });
    }
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
