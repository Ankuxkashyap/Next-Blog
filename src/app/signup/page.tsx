"use client";

import Link from "next/link";
import React from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    userName: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = React.useState("");
  const [loding, setLoding] = React.useState(false);

  const schema = z.object({
    userName: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validatedData = schema.safeParse(formData);

      if (!validatedData.success) {
        setMessage(validatedData.error.issues[0].message); 
        return;
      }

      type SignupResponse = {
        message: string;
        user?: {
          _id: string;
          username: string;
          email: string;
        };
      };
      const res = await axios.post<SignupResponse>("/api/auth/signup", {
        username: formData.userName,
        email: formData.email,
        password: formData.password,
      });
      console.log(res.data)
      if (res.status === 201) {
        toast.success("User created successfully!");
        setMessage("User created successfully!");
        router.push("/profile")
      } else {
        setMessage(res.data.message || "An error occurred");
      }


      setMessage("");
      
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="flex flex-row h-auto mt-30 md:mt-50 items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="p-8 rounded-xl shadow-md w-100 space-y-4"
      >
        <h2 className="text-2xl font-medium">SignUp</h2>

        <input
          type="text"
          placeholder="Username"
          value={formData.userName}
          onChange={(e) =>
            setFormData({ ...formData, userName: e.target.value })
          }
          className="w-full p-2 border rounded"
        />

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          className="w-full p-2 border rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          disabled={loding}
          className= {`w-full p-2 text-white rounded ${loding ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'}`}
        >
          Sign Up
        </button>

        {message && (
          <p className="text-sm text-rose-700 text-center">{message}</p>
        )}

        <div className="flex h-auto mt-5 items-center justify-center">
          <p>Already have an account?</p>
          <Link
            href={"/login"}
            className="text-blue-500 hover:underline ml-2"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
