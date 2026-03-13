"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { Sparkles } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const data = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      localStorage.setItem("token", data.access_token);

      router.push("/admin");

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Server error");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative px-6">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: "url('/cleaning-bg.jpg')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#2b1d16]/90" />

      <div className="relative w-full max-w-md">

        {/* Company Branding */}
        <div className="text-center mb-8">

          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-[#6b3e26] rounded-full flex items-center justify-center">
              <Sparkles className="text-white" size={20} />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white">
            Hosanna Global Cleaning
          </h1>

          <p className="text-gray-400 text-sm mt-2">
            Admin Control Panel
          </p>

        </div>

        {/* Login Card */}
        <div className="bg-[#1a120d] border border-[#3a2a21] p-10 rounded-2xl shadow-2xl backdrop-blur">

          <h2 className="text-xl font-semibold text-white mb-6 text-center">
            Admin Login
          </h2>

          {error && (
            <div className="bg-red-900/40 text-red-400 p-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>
              <label className="text-sm text-gray-400">
                Admin Email
              </label>

              <input
                type="email"
                placeholder="admin@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 bg-[#2b1d16] border border-[#3a2a21] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#6b3e26]"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-400">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 bg-[#2b1d16] border border-[#3a2a21] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#6b3e26]"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-[#6b3e26] text-white py-3 rounded-lg font-medium hover:bg-[#8a5234] transition"
            >
              Login as Admin
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}