"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

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
      const res = await apiFetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setSuccess("Account created successfully!");
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
      });

      // Optional: redirect after 2 seconds
      setTimeout(() => {
        router.push("/login");
      }, 2000);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center px-6">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-10">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="bg-blue-600 text-white w-14 h-14 mx-auto rounded-full flex items-center justify-center text-2xl mb-4 shadow-md">
            ✨
          </div>
          <h2 className="text-2xl font-bold text-blue-700">
            Create Account
          </h2>
          <p className="text-gray-500 text-sm">
            Join Hosanna Dry Cleaners
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-600 text-sm p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="bg-green-100 text-green-600 text-sm p-3 rounded-lg mb-4">
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="grid grid-cols-2 gap-4">
            <input
              name="firstName"
              value={form.firstName}
              placeholder="First Name"
              onChange={handleChange}
              required
              className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="lastName"
              value={form.lastName}
              placeholder="Last Name"
              onChange={handleChange}
              required
              className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <input
            name="email"
            type="email"
            value={form.email}
            placeholder="Email Address"
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="phone"
            value={form.phone}
            placeholder="Phone Number"
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="password"
            type="password"
            value={form.password}
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Register"}
          </button>

        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-blue-700 font-medium cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}
