import { NextRequest, NextResponse } from "next/server";
import { Category } from "@/models";
import dbConnect from "@/lib/dbconnect";
import { verifyToken } from "@/middlewares/verifyToken";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const verificationResult = await verifyToken(req);
    if (verificationResult && !verificationResult.role) {
     return verificationResult;
    }
    const body = await req.json();

    if (!body._id) {
      throw Error("Category id missing");
    }

    await Category.findOneAndDelete(body._id);
    return NextResponse.json({ message: "Category  deleted successfully" });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message },{status:500});
  }
}
