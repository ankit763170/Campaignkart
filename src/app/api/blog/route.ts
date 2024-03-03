import { NextRequest, NextResponse } from "next/server";
import { Blog, Category, Comments } from "@/models";
import dbConnect from "@/lib/dbconnect";
import convertParams, { FinalQuery } from "@/utils/api/convertParams";

async function getTotalCount(query: any) {
  try {
    return await Blog.countDocuments(query.find);
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching total count");
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    //@t-ignore
    const searchParamsObject = Object.fromEntries(req.nextUrl.searchParams);

    const finalQuery: FinalQuery = await convertParams(
      Blog,
      searchParamsObject
    );

    const allBlogs = await Blog.find(finalQuery.find)
      .populate({
        path: "category",
        select: "name",
      })
      .populate({
        path: "created_by",
        select: "name",
      })
      .populate({
        path: "updated_by",
        select: "name",
      })
      .skip(finalQuery.start)
      .limit(finalQuery.limit);

    const updatedBlogs: any = [];

    await Promise.all(
      allBlogs.map(async (item) => {
        const updated_item = { ...item._doc };
        updated_item.comments = await Comments.find({ blog: item._id });
        // console.log(updated_item, "updateditem");
        updatedBlogs.push(updated_item);
      })
    );

    const totalCount = await getTotalCount(finalQuery);

    console.log("returning res");
    return NextResponse.json({
      allBlogs: updatedBlogs,
      pagination: {
        page: finalQuery.start / finalQuery.limit + 1,
        limit: finalQuery.limit,
        total: totalCount,
      },
    });
  } catch (error: any) {
    console.error(error, "API Error");
    return NextResponse.json({ message: error.message },{status:500});
  }
}

export const dynamic = "force-dynamic";
// 'auto' | 'force-dynamic' | 'error' | 'force-static'