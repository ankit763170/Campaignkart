import { NextRequest, NextResponse } from "next/server";
import { Services } from "@/models/index";
import {dbConnect} from "@/../lib/dbconnect";
import { verifyToken } from "@/middleware";
import {User} from '@/models/index'


export async function POST(req: NextRequest) {
  await dbConnect();
try
    {const verificationResult = await verifyToken(req);
    if (verificationResult?.role==='admin') {
      return  NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findById(verificationResult.id);
    if (!user || !user.isAdmin) {
      return  NextResponse.json({ message: "Sorry, you are not able to add a service" }, { status: 403 });
    }

    const body = await req.json();

    if (
      !body.title ||
      !body.short_description ||
      !body.long_description ||
      !body.cover_image||
      !body.slug
    ) {
      throw Error("Please enter the missing fields");
    }
    await Services.create(body);
    return NextResponse.json({
      success: true,
      message: "Services added successfully",
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message },{status:500});
  }
}
