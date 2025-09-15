
import { createBlogPost } from "@/app/actions/blog";

export default function NewBlogPage() {
  return (
    <div className="flex ml-2 mr-2 flex-col justify-center items-center py-10">
      <div className="w-full max-w-2xl p-8 bg-gray-900 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          Create New Blog Post
        </h1>

        <form className="space-y-6" action={createBlogPost}>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter a catchy title"
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300">
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Short description"
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-300">
              Image URL
            </label>
            <input
              type="text"
              id="image"
              name="image"
              placeholder="https://example.com/blog-image.jpg"
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-300">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              placeholder="Write in markdown... #heading **bold** -list"
              rows={8}
              className="mt-1 resize-none block w-full px-2 md:px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white outline-none"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
