"use client";

import { useEffect } from "react";
import { apiFetch } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Home,
  Building2,
  Sparkles,
  Truck,
  ShieldCheck,
  Clock,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

export default function HomePage() {

  const router = useRouter();
 const [reviews, setReviews] = useState<any[]>([]);

 useEffect(() => {
  const loadReviews = async () => {
    try {
      const data = await apiFetch("/reviews");
      setReviews(data);
    } catch (err) {
      console.error("Failed to load reviews");
    }
  };

  loadReviews();
}, []);

const [showModal, setShowModal] = useState(false);
const [rating, setRating] = useState<number | null>(null);
const [comment, setComment] = useState("");
const [showAll, setShowAll] = useState(false);

  return (
    <main className="font-sans bg-[#2b1d16] text-gray-200">

      {/* ================= NAVBAR ================= */}
      <nav className="bg-[#1a120d]/90 backdrop-blur sticky top-0 z-50 border-b border-[#3a2a21]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex justify-between items-center">

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#6b3e26] rounded-full flex items-center justify-center">
              <Sparkles size={18} className="text-white" />
            </div>

            <span className="text-xl font-semibold text-white">
              Hosanna GLOBAL ENTERPRISES LIMITED
            </span>
          </div>

          <div className="hidden md:flex items-center gap-10 text-sm font-medium">

            <Link href="/services" className="hover:text-[#caa27c] transition">
              Services
            </Link>

            <a href="#how" className="hover:text-[#caa27c] transition">
              How It Works
            </a>

            <a href="#reviews" className="hover:text-[#caa27c] transition">
              Reviews
            </a>

            <Link
              href="/login"
              className="bg-[#6b3e26] text-white px-5 py-2.5 rounded-md hover:bg-[#8a5234] transition"
            >
              Book Now
            </Link>

          </div>
        </div>
      </nav>

      {/* ================= MEDIA SECTION ================= */}
      <section className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          <div className="relative w-full h-[420px] rounded-2xl overflow-hidden shadow-2xl">

            {/* VIDEO PLACEHOLDER */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/70">
              <p className="text-gray-300 text-lg">
                Experience Hosanna Perfection
              </p>
            </div>

            <Image
              src="/heroo.png"
              alt="Cleaning service"
              fill
              className="object-cover opacity-50"
            />

          </div>
        </div>
      </section>

      {/* ================= HERO ================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">

          <div className="space-y-6">

            <span className="bg-[#6b3e26]/40 px-4 py-2 rounded-full text-sm">
              Professional Cleaning Services
            </span>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white">
              Professional Cleaning For Homes, Offices & Businesses
            </h1>

            <p className="text-gray-300 text-lg max-w-xl">
              Hosanna Global Cleaning Services provides reliable,
              professional cleaning solutions for homes, offices,
              Airbnb properties, and commercial spaces. 
              We help you maintain a spotless and healthy environment.
            </p>

            <div className="flex gap-4 flex-wrap">

              <Link
                href="/register"
                className="bg-[#6b3e26] text-white px-6 py-3 rounded-md hover:bg-[#8a5234] transition"
              >
                Book Cleaning
              </Link>

              <Link
                href="/login"
                className="border border-[#6b3e26] px-6 py-3 rounded-md hover:bg-[#6b3e26] transition"
              >
                Login
              </Link>

            </div>
          </div>

          <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/cleaning.jpg"
              alt="Professional cleaning service"
              fill
              className="object-cover"
            />
          </div>

        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="py-24 bg-[#1a120d]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center mb-16">

          <h2 className="text-4xl font-bold text-white mb-4">
            Our Cleaning Services
          </h2>

          <p className="text-gray-400 text-lg">
            Professional cleaning solutions for homes and businesses
          </p>

        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-10" onClick={() => router.push("/login")}>

          {[
            { icon: <Home />, title: "Residential Cleaning" },
            { icon: <Building2 />, title: "Office Cleaning" },
            { icon: <Sparkles />, title: "Airbnb Cleaning" },
            { icon: <Truck />, title: "Move-In / Move-Out Cleaning" },
            { icon: <ShieldCheck />, title: "End of Tenancy Cleaning" },
            { icon: <Clock />, title: "Outdoor / Street Cleaning" },
          ].map((service, i) => (

            <div
              key={i}
              className="bg-[#2b1d16] p-8 rounded-2xl border border-[#3a2a21] hover:border-[#6b3e26] hover:-translate-y-2 transition space-y-4"
            >

              <div className="w-14 h-14 bg-[#6b3e26] rounded-full flex items-center justify-center text-white">
                {service.icon}
              </div>

              <h3 className="text-xl font-semibold text-white">
                {service.title}
              </h3>

            </div>

          ))}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how" className="py-24">
        <div className="text-center mb-16">

          <h2 className="text-4xl font-bold text-white">
            How It Works
          </h2>

          <p className="text-gray-400 mt-3">
            Simple booking process
          </p>

        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-4 gap-12 text-center">

          {["Book Service", "Cleaning Team Arrives", "Professional Cleaning", "Enjoy Clean Space"].map((step, i) => (

            <div key={i} className="space-y-4">

              <div className="w-16 h-16 bg-[#6b3e26] text-white rounded-full flex items-center justify-center mx-auto text-lg font-semibold">
                {i + 1}
              </div>

              <h4 className="font-semibold text-lg text-white">
                {step}
              </h4>

            </div>

          ))}

        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
   
<section id="reviews" className="py-24 bg-[#1a120d]">

  <div className="text-center mb-16">
    <h2 className="text-4xl font-bold text-white">
      What Our Customers Say
    </h2>
  </div>

  <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-3 gap-10">

    {(showAll ? reviews : reviews.slice(0, 3)).map((r, i) => (

      <div
        key={i}
        className="bg-[#2b1d16] p-8 rounded-2xl border border-[#3a2a21]"
      >

        <p className="text-yellow-400 mb-4">
          {"★".repeat(r.rating)}
        </p>

        <p className="text-gray-300">
          {r.comment}
        </p>

        <p className="mt-6 font-semibold text-white">
          {r.name}
        </p>

      </div>

    ))}

  </div>

  {/* SEE MORE */}
  {reviews.length > 3 && !showAll && (
    <div className="text-center mt-6">
      <button
        onClick={() => setShowAll(true)}
        className="text-yellow-400 underline"
      >
        See more reviews
      </button>
    </div>
  )}

  {/* LEAVE REVIEW BUTTON */}
  <div className="text-center mt-12">
    <button
      onClick={() => setShowModal(true)}
      className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition"
    >
      Leave us a Review
    </button>
  </div>

</section>

{/* REVIEW MODAL */}
{showModal && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

    <div className="bg-[#2b1d16] p-6 rounded-xl w-[90%] max-w-md space-y-4">

      <h3 className="text-white text-lg font-bold text-center">
        Rate your experience
      </h3>

      {/* STARS */}
      <div className="flex justify-center gap-2 text-2xl text-yellow-400 cursor-pointer">
        {[1,2,3,4,5].map((s) => (
          <span
            key={s}
            onClick={() => setRating(s)}
            className={rating && s <= rating ? "" : "opacity-30"}
          >
            ★
          </span>
        ))}
      </div>

      {/* COMMENT */}
      {rating && (
        <textarea
          placeholder="Leave a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-3 rounded bg-black/30 text-white outline-none"
        />
      )}

      {/* ACTIONS */}
      <div className="flex gap-3">

        <button
       onClick={async () => {
  if (!rating || comment.trim() === "") return;

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  try {
    const newReview = await apiFetch("/reviews", {
      method: "POST",
      body: JSON.stringify({
        name: user?.firstName || "Guest",
        rating,
        comment,
      }),
    });

    setReviews([newReview, ...reviews]);

    setShowModal(false);
    setRating(null);
    setComment("");
  } catch (err) {
    console.error("Failed to submit review");
  }
}}
          className="bg-green-600 px-4 py-2 rounded w-full"
        >
          Submit
        </button>

        <button
          onClick={() => setShowModal(false)}
          className="bg-gray-600 px-4 py-2 rounded w-full"
        >
          Cancel
        </button>

      </div>

    </div>

  </div>
)}

      {/* ================= FOOTER ================= */}
      <footer className="bg-black text-gray-400 py-12 text-center space-y-4">

        <p className="text-sm">
          © 2026 Hosanna Global Enterprises Limited
        </p>

       <p className="text-sm">
        41 Edward Street, North Ormesby, Middlebrough,
        North Yorkshire, United Kingdom, TS3 6JJ
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