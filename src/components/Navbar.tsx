import Link from "next/link";
import { getIdFromCookie } from "@/lib/auth";
import { getUser } from "@/app/actions/user";
import { MobileMenuToggle } from "@/components/MobileMenuToggle";
import { Search } from "./Search"; // client component ✅

export default async function Navbar() {
  
  const id = await getIdFromCookie();
  const user = id ? await getUser(id) : null;

  const safeUser =
    user && user._id
      ? {
          id: user._id.toString(),
          username: user.username,
          email: user.email,
        }
      : null;

  return (
    <div className="w-full border-b border-gray-700 h-auto font-medium shadow-md flex items-center px-5 py-3 justify-between">
      {/* Left Side: Logo + Links */}
      <div className="flex items-center gap-10">
        <Link href="/" className="font-mono text-4xl">
          Blog<span className="text-4xl text-blue-500">App</span>
        </Link>

        <div className="hidden md:flex gap-6 text-xl">
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
        </div>
      </div>

      
      <MobileMenuToggle user={safeUser} />

      {/* Right Side: Search + Auth Buttons */}
      <div className="hidden md:flex flex-row gap-5 items-center">
        <Search />
        {user ? (
          <Link href="/blog/new">
            <button className="bg-blue-500 text-white px-4 py-1 md:px-5 md:py-2 cursor-pointer rounded hover:bg-blue-600 transition">
              Create Post
            </button>
          </Link>
        ) : (
          <Link href="/signup">
            <button className="bg-blue-500 text-white px-4 py-1 md:px-4 md:py-2 cursor-pointer rounded hover:bg-blue-600 transition">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
