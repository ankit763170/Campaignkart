import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models";
import {dbConnect} from "@/../lib/dbconnect";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();

    if (!body._id) {
      throw Error("User id missing");
    }

    await User.findOneAndDelete({_id:body._id});
    return NextResponse.json({ message: "User data deleted successfully" });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message },{status:500});
  }
}
