"use client";

import Link from "next/link";
import React from "react";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { set } from "mongoose";

export default function Login() {
    const router = useRouter();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [loding, setLoding] = useState(false);
  const [message, setMessage] = React.useState("");

  const schema = z.object({
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
          email: string;
        };
      };
      setLoding(true);
      const res = await axios.post<SignupResponse>("/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      if (res.status === 200) {
        setLoding(false);
        toast.success("User Login successfully!");
        setMessage("User login successfully!");
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
        <h2 className="text-2xl font-medium">Log In</h2>
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
          disabled={loding}
          type="submit"
          className= {`w-full p-2 text-white rounded ${loding ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'}`}
        >
            Log In
        </button>

        {message && (
          <p className="text-sm text-rose-700 text-center">{message}</p>
        )}

        <div className="flex h-auto mt-5 items-center justify-center">
          <p>Create New account?</p>
          <Link
            href={"/signup"}
            className="text-blue-500 hover:underline ml-2"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
