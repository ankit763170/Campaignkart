import { NextRequest, NextResponse } from "next/server";
import { Comments } from "@/models/index";
import {dbConnect} from "@/../lib/dbconnect";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();

    if (!body.name || !body.message) {
      throw Error("Please enter the missing fields");
    }

    await Comments.create(body);
    return NextResponse.json({success:true, message: "Comments added successfully" });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success:false,message: error.message },{status:500});
  }
}
