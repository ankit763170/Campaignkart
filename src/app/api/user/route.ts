import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models";
import {dbConnect} from "@/../lib/dbconnect";
import convertParams, { FinalQuery } from "@/../utils/api/convertParams";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const searchParamsObject = Object.fromEntries(req.nextUrl.searchParams);

    const finalQuery: FinalQuery = await convertParams(
      User,
      searchParamsObject
    );

    const allUsers = await User.find(finalQuery.find)
      .limit(finalQuery.limit);

    return NextResponse.json({ allUsers });
  } catch (error: any) {
    console.error(error, "API Error");
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
// 'auto' | 'force-dynamic' | 'error' | 'force-static'