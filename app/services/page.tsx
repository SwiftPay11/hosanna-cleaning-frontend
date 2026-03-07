"use client";

import { useRouter } from "next/navigation";

export default function ServicesPage() {
  const router = useRouter();

  const services = [
    {
      name: "Domestic / Residential Cleaning",
      description:
        "Professional home cleaning to keep your living space fresh and healthy.",
    },
    {
      name: "Office / Commercial Cleaning",
      description:
        "Complete office cleaning for a clean and productive workplace.",
    },
    {
      name: "Airbnb & Rental Cleaning",
      description:
        "Reliable cleaning for Airbnb hosts and rental property owners.",
    },
    {
      name: "Move-In / Move-Out Cleaning",
      description:
        "Deep cleaning before moving in or after moving out.",
    },
    {
      name: "End of Tenancy Cleaning",
      description:
        "Detailed cleaning service for tenants and landlords before handover.",
    },
    {
      name: "Backyard & Street Cleaning",
      description:
        "Outdoor cleaning for backyards, compounds, and surrounding areas.",
    },
  ];

  return (
    <main className="py-20 px-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">
        Our Cleaning Services
      </h1>

      <p className="text-gray-600 mb-12 max-w-2xl">
        Choose from our professional cleaning services designed for homes,
        offices, rentals, and outdoor spaces.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            onClick={() => router.push("/dashboard/book")}
            className="cursor-pointer bg-white border border-blue-100 rounded-xl p-6 shadow-sm hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold text-blue-700">
              {service.name}
            </h3>

            <p className="mt-3 text-gray-600">
              {service.description}
            </p>

            <button
              className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}