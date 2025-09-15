"use server";

import { connectToDatabase } from "@/lib/db";
import Blog from "@/models/Blog.model";
import User from "@/models/User.model";
import { getIdFromCookie } from "@/lib/auth";
// import { Content } from "next/font/google";
import mongoose from "mongoose";
import { Types } from "mongoose";
import { IBlog } from "@/models/Blog";
// import { create } from "axios";

export type BlogCreateResult = {
  success: boolean;
  message: string;
};

type BlogType = {
  _id : string,
  title: string;
  description: string;
  image: string;
  content: string;
  author: string;
};

export async function createBlogPost(formData: FormData): Promise<BlogCreateResult> {
  try {
    await connectToDatabase();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as string;
    const content = formData.get("content") as string;

    const userId = await getIdFromCookie();
    const user = await User.findById(userId);

    if (!user) {
      return { success: false, message: "User not found" };
    }

    const newBlog = new Blog({
      title,
      description,
      image,
      content,
      author: user._id,
    });

    await newBlog.save();

    user.blogPosts.push(newBlog._id);
    await user.save();

    return { success: true, message: "Blog created successfully!" };
  } catch (err) {
    console.error("Error creating blog post:", err);
    return { success: false, message: "Failed to create blog post." };
  }
}

export async function getLatestBlogs(): Promise<BlogType[]> {
  try {
    await connectToDatabase();

    const blogs = await Blog.find({})
      .sort({ createdAt: -1 })
      .limit(3)
      .lean()
    // console.log("Total blogs in DB:", await Blog.countDocuments());
    return blogs as unknown as BlogType[];
    
  } catch (err) {
    console.error("Error fetching blogs:", err);
    return [];
  }
}

export async function getBlogById(id:string){
  type respnseType = {
    success: boolean;
    message: string;
    blog: BlogType;
  }
  try{
    await connectToDatabase();
    const blog = await Blog.findById(id).lean().populate('author','-password');
    if(!blog){
      return null;
    }
    return blog as unknown as BlogType
  }
  catch(err){
    console.error("Error fetching blog:", err);
    return null;
  }
}

interface ToggleLikeResponse {
  success: boolean;
  message?: string;
  liked?: boolean;
  likesCount?: number;
}

export async function toggleLike(blogId: string) {
  const userId = await getIdFromCookie();
  if (!userId) return { success: false, message: "Not authenticated" };

  await connectToDatabase();
  const blog: IBlog | null = await Blog.findById(blogId);

  if (!blog) return { success: false, message: "Blog not found" };

  // Ensure likedBy is always an array
  if (!blog.likedBy) {
    blog.likedBy = [];
  }

  const alreadyLiked = blog.likedBy.some(
    (id : Types.ObjectId) => id.toString() === userId
  );

  if (alreadyLiked) {
    blog.likedBy = blog.likedBy.filter((id) => id.toString() !== userId);
  } else {
    blog.likedBy.push(new mongoose.Types.ObjectId(userId));
  }

  blog.likes = blog.likedBy.length;
  await blog.save();

  return { success: true, liked: !alreadyLiked, likesCount: blog.likes };
}