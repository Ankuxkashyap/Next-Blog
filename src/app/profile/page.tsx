import LogoutButton from "@/components/LogoutButton";

export default function Profile() {
  const user = { 
    id: "123", 
    username: "john_doe", 
    email: "johndoe@gmail.com",
    bio: "Full-stack developer passionate about Next.js & AI 🚀",
  };

  return (
    <div className="flex flex-col h-[90%] items-center mt-20 px-4 py-10 bg-gray-950 text-gray-100">
      <div className="w-full  md:max-w-xl p-8 bg-gray-900 rounded-2xl shadow-xl border border-gray-800">
        
        {/* Avatar + Username */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <h1 className="mt-4 text-2xl font-bold">{user.username}</h1>
          <p className="text-gray-400">{user.email}</p>
          <p className="mt-2 text-sm text-center text-gray-300">{user.bio}</p>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-800"></div>

        {/* User Info */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="font-medium text-gray-300">User ID</span>
            <span className="text-gray-500">{user.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-300">Email</span>
            <span className="text-gray-500">{user.email}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-center gap-4">
          <button className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
            Edit Profile
          </button>
          <LogoutButton/>
        </div>
      </div>
    </div>
  );
}
