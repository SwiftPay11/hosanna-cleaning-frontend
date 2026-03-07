"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { io } from "socket.io-client";
import { apiFetch } from "@/lib/api";

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
    })
      
      .then((data) => {
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

    // Update instantly in UI
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status } : order
      )
    );
  };

  const revenue = orders.reduce((sum, o) => sum + o.total, 0);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Admin Dashboard...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-10">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Cleaning Service Admin Panel
          </h1>
          <p className="text-gray-600 mt-2">
            Manage all customer bookings and service statuses
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          <StatCard label="Total Orders" value={orders.length} />
          <StatCard label="Revenue" value={`$${revenue}`} color="text-green-600" />
          <StatCard
            label="Pending"
            value={orders.filter(o => o.status === "PENDING").length}
            color="text-yellow-600"
          />
          <StatCard
            label="Completed"
            value={orders.filter(o => o.status === "COMPLETED").length}
            color="text-blue-600"
          />
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow border p-8 overflow-x-auto">
          <h2 className="text-2xl font-semibold mb-6">
            All Cleaning Orders
          </h2>

          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-gray-500 text-sm">
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
  className="border-b hover:bg-blue-50 cursor-pointer"
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
                  <td className="font-semibold">
                    ${order.total}
                  </td>
                  <td>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="flex gap-2">

                    <button
                      onClick={() => updateStatus(order.id, "PENDING")}
                      className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full hover:bg-yellow-200"
                    >
                      Pending
                    </button>

                    <button
                      onClick={() => updateStatus(order.id, "COMPLETED")}
                      className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full hover:bg-green-200"
                    >
                      Complete
                    </button>

                    <button
                      onClick={() => updateStatus(order.id, "CANCELLED")}
                      className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-full hover:bg-red-200"
                    >
                      Cancel
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedOrder && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl shadow-xl p-8 max-w-lg w-full space-y-6">

      <h2 className="text-black font-bold">
        Order Details
      </h2>

      <div className="text-black space-y-2">

        <p>
          <strong>Full Order ID:</strong> {selectedOrder.id}
        </p>

        <p>
          <strong>User ID:</strong> {selectedOrder.user.id}
        </p>

        <p>
          <strong>Customer:</strong>{" "}
          {selectedOrder.user.firstName} {selectedOrder.user.lastName}
        </p>

        <p>
          <strong>Email:</strong> {selectedOrder.user.email}
        </p>

        <p>
          <strong>Schedule Date:</strong>{" "}
          {selectedOrder.scheduleDate || "Not scheduled"}
        </p>

        <p>
          <strong>Address:</strong>{" "}
          {selectedOrder.address || "Not provided"}
        </p>

        <p>
          <strong>Explanation:</strong>{" "}
          {selectedOrder.explanation || "None"}
        </p>

      </div>

      <div>
        <h3 className="font-semibold mb-2">Booked Services</h3>

        {selectedOrder.items?.map((item) => (
          <div
            key={item.id}
            className="flex justify-between text-black border-b py-1"
          >
            <span>{item.service.name}</span>
            <span>
              {item.quantity} × ${item.service.price}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={() => setSelectedOrder(null)}
        className="w-full bg-blue-600 text-white py-2 rounded-lg"
      >
        Close
      </button>

    </div>
  </div>
)}
    </div>
    </div>
  );

}

function StatCard({ label, value, color = "text-gray-900" }: any) {
  return (
    <div className="bg-white p-6 rounded-xl shadow border">
      <p className="text-gray-500 text-sm">{label}</p>
      <h3 className={`text-3xl font-bold mt-2 ${color}`}>
        {value}
      </h3>
    </div>
  );
}

function StatusBadge({ status }: any) {
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
}