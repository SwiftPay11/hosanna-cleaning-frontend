"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import Link from "next/link";
import { Sparkles, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
  const data = await apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(form),
  });

  setSuccess("Account created successfully!");

  setForm({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  setTimeout(() => {
    router.push("/login");
  }, 2000);

} catch (err: any) {
  setError(err.message || "Registration failed");
} finally {
  setLoading(false);
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative px-6">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('/cleaning-bg.jpg')" }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#2b1d16]/90" />

      <div className="relative w-full max-w-md">

        {/* Branding */}
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
            Create your cleaning service account
          </p>

        </div>

        {/* Register Card */}
        <div className="bg-[#1a120d] border border-[#3a2a21] p-10 rounded-2xl shadow-2xl backdrop-blur">

          <h2 className="text-xl font-semibold text-white mb-6 text-center">
            Create Account
          </h2>

          {error && (
            <div className="bg-red-900/40 text-red-400 text-sm p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-900/40 text-green-400 text-sm p-3 rounded-lg mb-4">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Names */}
            <div className="grid grid-cols-2 gap-4">

              <div>
                <label className="text-sm text-gray-400">
                  First Name
                </label>

                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  required
                  className="w-full mt-2 bg-[#2b1d16] border border-[#3a2a21] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#6b3e26]"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">
                  Last Name
                </label>

                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  required
                  className="w-full mt-2 bg-[#2b1d16] border border-[#3a2a21] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#6b3e26]"
                />
              </div>

            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-400">
                Email Address
              </label>

              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                className="w-full mt-2 bg-[#2b1d16] border border-[#3a2a21] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#6b3e26]"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm text-gray-400">
                Phone Number
              </label>

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+234 800 000 0000"
                required
                className="w-full mt-2 bg-[#2b1d16] border border-[#3a2a21] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#6b3e26]"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-400">
                Password
              </label>

              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
                className="w-full mt-2 bg-[#2b1d16] border border-[#3a2a21] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#6b3e26]"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#6b3e26] text-white py-3 rounded-lg font-medium hover:bg-[#8a5234] transition flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="animate-spin" size={18} />}
              {loading ? "Creating account..." : "Create Account"}
            </button>

          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-400 mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#caa27c] hover:underline"
            >
              Login
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}