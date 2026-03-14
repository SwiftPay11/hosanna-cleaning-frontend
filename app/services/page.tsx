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
    <main className="min-h-screen bg-[#2b1d16] text-white py-20 px-6">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-[#caa27c] mb-6">
          Our Cleaning Services
        </h1>

        <p className="text-gray-400 mb-12 max-w-2xl">
          Choose from our professional cleaning services designed for homes,
          offices, rentals, and outdoor spaces.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          {services.map((service, index) => (
            <div
              key={index}
              onClick={() => router.push("/dashboard/book")}
              className="cursor-pointer bg-[#1a120d] border border-[#3a2a21] rounded-xl p-6 hover:border-[#caa27c] hover:shadow-lg hover:shadow-black/40 transition"
            >

              <h3 className="text-xl font-bold text-[#caa27c]">
                {service.name}
              </h3>

              <p className="mt-3 text-gray-400">
                {service.description}
              </p>

              <button
                className="mt-6 bg-[#6b3e26] text-white px-4 py-2 rounded-lg hover:bg-[#8a5234] transition"
              >
                Book Now
              </button>

            </div>
          ))}

        </div>

      </div>

    </main>
  );
}