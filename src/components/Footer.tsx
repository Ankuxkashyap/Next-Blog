import { FaLinkedin } from "react-icons/fa6";
import { RxGlobe } from "react-icons/rx";
import { FaGithub } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

export function Footer() {
    return (
        <footer className="w-full bg-black border-t border-gray-700">
  <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-12 text-gray-400">
    
    
    <div>
      <h2 className="text-2xl font-bold font-mono text-white mb-4">Blog <span className="text-blue-500">App</span> </h2>
      <p className="text-sm leading-relaxed">
        Share your thoughts, ideas, and stories with the world.  
        Join our community of writers and readers today.
      </p>
    </div>

   
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
      <ul className="space-y-2">
        <li><a href="/blog" className="hover:text-white">Browse Blogs</a></li>
        <li><a href="/blog/new" className="hover:text-white">Create Blog</a></li>
        <li><a href="/signup" className="hover:text-white">Join Community</a></li>
        <li><a href="/login" className="hover:text-white">Login</a></li>
      </ul>
    </div>


    <div>
      <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
      <ul className="space-y-2">
        <li><a href="#" className="hover:text-white">About Us</a></li>
        <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
        <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
        <li><a href="#" className="hover:text-white">Help Center</a></li>
      </ul>
    </div>

    
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
      <div className="flex gap-4 text-xl">
        <a href="#" className="hover:text-white"><FaGithub/></a>
        <a href="https://x.com/AnkuxKashyap" className="hover:text-white"><FaXTwitter/></a>
        <a href="#" className="hover:text-white"><FaInstagram/></a>
        <a href="https://www.linkedin.com/in/ankitkashyap-dev/" className="hover:text-white"><FaLinkedin/></a>
      </div>
    </div>
  </div>
  <div className="border-t border-gray-700 py-6 text-center text-sm text-gray-500">
    © {new Date().getFullYear()} BlogApp. All rights reserved.
  </div>
</footer>
    )
}