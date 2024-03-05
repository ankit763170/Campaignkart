import { NextRequest, NextResponse } from "next/server";
import { Blog, Comments } from "@/models";
import { dbConnect } from "@/../lib/dbconnect";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();

    if (!body._id) {
      throw Error("Blog id missing");
    }

    // Delete comments associated with the blog
    await Comments.deleteMany({ blog: body._id });

    // Delete the blog
    const deletedBlog = await Blog.findByIdAndDelete(body._id);

    if (!deletedBlog) {
      throw Error("Blog not found");
    }

    console.log("Blog deleted:", deletedBlog);

    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
