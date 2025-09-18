"use client";

import { useState, useRef } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

export function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const blurTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = async () => {
    if (!searchInput.trim()) return;
    setLoading(true);
    type BlogType = {
      _id: string;
      title: string;
      description: string;
      image: string;
      content: string;
      author: string;
    };
    type SearchResponse = {
      success: boolean;
      message: string;
      blogs: BlogType[];
    };
    try {
      const res = await axios.get<SearchResponse>(
        `/api/blog/search?query=${searchInput}`
      );
      setBlogs(res.data.blogs || []);
      setOpen(true); 
    } catch (err) {
      console.error("Error searching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBlur = () => {
    blurTimeout.current = setTimeout(() => setOpen(false), 2000);
  };

  const handleFocus = () => {
    if (blurTimeout.current) {
      clearTimeout(blurTimeout.current);
      blurTimeout.current = null;
    }
  };

  return (
    <div className="flex flex-col gap-2 relative ">
      <div className="flex flex-row gap-2">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search Blogs here"
          className="border border-gray-300 rounded-md px-3 py-2 w-full outline-none"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <button
          onClick={handleSearch}
          className="top-3 right-5 text-stone-100 md:text-gray-200 absolute cursor-pointer  md:right-4 md:top-3 text-xl"
        >
          <FaSearch />
        </button>
      </div>

      {loading && <p className="text-gray-500">Searching...</p>}

      {open && (
        <div
          tabIndex={0}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className="absolute top-full left-0 bg-black border 
            [&::-webkit-scrollbar]:w-1
            [&::-webkit-scrollbar-track]:bg-gray-900
            [&::-webkit-scrollbar-thumb]:bg-blue-500
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb:hover]:bg-blue-600
            w-full mt-1 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50"
        >
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div key={blog._id} className="p-3 border-b hover:bg-gray-900">
                <a href={`/blog/${blog._id}`} className="font-semibold text-gray-200">
                  {blog.title}
                </a>
                <p className="text-sm text-gray-500">{blog.description}</p>
              </div>
            ))
          ) : (
            <div className="p-3 text-gray-500">
              No blogs found for "<span className="font-semibold text-gray-200">{searchInput}</span>"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
