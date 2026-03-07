"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Shirt,
  Sparkles,
  Truck,
  ShieldCheck,
  Leaf,
  Clock,
   MapPin,
    Phone, 
    Mail,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="font-sans text-gray-900">

      {/* ================= NAVBAR ================= */}
      <nav className="bg-white/90 backdrop-blur sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex justify-between items-center">

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <Sparkles size={18} className="text-white" />
            </div>
            <span className="text-xl font-semibold text-blue-700">
              Hosanna Global Cleaning Service
            </span>
          </div>

          <div className="hidden md:flex items-center gap-10 text-sm font-medium">
            <Link href="/services" className="hover:text-blue-600 transition">
              Services
            </Link>
            <a href="#how" className="hover:text-blue-600 transition">
              How It Works
            </a>
            <a href="#why" className="hover:text-blue-600 transition">
              Why Choose Us
            </a>
            <a href="#reviews" className="hover:text-blue-600 transition">
              Reviews
            </a>
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-5 py-2.5 rounded-md hover:bg-blue-700 transition"
            >
              Book Now
            </Link>
          </div>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div className="space-y-8 animate-fadeIn">

            <span className="bg-white/20 px-4 py-2 rounded-full text-sm tracking-wide">
              Professional Cleaning Services
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Premium Care for Your Garments
            </h1>

            <p className="text-lg text-blue-100 max-w-xl">
              Enjoy a cleaner, refresh, and healthier environments 
              with our professional cleaning solutions. Reach out to
              HOSANNA GLOBAL CLEANING SERVICES for a free quote and 
              convenient booking.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/register"
                className="bg-white text-blue-700 px-6 py-3 rounded-md font-medium hover:scale-105 transition"
              >
                Book Now→
              </Link>

              <Link
                href="/login"
                className="border border-white px-6 py-3 rounded-md hover:bg-white hover:text-blue-700 transition"
              >
                Login
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/hero.png"
              alt="Dry cleaning service"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-600 text-lg">
            Comprehensive cleaning solutions tailored to your needs
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {[
            { icon: <Shirt />, title: "Dry Cleaning", price: "From $8.99" },
            { icon: <Leaf />, title: "Eco Cleaning", price: "Included" },
            { icon: <Clock />, title: "Express Service", price: "+50% fee" },
            { icon: <Truck />, title: "Pickup & Delivery", price: "Free" },
            { icon: <ShieldCheck />, title: "Insured Care", price: "100% Safe" },
            { icon: <Sparkles />, title: "Premium Finish", price: "Guaranteed" },
          ].map((service, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300 space-y-4"
            >
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                {service.icon}
              </div>

              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="text-blue-600 font-medium">{service.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how" className="py-24 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">How It Works</h2>
          <p className="text-gray-500 mt-3">
            Simple, fast, and convenient
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-4 gap-12 text-center">
          {["Schedule", "Clean", "Inspect", "Deliver"].map((step, i) => (
            <div key={i} className="space-y-4">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto text-lg font-semibold">
                {i + 1}
              </div>
              <h4 className="font-semibold text-lg">{step}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section id="reviews" className="py-24 bg-gray-50">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">What Our Customers Say</h2>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-3 gap-10">
          {["Sarah", "Michael", "Emily"].map((name, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition"
            >
              <p className="text-yellow-500 mb-4">★★★★★</p>
              <p className="text-gray-600">
                Hosanna has been a lifesaver! Exceptional service.
              </p>
              <p className="mt-6 font-semibold">{name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= BOOKING CTA SECTION ================= */}
<section className="bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 text-white py-24">
  <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-start">

    {/* LEFT SIDE */}
    <div className="space-y-8">

      <h2 className="text-4xl md:text-5xl font-bold leading-tight">
        Ready to Experience the Hosanna Difference?
      </h2>

      <p className="text-lg text-blue-100 max-w-lg">
        Schedule your first session today and discover why thousands trust us with their garments.
      </p>

      <div className="space-y-6 pt-6">

        <div className="flex items-start gap-4">
          <div className="bg-white/20 p-3 rounded-full">
            <MapPin size={18} />
          </div>
          <div>
            <p className="font-semibold">Visit Us</p>
            <p className="text-blue-100 text-sm">
              123 Main Street, Suite 100<br />
              Cityville, ST 12345
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="bg-white/20 p-3 rounded-full">
            <Phone size={18} />
          </div>
          <div>
            <p className="font-semibold">Call Us</p>
            <p className="text-blue-100 text-sm">(555) 123-4567</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="bg-white/20 p-3 rounded-full">
            <Mail size={18} />
          </div>
          <div>
            <p className="font-semibold">Email Us</p>
            <p className="text-blue-100 text-sm">
              info@hosannaglobal.com
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="bg-white/20 p-3 rounded-full">
            <Clock size={18} />
          </div>
          <div>
            <p className="font-semibold">Business Hours</p>
            <p className="text-blue-100 text-sm">
              Mon-Fri: 7:00 AM - 7:00 PM<br />
              Sat: 8:00 AM - 5:00 PM<br />
              Sun: Closed
            </p>
          </div>
        </div>

      </div>
    </div>

    {/* RIGHT SIDE - FORM */}
    <div className="bg-white rounded-2xl shadow-2xl p-10 text-gray-900">

      <h3 className="text-2xl font-bold mb-8">
        Schedule Your Free Pickup
      </h3>

      <form className="space-y-5">

        <div>
          <label className="block text-sm font-medium mb-2">
            Full Name
          </label>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Phone Number
          </label>
          <input
            type="text"
            placeholder="(555) 123-4567"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            placeholder="john@example.com"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Pickup Address
          </label>
          <input
            type="text"
            placeholder="123 Your Street"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Preferred Pickup Date
          </label>
          <input
            type="date"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Book Now
        </button>

      </form>
    </div>

  </div>
</section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-blue-800 text-white py-12 text-center space-y-4">
        <p className="text-sm">
          © 2026 Hosanna Global. All rights reserved.
        </p>

        <div className="flex justify-center gap-8 text-sm">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/services">Services</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </footer>
    </main>
  );
} 