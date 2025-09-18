"use client";

import { useState, useTransition } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { toggleLike } from "@/app/actions/blog";

interface LikeButtonProps {
  blogId: string;
  initialLikes: number;
  initiallyLiked: boolean;
}

export default function LikeButton({
  blogId,
  initialLikes,
  initiallyLiked,
}: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(initiallyLiked);
  const [isPending, startTransition] = useTransition();

  const handleLike = () => {
    startTransition(async () => {
      try {
        const updated = await toggleLike(blogId);
        console.log("Updated likes:", updated);
        if (updated.success) {
          setLikes(updated.likesCount || 0);
          setLiked(updated.liked || false);
        }
      } catch (err) {
        console.error("Error toggling like:", err);
      }
    });
  };

  return (
    <div
      onClick={handleLike}
      className="flex items-center gap-2 cursor-pointer hover:text-white"
    >
      {liked ? (
        <AiFillLike className="text-2xl text-gray-200" />
      ) : (
        <AiOutlineLike className="text-2xl" />
      )}
      <span className="text-sm font-medium">{isPending ? "..." : likes}</span>
    </div>
  );
}
