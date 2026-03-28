"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import Link from "next/link";
import { Sparkles, Loader2 } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e:any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      localStorage.setItem("token", data.access_token);

      router.push("/dashboard");

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Server error");
      } else {
        setError("Server error");
      }
    } finally {
      setLoading(false);
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
  <div className="w-12 h-12 rounded-full overflow-hidden bg-white flex items-center justify-center">
    <Image
      src="/logo.jpeg"
      alt="Hosanna Logo"
      width={48}
      height={48}
      className="object-contain p-1"
    />
  </div>
</div>

          <h1 className="text-2xl font-bold text-white">
            HOSANNA GLOBAL ENTERPRISES LIMITED
          </h1>

          <p className="text-gray-400 text-sm mt-2">
            Professional Cleaning Services
          </p>

        </div>

        {/* Login Card */}
        <div className="bg-[#1a120d] border border-[#3a2a21] p-10 rounded-2xl shadow-2xl backdrop-blur">

          <h2 className="text-xl font-semibold text-white mb-6 text-center">
            Login to Your Account
          </h2>

          {error && (
            <p className="bg-red-900/40 text-red-400 p-3 rounded mb-4 text-sm">
              {error}
            </p>
          )}

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>
              <label className="text-sm text-gray-400">
                Email Address
              </label>

              <input
                type="email"
                placeholder="your@email.com"
                className="w-full mt-2 bg-[#2b1d16] border border-[#3a2a21] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#6b3e26]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-400">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                className="w-full mt-2 bg-[#2b1d16] border border-[#3a2a21] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#6b3e26]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Forgot Password */}
            <div className="text-right text-sm">
              <Link
                href="/forgot-password"
                className="text-[#caa27c] hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#6b3e26] text-white py-3 rounded-lg font-medium hover:bg-[#8a5234] transition flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="animate-spin" size={18} />}
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-400 mt-6">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="text-[#caa27c] hover:underline"
            >
              Create account
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}