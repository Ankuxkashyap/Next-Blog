"use client";

import { BiSolidCommentDetail } from "react-icons/bi";
import { useState, useEffect } from "react";
import {toast } from 'react-hot-toast'

export function CommentButton({ blogId }: { blogId: string }) {
  const [commentInput, setCommentInput] = useState(false);
  const [commentData, setCommentData] = useState("");
  const [commentCount, setCommentCount] = useState(0);

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/blog/comment/${blogId}`);
      const data = await response.json();
      console.log(data)
      
      if (data.success && data.blog?.comments) {
        setCommentCount(data.blog.comments.length);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handlePostComment = async () => {
    if (!commentData.trim()) return;

    try {
      const response = await fetch(`/api/blog/comment/${blogId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: commentData }),
      });

      const result = await response.json();
      console.log(result);
      if (result.success) {
        setCommentData(""); 
        fetchComments(); 
      }
      else{
        toast.error(result.message);
      }
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <>
        <div className=" flex border-b border-gray-700 px-2 py-3 items-center">
          <input
            type="text"
            placeholder="Write a comment..."
            value={commentData}
            onChange={(e) => setCommentData(e.target.value)}
            className="outline-none w-full text-white  rounded-md px-2 py-1 "
          />
          <button
            onClick={handlePostComment}
            className="bg-blue-800 ml-3 cursor-pointer text-white px-3 py-1 rounded-md"
          >
            Post
          </button>
        </div>
    </>
  );
}
