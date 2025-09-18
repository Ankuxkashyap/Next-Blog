"use server";

import { connectToDatabase } from "@/lib/db";
import Blog,{IBlog} from "@/models/Blog.model";
import User from "@/models/User.model";
import { getIdFromCookie } from "@/lib/auth";
import mongoose from "mongoose";
import Comment from "@/models/Comment.model"
import { Types } from "mongoose";


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
  try{
  const userId = await getIdFromCookie();
  if (!userId) return { success: false, message: "Not authenticated" };

  await connectToDatabase();
  const blog = await Blog.findById(blogId);

  if (!blog) return { success: false, message: "Blog not found" };

  const alreadyLiked = blog.likedBy.some(
    (id: Types.ObjectId) => id.toString() === userId
  );

  if (alreadyLiked) {
    blog.likedBy = blog.likedBy.filter(
      (id: Types.ObjectId) => id.toString() !== userId
    );
  } else {
    blog.likedBy.push(new mongoose.Types.ObjectId(userId));
  }

  blog.likes = blog.likedBy.length;
  await blog.save();

  return {
    success: true,
    liked: !alreadyLiked,
    likesCount: blog.likes,
  };
  }
  catch(err){
    console.log("Error toggling like:", err);
    return { success: false, message: "Error toggling like" };
  }
}

export async function getCommentCount(blogId: string): Promise<number> {
  await connectToDatabase();
  type Blog = {
    comment:[]
  }
  const blog= await Blog.findById<Blog>(blogId).select("comments").lean();

  if (!blog) return 0;

  return blog.comments.length;
}

