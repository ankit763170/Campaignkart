import { NextRequest, NextResponse } from "next/server";
import { Services } from "@/models/index";
import {dbConnect} from "@/../lib/dbconnect";
import { verifyToken } from "@/middleware";
import convertParams, { FinalQuery } from "@/../utils/api/convertParams";

export async function GET(req: NextRequest) {

  try {

  await dbConnect();

  const searchParamsObject = Object.fromEntries( req.nextUrl.searchParams);
    
  const finalQuery:FinalQuery = await convertParams(Services, searchParamsObject);

  const allServices = await Services.find(finalQuery.find)
  .limit(finalQuery.limit);


    return NextResponse.json({allServices});
  } catch (error: any) {
    console.error(error, "API Error");
    return NextResponse.json({ message: error.message });
  }
}

export const dynamic = "force-dynamic";
// 'auto' | 'force-dynamic' | 'error' | 'force-static'