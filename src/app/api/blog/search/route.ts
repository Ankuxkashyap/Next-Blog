import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Blog from "@/models/Blog.model";


export async function GET (req: Request) {
    try {
        await connectToDatabase();
        const searchParams = new URL(req.url).searchParams;
        const query = searchParams.get("query") || "";
        console.log(query);

        const blogs = await Blog.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } }
      ]
    }).lean();
        if(!blogs){
            return NextResponse.json({success:false})
        }
     return NextResponse.json({ success: true, blogs });

    }catch(err){
        console.error("Search error:", err);
        return NextResponse.json({ success: false, blogs: [] }, { status: 500 });
  }
}