"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState<string | null>(null);

  const [editingService, setEditingService] = useState<any | null>(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  };

  const fetchServices = async () => {
    const data = await apiFetch("/services");
    setServices(data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const addService = async () => {
    if (!name || !price) return;

    setLoading(true);

    await apiFetch("/services", {
      method: "POST",
      body: JSON.stringify({
        name,
        price: Number(price),
      }),
    });

    setName("");
    setPrice("");
    setLoading(false);

    fetchServices();
    showToast("Service added ✅");
  };

  const deleteService = async (id: string) => {
    await apiFetch(`/services/${id}`, {
      method: "DELETE",
    });

    fetchServices();
    showToast("Service deleted ❌");
  };

  const toggleService = async (service: any) => {
    await apiFetch(`/services/${service.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        isActive: !service.isActive,
      }),
    });

    fetchServices();
    showToast(
      service.isActive ? "Service deactivated ⛔" : "Service activated ✅"
    );
  };

  const openEdit = (service: any) => {
    setEditingService(service);
    setEditName(service.name);
    setEditPrice(service.price);
  };

  const updateService = async () => {
    if (!editingService) return;

    await apiFetch(`/services/${editingService.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        name: editName,
        price: Number(editPrice),
      }),
    });

    setEditingService(null);
    fetchServices();
    showToast("Service updated ✏️");
  };

  return (
    <div className="min-h-screen bg-[#2b1d16] text-white p-4 space-y-6">

      {/* TOAST */}
      {toast && (
        <div className="fixed top-4 right-4 bg-[#1a120d] border border-[#3a2a21] px-4 py-2 rounded-lg shadow-lg animate-fadeIn">
          {toast}
        </div>
      )}

      <h1 className="text-2xl font-bold">Manage Services</h1>

      {/* ADD SERVICE */}
      <div className="bg-[#1a120d] p-4 rounded-xl space-y-3 shadow-lg">
        <input
          placeholder="Service name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded bg-black/30 outline-none"
        />

        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-3 rounded bg-black/30 outline-none"
        />

        <button
          onClick={addService}
          disabled={loading}
          className="bg-green-600 px-4 py-3 rounded w-full font-semibold hover:bg-green-700 transition"
        >
          {loading ? "Adding..." : "Add Service"}
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {services.map((s) => (
          <div
            key={s.id}
            className={`bg-[#1a120d] border border-[#3a2a21] p-4 rounded-xl space-y-3 ${
              !s.isActive ? "opacity-50" : ""
            }`}
          >

            {/* TOP */}
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-lg">{s.name}</p>
                <p className="text-sm text-gray-400">${s.price}</p>
              </div>

              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  s.isActive
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {s.isActive ? "Active" : "Inactive"}
              </span>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-wrap gap-2">

              <button
                onClick={() => toggleService(s)}
                className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded text-xs"
              >
                {s.isActive ? "Deactivate" : "Activate"}
              </button>

              <button
                onClick={() => openEdit(s)}
                className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded text-xs"
              >
                Edit
              </button>

              <button
                onClick={() => deleteService(s.id)}
                className="bg-red-500/20 text-red-400 px-3 py-1 rounded text-xs"
              >
                Delete
              </button>

            </div>

          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editingService && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="bg-[#1a120d] border border-[#3a2a21] rounded-xl p-6 w-full max-w-sm space-y-4">

            <h2 className="font-bold text-lg">Edit Service</h2>

            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full p-3 rounded bg-black/30"
            />

            <input
              value={editPrice}
              onChange={(e) => setEditPrice(e.target.value)}
              className="w-full p-3 rounded bg-black/30"
            />

            <div className="flex gap-3">

              <button
                onClick={updateService}
                className="bg-green-600 px-4 py-2 rounded w-full"
              >
                Save
              </button>

              <button
                onClick={() => setEditingService(null)}
                className="bg-gray-600 px-4 py-2 rounded w-full"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}