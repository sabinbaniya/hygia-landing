"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { PrimaryFont } from "@/lib/fonts/primary";
import { signOut } from "@/utils/auth";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed flex justify-between items-center gap-8 px-4 sm:px-8 py-2 z-50 w-full transition-colors duration-300 ${
        scrolled ? "bg-white" : "bg-transparent"
      }`}
    >
      <p
        className={`${PrimaryFont.className} text-xl font-semibold text-center py-4 text-[#1E5233]`}
      >
        Hygia Lens
      </p>
      <div className="flex flex-row gap-2 py-2">
        <Button size="md" variant="outline">
          Upcomming Features
        </Button>
        {user?.role === "authenticated" && (
          <Button size="md" onClick={signOut}>
            Sign Out
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
