import { getBlogById, toggleLike } from "@/app/actions/blog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getIdFromCookie } from "@/lib/auth"; 
import { AiOutlineLike } from "react-icons/ai"
import { BiSolidCommentDetail } from "react-icons/bi";


interface BlogPageProps {
  params: {
    id: string;
  };
}

type authorType = {
  username: string;
  _id: string;
  email: string;
}

interface BlogType {
  title: string;
  description: string;
  _id: string;
  image: string;
  createdAt: Date;
  content: string;
  author: authorType;
  likes: number;
  comments: string[];
}

export default async function BlogPage({ params }: BlogPageProps) {
    const id = params.id;
    const blog = await getBlogById(id);
    const userId = await getIdFromCookie();
    
    if (!blog) {
        return <div>Error fetching blog</div>;
    }
    const data = await toggleLike(blog._id as string);
    console.log(data);

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 text-gray-300">
      <div className="mb-8">
        <h1 className="text-5xl font-bold text-white mb-4">{blog.title}</h1>
        <div className="flex items-center gap-4 text-gray-400 text-sm">
          <span>By {blog.author.username!}</span>
          <span>•</span>
          <span>{new Date(blog.createdAt!).toLocaleDateString()}</span>
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

      <div className="flex items-center gap-4 mb-5 border-t border-gray-700 pt-5">
        <div className="w-12 h-12 rounded-full bg-gray-700 text-lg flex items-center justify-center text-white font-bold">
          {blog.author.username[0].toUpperCase()}
        </div>
        <div className="flex flex-row items-center justify-between gap-4 w-full">
          <div className="flex flex-col">
            <p className="font-semibold text-white">{blog.author.username}</p>
            <p className="text-gray-400 text-sm">{blog.author.email}</p>
          </div>
          {userId === blog.author._id && (
            <p className="cursor-pointer text-gray-300 text-xl font-medium ml-5">Edit</p>
          )}
        </div>
      </div>

<div className="flex items-center justify-between border-t border-gray-700 pt-4 text-gray-400">
  <div className="flex items-center gap-6">
    <div className="flex items-center gap-2 cursor-pointer hover:text-white">
      <AiOutlineLike className="text-2xl" />
      <span className="text-sm font-medium">{blog.likes}</span>
    </div>
    <div className="flex items-center gap-2 cursor-pointer hover:text-white">
      <BiSolidCommentDetail className="text-2xl" />
      <span className="text-sm font-medium">{blog.comments.length}</span>
    </div>
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

    </main>
  );
}
