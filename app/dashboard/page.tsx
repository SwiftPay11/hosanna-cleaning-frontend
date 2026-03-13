"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useRouter } from "next/navigation";
import {
  Plus,
  LogOut,
  LayoutDashboard,
  CalendarCheck,
  User,
  Settings,
} from "lucide-react";
import toast from "react-hot-toast";
import { apiFetch } from "@/lib/api";

interface Order {
  id: string;
  status: string;
  total: number;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    apiFetch("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((data) => setUser(data));

    apiFetch("/orders/my", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, [router]);

  useEffect(() => {
  if (!user?.id) return;

  const socket = io("https://hosanna-cleaning-backend.onrender.com", {
    query: { userId: user.id }
  });

  socket.on("orderUpdated", (updatedOrder) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      )
    );
  });

  return () => {
    socket.disconnect(); // ✅ correct cleanup
  };
}, [user?.id]);

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const getStatusBadge = (status: string) => {
    const styles: any = {
      PENDING: "bg-yellow-500/20 text-yellow-400",
      COMPLETED: "bg-green-500/20 text-green-400",
      CANCELLED: "bg-red-500/20 text-red-400",
    };

    return (
      <span
        className={`px-3 py-1 text-xs font-semibold rounded-full ${
          styles[status] || "bg-gray-500/20 text-gray-400"
        }`}
      >
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#2b1d16]">
        <p className="text-gray-400 text-lg">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#2b1d16] text-white">

      {/* SIDEBAR */}
      <aside className="w-64 bg-[#1a120d] border-r border-[#3a2a21] p-6 hidden md:flex flex-col justify-between">

        <div>
          <h2 className="text-xl font-bold mb-10">
            Hosanna Cleaning
          </h2>

          <nav className="space-y-4">

            <div className="flex items-center gap-3 text-[#caa27c]">
              <LayoutDashboard size={18} />
              Dashboard
            </div>

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

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

          <div>
            <h1 className="text-3xl font-bold">
              Welcome back{user?.firstName ? `, ${user.firstName}` : ""} 👋
            </h1>

            <p className="text-gray-400 mt-2">
              Manage your cleaning bookings and services
            </p>
          </div>

          <button
            onClick={() => router.push("/dashboard/book")}
            className="flex items-center gap-2 bg-[#6b3e26] px-6 py-3 rounded-lg hover:bg-[#8a5234] transition"
          >
            <Plus size={18} />
            Book Cleaning
          </button>

        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-[#1a120d] p-6 rounded-xl border border-[#3a2a21]">
            <p className="text-gray-400 text-sm">Total Bookings</p>
            <h3 className="text-3xl font-bold text-[#caa27c] mt-2">
              {orders.length}
            </h3>
          </div>

          <div className="bg-[#1a120d] p-6 rounded-xl border border-[#3a2a21]">
            <p className="text-gray-400 text-sm">Completed</p>
            <h3 className="text-3xl font-bold text-green-400 mt-2">
              {orders.filter((o) => o.status === "COMPLETED").length}
            </h3>
          </div>

          <div className="bg-[#1a120d] p-6 rounded-xl border border-[#3a2a21]">
            <p className="text-gray-400 text-sm">Pending</p>
            <h3 className="text-3xl font-bold text-yellow-400 mt-2">
              {orders.filter((o) => o.status === "PENDING").length}
            </h3>
          </div>

        </div>

        {/* BOOKINGS */}
        <div className="bg-[#1a120d] rounded-xl border border-[#3a2a21] p-8">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-xl font-semibold">
              My Cleaning Bookings
            </h2>

          </div>

          {orders.length === 0 ? (

            <div className="text-center py-16">

              <p className="text-gray-400 mb-6">
                You haven't booked any cleaning services yet.
              </p>

              <button
                onClick={() => router.push("/dashboard/book")}
                className="bg-[#6b3e26] px-6 py-3 rounded-lg hover:bg-[#8a5234]"
              >
                Book Your First Cleaning
              </button>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full text-left">

                <thead>
                  <tr className="border-b border-[#3a2a21] text-gray-400 text-sm">
                    <th className="py-4">Booking ID</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>

                  {orders.map((order) => (

                    <tr
                      key={order.id}
                      className="border-b border-[#3a2a21] hover:bg-[#2b1d16] transition"
                    >

                      <td className="py-4 font-medium">
                        {order.id.slice(0, 8)}...
                      </td>

                      <td>{getStatusBadge(order.status)}</td>

                      <td className="font-semibold text-[#caa27c]">
                        ${order.total}
                      </td>

                      <td className="text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </main>
    </div>
  );
}