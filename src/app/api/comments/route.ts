import { NextRequest, NextResponse } from "next/server";
import { Comments } from "@/models";
import {dbConnect} from "@/../lib/dbconnect";
import convertParams, { FinalQuery } from "@/../utils/api/convertParams";

async function getRepliesForComment(commentId: string): Promise<any[]> {
  const replies = await Comments.find({ parent: commentId }).populate({
    path: "blog",
    select:"title slug"
  });
  let replyObjs = [];
  for (let reply of replies) {
      let replyObj = reply.toObject();
      replyObj.replies = await getRepliesForComment(reply._id);
      replyObjs.push(replyObj);
  }
  return replyObjs;
}


async function getTotalCount(query: any) {
  try {
    return await Comments.countDocuments(query.find);
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching total count");
  }
}

export async function GET(req: NextRequest) {
  try {
    console.log("***** Comments api called *****")
    await dbConnect();

    const searchParamsObject = Object.fromEntries(req.nextUrl.searchParams);
    const finalQuery: FinalQuery = await convertParams(Comments, searchParamsObject);

    // Adjust the query to fetch only top-level comments (i.e., comments without a parent).
    finalQuery.find.parent = { $exists: false };

    const allComments = await Comments.find(finalQuery.find)
      .populate({
        path: "blog",
        select: "title slug",
      })
      .limit(finalQuery.limit);

    const updatedComments:any = [];

    for (let comment of allComments) {
      let commentObj = comment.toObject(); // Convert the Mongoose document to a plain object
      commentObj.replies = await getRepliesForComment(comment._id);
      updatedComments.push(commentObj);
  }
  

    const totalCount = await getTotalCount(finalQuery);

    return NextResponse.json({
      allComments: updatedComments,
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