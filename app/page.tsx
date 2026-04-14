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

  const [loading, setLoading] = useState(false);
  const router = useRouter();
 const [reviews, setReviews] = useState<any[]>([]);
 const [current, setCurrent] = useState(0);

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

const images = [
  "/heroo.png",
  "/clean1.jpg",
  "/clean2.jpg",
  "/clean3.jpg",
  "/clean4.jpg",
  "/clean5.jpg",
  "/clean6.jpg",
  "/clean8.jpg",
  "/clean9.jpg",
  "/clean10.jpg",
];


useEffect(() => {
  const interval = setInterval(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, 4000); // 4 seconds

  return () => clearInterval(interval);
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
  <div className="w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center">
    <Image
      src="/logo.jpeg"
      alt="Hosanna Logo"
      width={40}
      height={40}
      className="object-cover"
    />
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
              className="bg-[#6b3e26] text-white px-6 py-3 rounded-md hover:bg-[#8a5234] transition animate-shake"
            >
              GET A QUOTE NOW
            </Link>

          </div>
        </div>
      </nav>

      {/* ================= MEDIA SECTION ================= */}
     <section className="relative h-[85vh] w-full overflow-hidden">

  {/* BACKGROUND IMAGE SLIDER */}
  {images.map((img, index) => (
    <Image
      key={index}
      src={img}
      alt="Cleaning service"
      fill
      priority
      className={`object-cover transition-opacity duration-1000 ${
        index === current ? "opacity-100" : "opacity-0"
      }`}
    />
  ))}

  {/* DARK OVERLAY */}
  <div className="absolute inset-0 bg-black/60" />

  {/* CONTENT */}
  <div className="absolute inset-0 flex items-center">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">

      <div className="max-w-2xl space-y-6">

        {/* MAIN TITLE */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#8B5E3C] leading-tight">
          Let us do the cleaning!
        </h1>

        {/* SUBTEXT (NOW BOLD LIKE YOUR SCREENSHOT) */}
        <p className="text-xl md:text-2xl font-bold text-white">
          You deserve a clean house, and that’s our specialty.
        </p>

        {/* BUTTON */}
        <button className="bg-[#6b3e26] hover:bg-[#8B5E3C] text-white px-6 py-3 text-lg font-semibold rounded shadow-lg transition animate-[wiggle_1s_ease-in-out_infinite]">
          GET A QUOTE NOW
        </button>

      </div>
    </div>
  </div>

  {/* DOT INDICATORS */}
  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
    {images.map((_, i) => (
      <div
        key={i}
        className={`w-2.5 h-2.5 rounded-full ${
          i === current ? "bg-[#8B5E3C]" : "bg-gray-400"
        }`}
      />
    ))}
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
                className="bg-[#6b3e26] text-white px-8 py-3 rounded-md hover:bg-[#8a5234] transition animate-[wiggle_1s_ease-in-out_infinite]"
              >
                GET A QUOTE NOW
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
  <section className="bg-black py-24 px-6">

  {/* HEADER */}
  <div className="text-center mb-16">
    <p className="text-[#8B5E3C] uppercase tracking-[3px] text-sm">
      WHAT WE OFFER
    </p>

    <h2 className="text-5xl font-bold text-white mt-3">
      Explore all of our Services
    </h2>

    <p className="text-gray-400 text-lg mt-4">
      Prices Start from £15.95 Per Hour
    </p>
  </div>

  {/* SERVICES */}
  <div className="space-y-16 max-w-6xl mx-auto">

    {[
      {
        title: "Residential Cleaning",
        image: "/services/residential.jpg",
        text: "A standard clean is something that a homeowner would do regularly to upkeep the cleanliness of their homes. Regular chores, such as vacuuming and mopping the floors, general bathroom cleaning, kitchen cleaning, and dusting."
      },
      {
        title: "Office Cleaning",
        image: "/services/office.jpg",
        text: "Professional office cleaning services designed to maintain a clean, productive and healthy working environment. Includes desks, floors, restrooms, and common areas."
      },
      {
        title: "Airbnb Cleaning",
        image: "/services/airbnb.jpg",
        text: "Reliable and fast turnover cleaning for Airbnb and short-let properties. We ensure your space is spotless, guest-ready, and maintained to high standards."
      },
      {
        title: "Move-In / Move-Out Cleaning",
        image: "/services/move.jpg",
        text: "Deep cleaning services for moving in or out of properties. We ensure every area is cleaned thoroughly, making the space fresh and ready."
      },
      {
        title: "End of Tenancy Cleaning",
        image: "/services/tenancy.jpg",
        text: "Detailed cleaning service tailored for tenants and landlords to meet end-of-tenancy standards and secure deposit returns."
      },
      {
        title: "Outdoor / Street Cleaning",
        image: "/services/outdoor.jpg",
        text: "Cleaning of outdoor areas including pavements, streets, and surrounding environments to maintain a clean and safe space."
      }
    ].map((service, i) => (

      <div
        key={i}
        className={`bg-[#2b1d16] border border-[#3a2a21] rounded-lg shadow-xl p-8 flex flex-col lg:flex-row items-center gap-10 ${
          i % 2 !== 0 ? "lg:flex-row-reverse" : ""
        }`}
      >

        {/* IMAGE */}
        <div className="w-full lg:w-1/2">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-[280px] object-cover rounded-md"
          />
        </div>

        {/* TEXT */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">

          <h3 className="text-2xl font-bold text-white mb-4">
            {service.title}
          </h3>

          <p className="text-gray-300 leading-8 text-[16px] mb-6">
            {service.text}
          </p>

          <button className="bg-[#6b3e26] hover:bg-[#8B5E3C] text-white px-8 py-3 rounded font-semibold  animate-[wiggle_1s_ease-in-out_infinite]" onClick={() => router.push("/login")}>
            Get A Quote
          </button>

        </div>
      </div>

    ))}

  </div>

</section>

      {/* ================= HOW IT WORKS ================= */}
     <section id="how" className="py-28 bg-black">
  <div className="text-center mb-20">

    <h2 className="text-4xl md:text-5xl font-bold text-white">
      How It Works
    </h2>

    <p className="text-gray-400 mt-4 text-lg">
      A seamless and professional cleaning experience from start to finish
    </p>

  </div>
<div className="hidden md:block absolute top-8 left-0 right-0 h-[2px] bg-[#6b3e26]/30 z-0" />
  <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-4 gap-12 text-center relative">

    {[
      {
        title: "Book Your Service",
        desc: "Schedule your cleaning in minutes using our simple and secure booking system.",
      },
      {
        title: "Team Arrival",
        desc: "Our trained professionals arrive on time, fully equipped and ready.",
      },
      {
        title: "Expert Cleaning",
        desc: "We carry out a detailed and high-standard cleaning tailored to your needs.",
      },
      {
        title: "Enjoy Your Space",
        desc: "Relax and enjoy a spotless, refreshed environment with zero stress.",
      },
    ].map((step, i) => (

      <div
        key={i}
        className="space-y-5 group transition"
      >

        {/* NUMBER CIRCLE */}
        <div className="w-16 h-16 bg-[#6b3e26] group-hover:bg-[#8B5E3C] text-white rounded-full flex items-center justify-center mx-auto text-lg font-semibold shadow-lg transition">
          {i + 1}
        </div>

        {/* TITLE */}
        <h4 className="font-semibold text-lg text-white">
          {step.title}
        </h4>

        {/* DESCRIPTION */}
        <p className="text-gray-400 text-sm leading-relaxed px-4">
          {step.desc}
        </p>

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
      className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition animate-[wiggle_1s_ease-in-out_infinite]"
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
    if (!rating || comment.trim() === "" || loading) return;

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    try {
      setLoading(true);

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
    } finally {
      setLoading(false);
    }
  }}
  disabled={loading}
  className="bg-green-600 px-4 py-2 rounded w-full flex items-center justify-center gap-2 disabled:opacity-60"
>
  {loading && (
    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
  )}
  {loading ? "Submitting..." : "Submit"}
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

      <section className="bg-[#0f0a07] text-white py-20 mt-20 border-t border-[#6b3e26]/30">
  <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center">

    {/* LEFT - CONTACT */}
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-[#8B5E3C]">
        Get In Touch
      </h3>

      <p className="text-gray-300">
        <strong>Email:</strong> info@hosannaglobal.co.uk
      </p>

      <p className="text-gray-300">
        <strong>Phone:</strong> +44 7551 024386
      </p>

      <p className="text-gray-300">
        <strong>Address:</strong> 41 Edward Street, Middlesbrough
      </p>

      <p className="text-gray-300">
        <strong>Hours:</strong> Mon – Sat: 9:00am – 8:00pm <br />
        Sunday – CLOSED
      </p>
    </div>

    {/* RIGHT - MAP */}
    <div className="w-full h-[300px] rounded-xl overflow-hidden border border-[#6b3e26]/40">
      <iframe
        src="https://maps.google.com/maps?q=Middlesbrough&t=&z=13&ie=UTF8&iwloc=&output=embed"
        className="w-full h-full border-0"
        loading="lazy"
      />
    </div>

  </div>

  {/* AREAS */}
  <div className="text-center mt-10">
    <p className="text-gray-400">
      Areas Covered:
      <span className="text-[#8B5E3C] font-semibold"> Middlesbrough & Surroundings</span>
    </p>
  </div>

  {/* FOOTER BOTTOM */}
  <div className="mt-16 border-t border-[#6b3e26]/30 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">

    {/* LOGO */}
    <div className="text-[#8B5E3C] font-bold text-lg">
      HOSANNA GLOBAL ENTERPRISES LIMITED
      <Image src="/logo.jpeg" alt="logo" width={120} height={40} />
    </div>

    {/* SOCIALS */}
    <div className="flex gap-4">
      {[
        { name: "Facebook", link: "#" },
        { name: "X", link: "#" },
        { name: "LinkedIn", link: "#" },
        { name: "Email", link: "mailto:info@hosannaglobal.co.uk" },
        { name: "WhatsApp", link: "#" },
      ].map((item, i) => (
        <a
          key={i}
          href={item.link}
          className="px-4 py-2 border border-[#6b3e26] rounded hover:bg-[#6b3e26] transition text-sm"
        >
          {item.name}
        </a>
      ))}
    </div>

  </div>
</section>

 {/* ================= FOOTER ================= */}
      <footer className="bg-black text-gray-400 py-12 text-center space-y-4">

        <p className="text-sm">
          © 2026 Hosanna Global Enterprises Limited
        </p>

       <p className="text-sm">
        41 Edward Street, North Ormesby, Middlesbrough,
        North Yorkshire, United Kingdom, TS3 6JJ
       </p>

        <div className="flex justify-center gap-8 text-sm">

          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/services">Services</Link>
          <Link href="https://wa.me/447551024386">Contact</Link>

        </div>

      </footer>

    </main>
  );
}