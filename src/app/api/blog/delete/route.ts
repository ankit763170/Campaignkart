import { NextRequest, NextResponse } from "next/server";
import { Blog, Comments} from "@/models";
import dbConnect from "@/lib/dbconnect";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();

    if (!body._id) {
      throw Error("Blog id missing");
    }

    console.log(body, 'deleting...')
    await Comments.deleteMany({blog:body._id})
    await Blog.findOneAndDelete({ _id: body._id });
    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message },{status:500});
  }
}
