import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Comment from "@/models/Comment.model";
import Blog from "@/models/Blog.model";
import { getIdFromCookie } from "@/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const  id  =  params.id; 

  // console.log("Blog ID:", id);

  try {
    await connectToDatabase();

    const blog = await Blog.findById(id)
      .populate({
        path: "comments",
        populate: { path: "replier", select: "username _id email" },
      })
      .lean();

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, blog });
  } catch (err) {
    console.error("Error fetching blog:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  console.log("id from the post comment:", id);

  try {
    await connectToDatabase();

    const { content } = await req.json();
    if (!content || content.trim() === "") {
      return NextResponse.json(
        { success: false, message: "Content is required" },
        { status: 400 }
      );
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    
    const userId = await getIdFromCookie();
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    
    const comment = await Comment.create({
      content,
      replier: userId, 
      blog:blog._id
    });

    
    blog.comments.push(comment._id);
    await blog.save();

    return NextResponse.json({ success: true, comment });
  } catch (err) {
    console.error("Error creating comment:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}


