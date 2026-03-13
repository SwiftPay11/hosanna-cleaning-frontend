"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { LayoutDashboard, LogOut } from "lucide-react";

interface Order {
  id: string;
  status: string;
  total: number;
  createdAt: string;

  address?: string;
  scheduleDate?: string;
  explanation?: string;

  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };

  items: {
    id: string;
    quantity: number;
    service: {
      name: string;
      price: number;
    };
  }[];
}

export default function AdminPage() {
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/admin/login");
      return;
    }

    apiFetch("/orders", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, [router]);

  const updateStatus = async (id: string, status: string) => {
    const token = localStorage.getItem("token");

    await apiFetch(`/orders/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status } : order
      )
    );
  };

  const revenue = orders.reduce((sum, o) => sum + o.total, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#2b1d16] text-white">
        Loading Admin Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#2b1d16] text-white">

      {/* Sidebar */}
      <aside className="w-64 bg-[#1a120d] border-r border-[#3a2a21] p-6 flex flex-col justify-between">

        <div>
          <h2 className="text-xl font-bold mb-10">
            Hosanna Global Cleaning
          </h2>

          <div className="flex items-center gap-3 text-[#caa27c]">
            <LayoutDashboard size={18} />
            Dashboard
          </div>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/");
          }}
          className="flex items-center gap-2 text-red-400 hover:text-red-500"
        >
          <LogOut size={18} />
          Logout
        </button>

      </aside>

      {/* Main */}
      <main className="flex-1 p-10 space-y-10">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">
            Admin Control Panel
          </h1>
          <p className="text-gray-400">
            Manage all cleaning bookings and customer services
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6">

          <StatCard label="Total Orders" value={orders.length} />

          <StatCard
            label="Revenue"
            value={`$${revenue}`}
            color="text-green-400"
          />

          <StatCard
            label="Pending"
            value={orders.filter(o => o.status === "PENDING").length}
            color="text-yellow-400"
          />

          <StatCard
            label="Completed"
            value={orders.filter(o => o.status === "COMPLETED").length}
            color="text-blue-400"
          />

        </div>

        {/* Orders Table */}
        <div className="bg-[#1a120d] border border-[#3a2a21] rounded-xl p-8 overflow-x-auto">

          <h2 className="text-xl font-semibold mb-6">
            All Cleaning Orders
          </h2>

          <table className="w-full text-left">

            <thead>
              <tr className="border-b border-[#3a2a21] text-gray-400 text-sm">
                <th className="py-3">Order ID</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Status</th>
                <th>Total</th>
                <th>Date</th>
                <th>Update</th>
              </tr>
            </thead>

            <tbody>

              {orders.map((order) => (

                <tr
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className="border-b border-[#3a2a21] hover:bg-[#2b1d16] cursor-pointer"
                >

                  <td className="py-4 font-medium">
                    {order.id.slice(0, 8)}...
                  </td>

                  <td>
                    {order.user.firstName} {order.user.lastName}
                  </td>

                  <td>{order.user.email}</td>

                  <td>
                    <StatusBadge status={order.status} />
                  </td>

                  <td className="font-semibold text-[#caa27c]">
                    ${order.total}
                  </td>

                  <td>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  <td className="flex gap-2">

                    <button
                      onClick={() => updateStatus(order.id, "PENDING")}
                      className="px-3 py-1 text-xs bg-yellow-500/20 text-yellow-400 rounded-full"
                    >
                      Pending
                    </button>

                    <button
                      onClick={() => updateStatus(order.id, "COMPLETED")}
                      className="px-3 py-1 text-xs bg-green-500/20 text-green-400 rounded-full"
                    >
                      Complete
                    </button>

                    <button
                      onClick={() => updateStatus(order.id, "CANCELLED")}
                      className="px-3 py-1 text-xs bg-red-500/20 text-red-400 rounded-full"
                    >
                      Cancel
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </main>

      {/* Modal */}
      {selectedOrder && (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="bg-[#1a120d] border border-[#3a2a21] rounded-xl shadow-xl p-8 max-w-lg w-full space-y-6">

            <h2 className="font-bold text-lg">
              Order Details
            </h2>

            <div className="space-y-2 text-gray-300">

              <p><strong>ID:</strong> {selectedOrder.id}</p>

              <p>
                <strong>Customer:</strong> {selectedOrder.user.firstName} {selectedOrder.user.lastName}
              </p>

              <p><strong>Email:</strong> {selectedOrder.user.email}</p>

              <p><strong>Address:</strong> {selectedOrder.address || "Not provided"}</p>

              <p><strong>Schedule:</strong> {selectedOrder.scheduleDate || "Not scheduled"}</p>

              <p><strong>Notes:</strong> {selectedOrder.explanation || "None"}</p>

            </div>

            <div>
              <h3 className="font-semibold mb-2">Services</h3>

              {selectedOrder.items?.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between border-b border-[#3a2a21] py-1"
                >
                  <span>{item.service.name}</span>
                  <span>{item.quantity} × ${item.service.price}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full bg-[#6b3e26] py-2 rounded-lg hover:bg-[#8a5234]"
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

function StatCard({ label, value, color = "text-white" }: any) {
  return (
    <div className="bg-[#1a120d] border border-[#3a2a21] p-6 rounded-xl">
      <p className="text-gray-400 text-sm">{label}</p>
      <h3 className={`text-3xl font-bold mt-2 ${color}`}>
        {value}
      </h3>
    </div>
  );
}

function StatusBadge({ status }: any) {

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
}