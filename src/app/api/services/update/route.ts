import { NextRequest, NextResponse } from "next/server";
import { Services,Cases } from "@/models/index";
import {dbConnect} from "@/../lib/dbconnect";
import { verifyToken } from "@/middleware";


export async function POST(req: NextRequest) {
 

  try {
    const verificationResult = await verifyToken(req);
      if (verificationResult?.role==='admin') {
        return  NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
  
 
    const body = await req.json();

    if (
      !body.title ||
      !body.short_description ||
      !body.long_description ||
      !body.cover_image
    ) {
      throw Error("Please enter the missing fields");
    }
    await dbConnect();

    await Services.findByIdAndUpdate(body._id,body);
    return NextResponse.json({
      success: true,
      message: "Services updated successfully",
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message },{status:500});
  }
}
