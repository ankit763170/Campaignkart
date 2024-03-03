import { NextRequest, NextResponse } from "next/server";
import { Blog } from "@/models/index";
import { dbConnect } from "@/../lib/dbconnect";

export async function POST(req: NextRequest) {
  try {
    // Static user ID for testing purposes
    const userId = '65e1fe35dcb88f779ef9ca6c'

    const body = await req.json();

    // Check if required fields are missing
    if (
      !body.title ||
      !body.short_description ||
      !body.long_description ||
      !body.cover_image
    ) {
      throw Error("Please enter all required fields.");
    }

    // Connect to the database
    await dbConnect();

    // Set created_by and updated_by fields to the static user ID
    body.created_by = userId;
    body.updated_by = userId;

    // Create new blog
    await Blog.create(body);

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "Blog added successfully",
      })
    );
  } catch (error: any) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: error.message,
      }),
      { status: 500 } // Internal Server Error status code
    );
  }
}
