"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock,
  Home,
  Mail,
  MapPin,
  Phone,
  Quote,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import styles from "./page.module.css";

type Review = {
  name: string;
  rating: number;
  comment: string;
};

const heroImages = [
  "/heroo.jpg",
  "/clean1.jpg",
  "/clean2.jpg",
  "/clean3.jpg",
  "/clean4.jpg",
  "/clean5.jpg",
  "/clean6.jpg",
  "/clean8.jpg",
  "/clean9.jpg",
];

const services = [
  {
    title: "Residential Cleaning",
    image: "/services/residential.jpg",
    text: "A standard clean is something that a homeowner would do regularly to upkeep the cleanliness of their homes. Regular chores, such as vacuuming and mopping the floors, general bathroom cleaning, kitchen cleaning, and dusting.",
    icon: Home,
  },
  {
    title: "Office Cleaning",
    image: "/services/office.jpg",
    text: "Professional office cleaning services designed to maintain a clean, productive and healthy working environment. Includes desks, floors, restrooms, and common areas.",
    icon: Building2,
  },
  {
    title: "Airbnb Cleaning",
    image: "/services/airbnb.jpg",
    text: "Reliable and fast turnover cleaning for Airbnb and short-let properties. We ensure your space is spotless, guest-ready, and maintained to high standards.",
    icon: Sparkles,
  },
  {
    title: "Move-In / Move-Out Cleaning",
    image: "/services/move.jpg",
    text: "Deep cleaning services for moving in or out of properties. We ensure every area is cleaned thoroughly, making the space fresh and ready.",
    icon: Truck,
  },
  {
    title: "End of Tenancy Cleaning",
    image: "/services/tenancy.jpg",
    text: "Detailed cleaning service tailored for tenants and landlords to meet end-of-tenancy standards and secure deposit returns.",
    icon: ShieldCheck,
  },
  {
    title: "Outdoor / Street Cleaning",
    image: "/services/outdoor.jpg",
    text: "Cleaning of outdoor areas including pavements, streets, and surrounding environments to maintain a clean and safe space.",
    icon: MapPin,
  },
];

const processSteps = [
  {
    image: "/process/book.jpg",
    title: "Book Your Service",
    desc: "Schedule your cleaning in minutes using our secure and simple booking process.",
  },
  {
    image: "/process/team.jpg",
    title: "Team Arrival",
    desc: "Our professional cleaners arrive fully equipped and ready to deliver excellence.",
  },
  {
    image: "/process/clean.jpg",
    title: "Expert Cleaning",
    desc: "We carry out a detailed, high-standard cleaning tailored to your space and needs.",
  },
  {
    image: "/process/enjoy.jpg",
    title: "Enjoy Your Space",
    desc: "Relax and enjoy a spotless, refreshed environment with zero stress.",
  },
];

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [current, setCurrent] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await apiFetch("/reviews");
        setReviews(data);
      } catch {
        console.error("Failed to load reviews");
      }
    };

    loadReviews();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((previous) => (previous + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className={styles.page}>
      <nav className={styles.navbar} aria-label="Primary navigation">
        <div className={styles.navInner}>
          <Link href="/" className={styles.brand} aria-label="Hosanna Global home">
            <span className={styles.logoWrap}>
              <Image
                src="/logo.jpeg"
                alt="Hosanna Global logo"
                width={48}
                height={48}
                className={styles.logo}
              />
            </span>
            <span className={styles.brandText}>
              <strong>Hosanna Global</strong>
              <span>Enterprises Limited</span>
            </span>
          </Link>

          <div className={styles.navLinks}>
            <Link href="/services">Services</Link>
            <a href="#how">How it works</a>
            <a href="#reviews">Reviews</a>
            <Link href="/login" className={styles.navCta}>
              Get a quote
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <Link href="/login" className={styles.mobileCta}>
            Get a quote
          </Link>
        </div>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroMedia} aria-hidden="true">
          {heroImages.map((image, index) => (
            <Image
              key={image}
              src={image}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className={`${styles.heroSlide} ${
                index === current ? styles.heroSlideActive : ""
              }`}
            />
          ))}
        </div>
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>Professional cleaning in Middlesbrough</span>
            <h1>
              Let us do the <span>cleaning.</span>
            </h1>
            <p>
              You deserve a clean house, and that&apos;s our specialty. Dependable care
              for homes, offices, Airbnb properties, and commercial spaces.
            </p>
            <div className={styles.heroActions}>
              <button type="button" className={styles.primaryButton}>
                Get a quote now
                <ArrowRight size={18} aria-hidden="true" />
              </button>
              <a href="#services" className={styles.secondaryButton}>
                Explore services
              </a>
            </div>

            <div className={styles.heroAssurance}>
              <span>
                <CheckCircle2 size={18} aria-hidden="true" />
                Flexible appointments
              </span>
              <span>
                <CheckCircle2 size={18} aria-hidden="true" />
                Fully equipped teams
              </span>
            </div>
          </div>
        </div>

        <div className={styles.heroDots} aria-label="Current hero image">
          {heroImages.map((image, index) => (
            <span
              key={image}
              className={index === current ? styles.heroDotActive : styles.heroDot}
            />
          ))}
        </div>
      </section>

      <section className={styles.trustBar} aria-label="Service highlights">
        <div className={styles.trustGrid}>
          <div className={styles.trustItem}>
            <ShieldCheck size={26} aria-hidden="true" />
            <div>
              <strong>Professional service</strong>
              <span>Careful, consistent cleaning</span>
            </div>
          </div>
          <div className={styles.trustItem}>
            <Clock size={26} aria-hidden="true" />
            <div>
              <strong>Flexible scheduling</strong>
              <span>Appointments that fit your day</span>
            </div>
          </div>
          <div className={styles.trustItem}>
            <MapPin size={26} aria-hidden="true" />
            <div>
              <strong>Locally focused</strong>
              <span>Middlesbrough &amp; surroundings</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.introSection}>
        <div className={styles.container}>
          <div className={styles.introGrid}>
            <div className={styles.introImageWrap}>
              <Image
                src="/process/cleaning.jpg"
                alt="Hosanna professional cleaning team"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className={styles.introImage}
              />
              <div className={styles.imageBadge}>
                <Sparkles size={20} aria-hidden="true" />
                <span>
                  <strong>Quality care</strong>
                  Every space, every time
                </span>
              </div>
            </div>

            <div className={styles.introCopy}>
              <span className={styles.sectionLabel}>A better standard of clean</span>
              <h2>Professional cleaning for the places that matter most.</h2>
              <p>
                Hosanna Global Cleaning Services provides reliable, professional
                cleaning solutions for homes, offices, Airbnb properties, and
                commercial spaces. We help you maintain a spotless and healthy
                environment.
              </p>
              <ul className={styles.checkList}>
                <li>
                  <CheckCircle2 size={20} aria-hidden="true" />
                  Service tailored to your property and schedule
                </li>
                <li>
                  <CheckCircle2 size={20} aria-hidden="true" />
                  Professional equipment and attention to detail
                </li>
                <li>
                  <CheckCircle2 size={20} aria-hidden="true" />
                  Residential and commercial cleaning expertise
                </li>
              </ul>
              <div className={styles.introActions}>
                <Link href="/register" className={styles.primaryButton}>
                  Get a quote now
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <Link href="/login" className={styles.textLink}>
                  Client login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className={styles.servicesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.sectionLabel}>What we offer</span>
              <h2>Cleaning solutions for every space.</h2>
            </div>
            <div className={styles.headingAside}>
              <p>Thoughtful, dependable cleaning for homes and businesses.</p>
              <span>Prices start from £13.40 per hour</span>
            </div>
          </div>

          <div className={styles.serviceGrid}>
            {services.map((service) => {
              const ServiceIcon = service.icon;

              return (
                <article key={service.title} className={styles.serviceCard}>
                  <div className={styles.serviceImageWrap}>
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 700px) 100vw, (max-width: 1050px) 50vw, 33vw"
                      className={styles.serviceImage}
                    />
                    <span className={styles.serviceIcon}>
                      <ServiceIcon size={22} aria-hidden="true" />
                    </span>
                  </div>
                  <div className={styles.serviceBody}>
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                    <button
                      type="button"
                      className={styles.cardLink}
                      onClick={() => router.push("/login")}
                    >
                      Get a quote
                      <ArrowRight size={17} aria-hidden="true" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="how" className={styles.processSection}>
        <div className={styles.container}>
          <div className={styles.processHeading}>
            <span className={styles.sectionLabelLight}>Simple from start to finish</span>
            <h2>How it works</h2>
            <p>A seamless, professional cleaning experience in four easy steps.</p>
          </div>

          <div className={styles.processGrid}>
            {processSteps.map((step, index) => (
              <article key={step.title} className={styles.processCard}>
                <div className={styles.processImageWrap}>
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    sizes="(max-width: 700px) 100vw, (max-width: 1050px) 50vw, 25vw"
                    className={styles.processImage}
                  />
                  <span className={styles.stepNumber}>0{index + 1}</span>
                </div>
                <div className={styles.processBody}>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className={styles.reviewsSection}>
        <div className={styles.container}>
          <div className={styles.reviewsHeading}>
            <div>
              <span className={styles.sectionLabel}>Customer experiences</span>
              <h2>Trusted to make every space feel its best.</h2>
            </div>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className={styles.reviewButton}
            >
              Leave us a review
            </button>
          </div>

          {reviews.length > 0 ? (
            <div className={styles.reviewGrid}>
              {(showAll ? reviews : reviews.slice(0, 3)).map((review, index) => (
                <article key={index} className={styles.reviewCard}>
                  <div className={styles.reviewTop}>
                    <Quote size={28} aria-hidden="true" />
                    <span className={styles.stars} aria-label={`${review.rating} out of 5 stars`}>
                      {"★".repeat(review.rating)}
                    </span>
                  </div>
                  <p>&ldquo;{review.comment}&rdquo;</p>
                  <div className={styles.reviewer}>
                    <span>{review.name?.charAt(0) || "G"}</span>
                    <strong>{review.name}</strong>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.reviewEmpty}>
              <Quote size={26} aria-hidden="true" />
              <p>Customer reviews will appear here.</p>
            </div>
          )}

          {reviews.length > 3 && !showAll && (
            <div className={styles.seeMoreWrap}>
              <button type="button" onClick={() => setShowAll(true)}>
                See more reviews
                <ArrowRight size={17} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </section>

      {showModal && (
        <div className={styles.modalBackdrop}>
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="review-modal-title"
          >
            <span className={styles.modalLabel}>Your experience matters</span>
            <h3 id="review-modal-title">Rate your experience</h3>
            <p>Tell us how we did. Your feedback helps us keep improving.</p>

            <div className={styles.starPicker} aria-label="Choose a rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className={rating && star <= rating ? styles.starSelected : ""}
                  aria-label={`${star} star${star > 1 ? "s" : ""}`}
                >
                  ★
                </button>
              ))}
            </div>

            {rating && (
              <textarea
                placeholder="Leave a comment..."
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                className={styles.reviewInput}
                rows={5}
              />
            )}

            <div className={styles.modalActions}>
              <button
                type="button"
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
                  } catch {
                    console.error("Failed to submit review");
                  } finally {
                    setLoading(false);
                  }
                }}
                disabled={loading}
                className={styles.submitButton}
              >
                {loading && <span className={styles.spinner} aria-hidden="true" />}
                {loading ? "Submitting..." : "Submit review"}
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <section className={styles.contactSection}>
        <div className={styles.container}>
          <div className={styles.contactGrid}>
            <div className={styles.contactCopy}>
              <span className={styles.sectionLabelLight}>Let&apos;s talk</span>
              <h2>Ready for a cleaner, calmer space?</h2>
              <p>
                Get in touch with our team to discuss the right cleaning service
                for your home or business.
              </p>

              <div className={styles.contactList}>
                <a href="mailto:info@hosannaglobal.co.uk">
                  <span><Mail size={20} aria-hidden="true" /></span>
                  <div>
                    <small>Email us</small>
                    info@hosannaglobal.co.uk
                  </div>
                </a>
                <a href="tel:+447551024386">
                  <span><Phone size={20} aria-hidden="true" /></span>
                  <div>
                    <small>Call us</small>
                    +44 7551 024386
                  </div>
                </a>
                <div className={styles.contactItem}>
                  <span><MapPin size={20} aria-hidden="true" /></span>
                  <div>
                    <small>Visit us</small>
                    41 Edward Street, Middlesbrough
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <span><Clock size={20} aria-hidden="true" /></span>
                  <div>
                    <small>Opening hours</small>
                    Mon–Sat: 9:00am–8:00pm · Sunday closed
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.mapWrap}>
              <iframe
                src="https://maps.google.com/maps?q=Middlesbrough&t=&z=13&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                title="Hosanna Global service area in Middlesbrough"
              />
              <div className={styles.mapBadge}>
                <MapPin size={18} aria-hidden="true" />
                Middlesbrough &amp; surroundings
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerTop}>
            <div className={styles.footerBrand}>
              <Image src="/logo.jpeg" alt="Hosanna Global logo" width={46} height={46} />
              <div>
                <strong>Hosanna Global</strong>
                <span>Enterprises Limited</span>
              </div>
            </div>

            <div className={styles.socialLinks}>
              {[
                { name: "Facebook", link: "#" },
                { name: "X", link: "#" },
                { name: "LinkedIn", link: "#" },
                { name: "Email", link: "mailto:info@hosannaglobal.co.uk" },
                { name: "WhatsApp", link: "#" },
              ].map((item) => (
                <a key={item.name} href={item.link}>
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          <div className={styles.footerBottom}>
            <div>
              <p>© 2026 Hosanna Global Enterprises Limited</p>
              <p>
                41 Edward Street, North Ormesby, Middlesbrough, North Yorkshire,
                United Kingdom, TS3 6JJ
              </p>
            </div>
            <div className={styles.footerLinks}>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/services">Services</Link>
              <Link href="https://wa.me/447551024386">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
