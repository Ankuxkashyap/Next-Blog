"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { getBlogById } from "@/app/actions/blog";

type AuthorType = {
  username: string;
  _id: string;
  email: string;
};

type CommentType = {
  content: string;
  replier: AuthorType;
  createdAt: Date;
};

type CommentsResponse = {
  success: boolean;
  blog: {
    comments: CommentType[];
  };
};

type BlogType = {
  author: AuthorType;
};

export function CommentSection({ blogId }: { blogId: string }) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await axios.get<CommentsResponse>(
          `/api/blog/comment/${blogId}`
        );

        console.log("Fetched comments:", data.blog.comments);
        setComments(data.blog.comments || []);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUser = async () => {
      try {
        const blog: BlogType = await getBlogById(blogId);
        setUserId(blog?.author._id);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
    fetchComments();
  }, [blogId]);

  if (loading) {
    return <div className="mt-6 font-semibold">Loading comments...</div>;
  }

  if (comments.length === 0) {
    return <div className="mt-5 text-xl font-semibold">No comments yet.</div>;
  }

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>
      <ul className="space-y-4">
        {comments.map((comment, idx) => (
          <li key={idx} className="pb-2">
            <div className="flex items-center space-x-4">
              <p className="w-8 h-8 rounded-full bg-gray-700 flex text-sm items-center justify-center">
                {comment.replier.username[0].toUpperCase()}
              </p>
              <div className="flex flex-row gap-4">
                <p className="font-semibold">{comment.replier.username}</p>
                {userId === comment.replier._id && (
                  <span className="text-xs text-blue-400">author</span>
                )}
                <p className="text-sm text-gray-400">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
                
              </div>
            </div>
            <div className="pl-12">
              <p>{comment.content}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
