// import Image from "next/image";
import Link from "next/link";
import { getLatestBlogs } from "./actions/blog";
import Image from "next/image";
import { getIdFromCookie } from "@/lib/auth";
import { getUser } from "./actions/user";
import { Footer } from "@/components/Footer";

export default async function Home() {
  const latestBlogs = await getLatestBlogs();
  const id = await getIdFromCookie()
  const user = await getUser(id as string)
  // console.log("user: ",user)
  return (
    <>
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-black to-gray-900 justify-between p-6">
      <div className="z-10 w-full max-w-6xl mt-16 flex flex-col md:flex-row font-mono items-center justify-between gap-12">
        <div className="flex flex-col max-w-lg">
          <h1 className="text-5xl font-bold text-center md:text-left mb-6 text-white leading-tight">
            Welcome to{" "}
            <span className="md:bg-white px-2 text-gray-700">
              BlogApp!
            </span>
          </h1>
          <p className="text-xl text-center md:text-left text-gray-300 leading-relaxed">
            Share your thoughts, ideas, and stories with the world. Connect,
            inspire, and explore amazing content from our community.
          </p>
          <div className="flex items-center justify-center md:justify-start gap-6 mt-8">
            <Link
              href={user ? "/blog/new" :"/login"}
              className="rounded-xl px-5 py-2 text-sm font-medium text-black bg-gray-300 hover:bg-gray-200 transition"
            >
              Get Started
            </Link>
            <Link
              href={ user ? "/blog":"/login"}
              className="rounded-xl px-5 py-2 text-sm font-medium bg-gray-800 text-white hover:bg-gray-700 transition"
            >
              Browse Blogs
            </Link>
          </div>
        </div>

        
        <div className="md:w-1/2 flex justify-center">
          <Image
            src="/hero.jpeg"
            alt="Hero Image"
            width={600}
            height={400}
            className="rounded-2xl object-cover shadow-lg"
          />
        </div>
      </div>

      {latestBlogs.length > 0 ? (
        <div className="z-10 w-full max-w-6xl mt-10">
          <h2 className="md:text-4xl text-2xl font-bold text-center mb-5 text-white">
            Latest Blogs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {latestBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-gray-800 shadow-md hover:shadow-lg transition"
              >
                <img
                  src={blog.image}
                  alt="Blog Image"
                  className="w-full h-[220px] object-cover"
                />
                <div className="p-4">
                  <Link href={`/blog/${blog._id}`}>
                    <h3 className="text-lg font-semibold text-white hover:underline">
                      {blog.title}
                    </h3>
                  </Link>
                  <p className="text-gray-400 mt-2 line-clamp-3">
                    {blog.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="z-10 w-full max-w-4xl mt-20 text-center">
          <h1 className="text-4xl font-bold text-white">No Blogs Found</h1>
          <p className="text-gray-400 mt-3">
            Start by creating your first blog post!
          </p>
        </div>
      )}
    <div className="flex flex-col md:flex-row items-center justify-between gap-12 p-8 rounded-2xl text-gray-300 w-full max-w-6xl mx-auto mt-16">
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-4xl font-bold text-white mb-4">Join Our Community</h2>
        <p className="leading-relaxed text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, 
          vestibulum magna sed, convallis ex. Cras justo odio, dapibus ac facilisis in, egestas eget quam. 
          Nulla vitae elit libero, a pharetra augue. Aenean commodo ligula eget lacinia consequat.
        </p>
      </div>

      
      <div className="flex flex-row  gap-8 text-center md:text-left">
        <div>
          <h3 className="text-3xl font-bold text-white">500+</h3>
          <p className="text-sm text-gray-400">Writers</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-white">1200+</h3>
          <p className="text-sm text-gray-400">Readers</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-white">3000+</h3>
          <p className="text-sm text-gray-400">Blogs</p>
        </div>
      </div>
    </div>
    </main>
    <Footer/>
    </>
  );
}
