"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useRouter } from "next/navigation";
import { Plus, LogOut } from "lucide-react";
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
    })
      
      .then((data) => setUser(data));

    apiFetch("/orders/my", {
      headers: { Authorization: `Bearer ${token}` },
    })
      
      .then((data) => {
        setOrders(data);
        setLoading(false);
      });
  }, [router]);

useEffect(() => {
  if (!user?.id) return;

  const socket = io("http://localhost:3003", {
    query: {
      userId: user.id,
    },
  });

  socket.on("orderUpdated", (updatedOrder) => {
    toast.success(`Order is now ${updatedOrder.status}`);

    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      )
    );
  });

  return () => {
    socket.disconnect();
  };
}, [user?.id]);

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const getStatusBadge = (status: string) => {
    const styles: any = {
      PENDING: "bg-yellow-100 text-yellow-700",
      COMPLETED: "bg-green-100 text-green-700",
      CANCELLED: "bg-red-100 text-red-700",
    };

    return (
      <span
        className={`px-3 py-1 text-xs font-semibold rounded-full ${
          styles[status] || "bg-gray-100 text-gray-700"
        }`}
      >
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-8">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
           <h1 className="text-4xl font-bold text-gray-900">
  Welcome back{user?.firstName ? `, ${user.firstName}` : ""} 👋
</h1>
            <p className="text-gray-600 mt-2">
              Manage your home & office cleaning services
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => router.push("/dashboard/book")}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
            >
              <Plus size={18} />
              Book Cleaning
            </button>

            <button
              onClick={logout}
              className="flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-xl hover:bg-gray-100 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border">
            <p className="text-gray-500 text-sm">Total Bookings</p>
            <h3 className="text-3xl font-bold mt-3 text-blue-600">
              {orders.length}
            </h3>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border">
            <p className="text-gray-500 text-sm">Completed Services</p>
            <h3 className="text-3xl font-bold mt-3 text-green-600">
              {orders.filter((o) => o.status === "COMPLETED").length}
            </h3>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border">
            <p className="text-gray-500 text-sm">Pending Services</p>
            <h3 className="text-3xl font-bold mt-3 text-yellow-600">
              {orders.filter((o) => o.status === "PENDING").length}
            </h3>
          </div>
        </div>

        {/* ORDERS SECTION */}
        <div className="bg-white rounded-2xl shadow-sm border p-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              My Cleaning Bookings
            </h2>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 mb-6">
                You haven't booked any cleaning services yet.
              </p>
              <button
                onClick={() => router.push("/dashboard/book")}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Book Your First Cleaning
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b text-gray-500 text-sm">
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
                      className="border-b hover:bg-blue-50 transition"
                    >
                      <td className="py-4 font-medium text-gray-800">
                        {order.id.slice(0, 8)}...
                      </td>
                      <td>{getStatusBadge(order.status)}</td>
                      <td className="font-semibold text-gray-900">
                        ${order.total}
                      </td>
                      <td className="text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}