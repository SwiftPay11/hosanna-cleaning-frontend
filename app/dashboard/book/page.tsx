"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

interface Service {
  id: string;
  name: string;
  price: number;
}

export default function BookCleaningPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServices, setSelectedServices] = useState<any[]>([]);
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");

  const token = typeof window !== "undefined"
    ? localStorage.getItem("token")
    : null;

  useEffect(() => {
  if (!token) {
    router.push("/login");
    return;
  }

  apiFetch("/services")
    
    .then(data => {
      const flyerServices = [
        {
          id: "domestic-cleaning",
          name: "Domestic / Residential Cleaning",
          price: 5000,
        },
        {
          id: "office-cleaning",
          name: "Office / Commercial Cleaning",
          price: 8000,
        },
        {
          id: "airbnb-cleaning",
          name: "Airbnb & Rental Cleaning",
          price: 7000,
        },
        {
          id: "move-cleaning",
          name: "Move-In / Move-Out Cleaning",
          price: 9000,
        },
        {
          id: "tenancy-cleaning",
          name: "End of Tenancy Cleaning",
          price: 8500,
        },
        {
          id: "backyard-cleaning",
          name: "Backyard & Street Cleaning",
          price: 6000,
        },
      ];

      const merged = [...data];

      flyerServices.forEach(service => {
        if (!merged.find((s: any) => s.name === service.name)) {
          merged.push(service);
        }
      });

      setServices(merged);
    });
}, [router]);

  const toggleService = (service: Service) => {
    const exists = selectedServices.find(s => s.id === service.id);

    if (exists) {
      setSelectedServices(selectedServices.filter(s => s.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, { ...service, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    setSelectedServices(prev =>
      prev.map(s =>
        s.id === id ? { ...s, quantity } : s
      )
    );
  };

  const total = selectedServices.reduce(
    (sum, s) => sum + s.price * s.quantity,
    0
  );

  const handleSubmit = async () => {
    await apiFetch("/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
     body: JSON.stringify({
  address,
  scheduleDate: date,

  items: selectedServices.map((s) => ({
    serviceId: s.id,
    quantity: s.quantity,
  })),
}),
    });

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-5xl mx-auto bg-white p-10 rounded-2xl shadow-lg">

        {/* STEP INDICATOR */}
        <div className="flex justify-between mb-10">
          {["Services", "Schedule", "Review"].map((label, i) => (
            <div key={i} className={`flex-1 text-center ${step === i + 1 ? "font-bold text-blue-600" : "text-gray-400"}`}>
              {label}
            </div>
          ))}
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">
              Select Cleaning Services
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {services.map(service => (
                <div
                  key={service.id}
                  onClick={() => toggleService(service)}
                  className={`p-6 border rounded-xl cursor-pointer transition ${
                    selectedServices.find(s => s.id === service.id)
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  <h3 className="font-semibold">{service.name}</h3>
                  <p className="text-gray-600">${service.price}</p>
                </div>
              ))}
            </div>

            <button
              disabled={selectedServices.length === 0}
              onClick={() => setStep(2)}
              className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">
              Schedule & Address
            </h2>

            <input
              type="text"
              placeholder="Enter cleaning address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 mb-6"
            />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
            />

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 border rounded-lg"
              >
                Back
              </button>

              <button
                disabled={!address || !date}
                onClick={() => setStep(3)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">
              Review Your Booking
            </h2>

            <div className="space-y-4 mb-6">
              {selectedServices.map(s => (
                <div key={s.id} className="flex justify-between">
                  <span>{s.name}</span>
                  <span>
                    {s.quantity} × ${s.price}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total}</span>
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 border rounded-lg"
              >
                Back
              </button>

              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-6 py-3 rounded-lg"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}