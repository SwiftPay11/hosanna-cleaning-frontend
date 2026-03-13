"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  User,
  Settings,
  LogOut,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div className="min-h-screen flex bg-[#2b1d16] text-white">

      {/* DESKTOP SIDEBAR */}
      <aside className="w-64 bg-[#1a120d] border-r border-[#3a2a21] p-6 hidden md:flex flex-col justify-between">

        <div>
          <h2 className="text-xl font-bold mb-10">
            Hosanna Cleaning
          </h2>

          <nav className="space-y-4">

            <button
              onClick={() => router.push("/dashboard")}
              className="flex items-center gap-3 text-[#caa27c]"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </button>

            <button
              onClick={() => router.push("/dashboard/book")}
              className="flex items-center gap-3 text-gray-300 hover:text-[#caa27c]"
            >
              <CalendarCheck size={18} />
              Book Cleaning
            </button>

            <div className="flex items-center gap-3 text-gray-400">
              <User size={18} />
              Profile
            </div>

            <div className="flex items-center gap-3 text-gray-400">
              <Settings size={18} />
              Settings
            </div>

          </nav>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 text-red-400 hover:text-red-500"
        >
          <LogOut size={18} />
          Logout
        </button>

      </aside>

      {/* PAGE CONTENT */}
      <div className="flex-1">

        {/* MOBILE HEADER */}
        <div className="md:hidden p-4 flex justify-between items-center bg-[#1a120d]">
          <button onClick={() => setMenuOpen(true)}>☰</button>
          <h2 className="font-bold">Hosanna Cleaning</h2>
        </div>

        {children}

      </div>

      {/* MOBILE SIDEBAR */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">

          <div className="w-64 bg-[#1a120d] p-6">

            <button
              onClick={() => setMenuOpen(false)}
              className="mb-6"
            >
              ✕
            </button>

            <nav className="space-y-4">

              <button
                onClick={() => router.push("/dashboard")}
                className="flex items-center gap-3"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </button>

              <button
                onClick={() => router.push("/dashboard/book")}
                className="flex items-center gap-3"
              >
                <CalendarCheck size={18} />
                Book Cleaning
              </button>

            </nav>

          </div>

          <div
            className="flex-1 bg-black/50"
            onClick={() => setMenuOpen(false)}
          />

        </div>
      )}

    </div>
  );
}