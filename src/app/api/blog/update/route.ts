import { NextRequest, NextResponse } from "next/server";
import { Blog } from "@/models";
import {dbConnect} from "@/../lib/dbconnect";
import { verifyToken } from "@/middleware";

export async function POST(req: NextRequest) {
 

  try {
      const verificationResult = await verifyToken(req);
      if (verificationResult && !verificationResult.role) {
       return verificationResult;
    }
    const id = verificationResult.data._id;
    const body = await req.json();
// console.log(id)
    
    if (
        !body.title ||
        !body.shortDescription ||
        !body.longDescription ||
        !body.coverImage
      ) {
        throw Error("Please enter the missing fields");
      }
  
    await dbConnect();
    // body.updated_by = id
    await Blog.findByIdAndUpdate(body._id,body);
    return NextResponse.json({
      success: true,
      message: "Blog Updated successfully",
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message },{status:500});
  }
}
