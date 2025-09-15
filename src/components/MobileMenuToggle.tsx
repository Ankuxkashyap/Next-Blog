"use client";

import { HiMenu } from "react-icons/hi";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import { Search } from "@/components/Search";
export function MobileMenuToggle({
  user,
}: {
  user: { id: string; username: string; email: string } | null;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  
  return (
    <div className="md:hidden cursor-pointer">
      {isOpen ? (
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="text-3xl"
        >
          <i>
            <IoClose />
          </i>
        </button>
      ) : (
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="text-3xl"
        >
          <i>
            <HiMenu />
          </i>
        </button>
      )}

      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-black shadow-lg flex flex-col items-center gap-4 py-4 z-50">
          <Link href="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link href="/dashboard" onClick={() => setIsOpen(false)}>
            Dashboard
          </Link>
          <Link href="/about" onClick={() => setIsOpen(false)}>
            About
          </Link>
          {user ? (
            <Link href="/profile" onClick={() => setIsOpen(false)}>
              Profile
            </Link>
          ) : (
            <Link href="/login" onClick={() => setIsOpen(false)}>
              Login
            </Link>
          )}
          <div onClick={()=>{setIsSearchOpen(!isSearchOpen)}}>Search</div>
          {
            isSearchOpen && <Search/>
          }
        </div>
      )}
    </div>
  );
}
