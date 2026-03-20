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
    <div className="min-h-screen bg-[#2b1d16] text-white">

      {/* MOBILE HEADER */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-[#3a2a21] bg-[#1a120d]">
        <h2 className="font-bold">Admin Panel</h2>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/");
          }}
          className="text-red-400"
        >
          Logout
        </button>
      </div>

      <div className="flex">

        {/* DESKTOP SIDEBAR */}
        <aside className="hidden md:flex w-64 bg-[#1a120d] border-r border-[#3a2a21] p-6 flex-col justify-between">

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

        {/* MAIN */}
        <main className="flex-1 p-4 md:p-10 space-y-6 md:space-y-10">

          {/* HEADER */}
          <div>
            <h1 className="text-xl md:text-3xl font-bold">
              Admin Control Panel
            </h1>
            <p className="text-gray-400 text-sm md:text-base">
              Manage all cleaning bookings
            </p>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">

            <StatCard label="Orders" value={orders.length} />

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
              label="Done"
              value={orders.filter(o => o.status === "COMPLETED").length}
              color="text-blue-400"
            />

          </div>

          {/* DESKTOP TABLE */}
          <div className="hidden md:block bg-[#1a120d] border border-[#3a2a21] rounded-xl p-6 overflow-x-auto">

            <h2 className="text-xl font-semibold mb-6">
              Orders
            </h2>

            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#3a2a21] text-gray-400 text-sm">
                  <th className="py-3">ID</th>
                  <th>Customer</th>
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
                    className="border-b border-[#3a2a21] hover:bg-[#2b1d16]"
                  >
                    <td className="py-4">{order.id.slice(0, 6)}</td>

                    <td>
                      {order.user.firstName} {order.user.lastName}
                    </td>

                    <td>
                      <StatusBadge status={order.status} />
                    </td>

                    <td>${order.total}</td>

                    <td>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>

                    <td className="flex gap-2 flex-wrap">
                      <button
                        onClick={() => updateStatus(order.id, "PENDING")}
                        className="px-2 py-1 text-xs bg-yellow-500/20 text-yellow-400 rounded"
                      >
                        Pending
                      </button>

                      <button
                        onClick={() => updateStatus(order.id, "COMPLETED")}
                        className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded"
                      >
                        Done
                      </button>

                      <button
                        onClick={() => updateStatus(order.id, "CANCELLED")}
                        className="px-2 py-1 text-xs bg-red-500/20 text-red-400 rounded"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARDS */}
          <div className="md:hidden space-y-4">

            {orders.map((order) => (

              <div
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className="bg-[#1a120d] border border-[#3a2a21] rounded-xl p-4 space-y-3"
              >

                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">
                    {order.id.slice(0, 6)}
                  </span>
                  <StatusBadge status={order.status} />
                </div>

                <p className="font-semibold">
                  {order.user.firstName} {order.user.lastName}
                </p>

                <p className="text-sm text-gray-400">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>

                <p className="text-[#caa27c] font-bold">
                  ${order.total}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateStatus(order.id, "PENDING");
                    }}
                    className="px-2 py-1 text-xs bg-yellow-500/20 text-yellow-400 rounded"
                  >
                    Pending
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateStatus(order.id, "COMPLETED");
                    }}
                    className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded"
                  >
                    Done
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateStatus(order.id, "CANCELLED");
                    }}
                    className="px-2 py-1 text-xs bg-red-500/20 text-red-400 rounded"
                  >
                    Cancel
                  </button>

                </div>

              </div>

            ))}

          </div>

        </main>
      </div>

      {/* MODAL (UNCHANGED) */}
      {selectedOrder && (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="bg-[#1a120d] border border-[#3a2a21] rounded-xl shadow-xl p-6 max-w-lg w-full space-y-6">

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
    <div className="bg-[#1a120d] border border-[#3a2a21] p-4 md:p-6 rounded-xl">
      <p className="text-gray-400 text-xs md:text-sm">{label}</p>
      <h3 className={`text-xl md:text-3xl font-bold mt-2 ${color}`}>
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
      className={`px-2 md:px-3 py-1 text-xs font-semibold rounded-full ${
        styles[status] || "bg-gray-500/20 text-gray-400"
      }`}
    >
      {status}
    </span>
  );
}