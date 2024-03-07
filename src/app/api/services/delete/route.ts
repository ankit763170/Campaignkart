import { NextRequest, NextResponse } from "next/server";
import { Services } from "@/models/index";
import {dbConnect} from "@/../lib/dbconnect";
import { verifyToken } from "@/middleware";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const verificationResult = await verifyToken(req);
      if (verificationResult?.role==='admin') {
        return  NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
  
    const body = await req.json();

    if (!body._id) {
      throw Error("Service id missing");
    }

    await Services.findOneAndDelete({_id:body._id});
    return NextResponse.json({ message: "Service deleted successfully" });
  } catch (error: any) {
    console.error(error);
    console.log(error, 'error deleting service')
    return NextResponse.json({ message: error.message },{status:500});
  }
}
