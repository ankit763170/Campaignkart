import { NextRequest, NextResponse } from "next/server";
import Category from "./../../../../models/category";
import dbConnect from "./../../../../../lib/dbconnect";
import { verifyToken } from "./../../../../middleware";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const verificationResult = await verifyToken(req);
    if (verificationResult && !verificationResult.role) {
      return verificationResult;
    }
    const body = await req.json();

    if (!body.name) {
      throw Error("Please enter the missing fields");
    }

    await Category.create(body);
    return NextResponse.json({ success: true, message: "Category added successfully" });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
