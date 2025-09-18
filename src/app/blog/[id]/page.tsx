import { getBlogById } from "@/app/actions/blog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getIdFromCookie } from "@/lib/auth";
import LikeButton from "@/components/LikeButton";
import { CommentButton } from "@/components/CommentButton";
import {getCommentCount} from '@/app/actions/blog'
import { CommentSection } from "@/components/CommentSection";
import { BiSolidCommentDetail } from "react-icons/bi";
import Link from "next/link";

interface BlogPageProps {
  params: {
    id: string;
  };
}

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

interface BlogType {
  title: string;
  description: string;
  _id: string;
  image: string;
  createdAt: Date;
  content: string;
  author: AuthorType;
  likes: number;
  likedBy: string[];
  comments: CommentType[];
}

export default async function BlogPage({ params }: BlogPageProps) {
  const  id  =  params?.id; 
  const blog: BlogType | null = await getBlogById(id);
  const userId = await getIdFromCookie();
  const commentCount = await getCommentCount(id);
  if (!blog) {
    return <div className="text-red-500">Error fetching blog</div>;
  }
  console.log( "Edit : ",userId," ",blog.author._id)

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 text-gray-300">
      <div className="mb-8">
        <h1 className="text-5xl font-bold text-white mb-4">{blog.title}</h1>
        <div className="flex items-center gap-4 text-gray-400 text-sm">
          <span>By {blog.author.username}</span>
          <span>•</span>
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      {blog.image && (
        <div className="w-full h-[400px] mb-8 relative rounded-lg overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      )}

      <article className="prose prose-invert max-w-none mb-12">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node, ...props }) => (
              <h1 className="text-4xl md:text-5xl font-bold my-6" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="text-3xl md:text-4xl font-semibold my-5" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="text-2xl md:text-3xl font-semibold my-4" {...props} />
            ),
            h4: ({ node, ...props }) => (
              <h4 className="text-xl md:text-2xl font-semibold my-3" {...props} />
            ),
            p: ({ node, ...props }) => (
              <p className="text-base md:text-lg my-2" {...props} />
            ),
            li: ({ node, ...props }) => (
              <li className="ml-6 my-1 list-disc" {...props} />
            ),
          }}
        >
          {blog.content}
        </ReactMarkdown>
      </article>

      
      <div className="flex items-center gap-4 mb-5 border-gray-700 pt-5">
        <div className="w-12 h-12 rounded-full bg-gray-700 text-lg flex items-center justify-center text-white font-bold">
          {blog.author.username[0].toUpperCase()}
        </div>
        <div className="flex flex-row items-center justify-between gap-4 w-full">
          <div className="flex flex-col">
            <p className="font-semibold text-white">{blog.author.username}</p>
            <p className="text-gray-400 text-sm">{blog.author.email}</p>
          </div>
          {userId == blog.author._id && (
            <Link href={`/blog/edit/${blog._id}`} className="cursor-pointer text-gray-300 text-lg font-medium ml-5">
              Edit
            </Link>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-b pb-4 border-gray-700 pt-4 text-gray-400">
        <div className="flex items-center gap-6">
          <LikeButton
            blogId={blog._id.toString()}
            initialLikes={blog.likes}
            initiallyLiked={blog.likedBy?.includes(userId as string)}
          />
            <button
          className="flex cursor-pointer items-center gap-2"
        >
          <BiSolidCommentDetail className="text-2xl" />
          {commentCount}
        </button>
        </div>

        <div className="flex items-center gap-6">
          <button className="hover:text-white">
            <i className="text-2xl">🔖</i>
          </button>
          <button className="hover:text-white">
            <i className="text-2xl">📤</i>
          </button>
        </div>
      </div>
      <CommentButton blogId={blog._id.toString()} />

      <CommentSection blogId={blog._id.toString()} />
    </main>
  );
}
