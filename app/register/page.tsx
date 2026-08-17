"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Loader2,
  LockKeyhole,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import styles from "./page.module.css";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify(form),
      });

      setSuccess("Account created successfully!");

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
      });

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Registration failed");
      } else {
        setError("Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.visualPanel} aria-label="Hosanna Global cleaning services">
        <Image
          src="/heroo.jpg"
          alt="Hosanna professional cleaning team"
          fill
          priority
          sizes="(max-width: 920px) 100vw, 46vw"
          className={styles.backgroundImage}
        />
        <div className={styles.visualOverlay} />
        <div className={styles.visualPattern} />

        <div className={styles.visualContent}>
          <div className={styles.brand}>
            <span className={styles.logoWrap}>
              <Image
                src="/logo.jpeg"
                alt="Hosanna Global logo"
                width={50}
                height={50}
                className={styles.logo}
              />
            </span>
            <span className={styles.brandText}>
              <strong>Hosanna Global</strong>
              <span>Enterprises Limited</span>
            </span>
          </div>

          <div className={styles.visualMessage}>
            <span className={styles.eyebrow}>
              <Sparkles size={15} aria-hidden="true" />
              Join Hosanna Global
            </span>
            <h1>Professional cleaning, made simple.</h1>
            <p>
              Create your account to book dependable cleaning services for your
              home, office, Airbnb, or commercial property.
            </p>

            <div className={styles.benefits}>
              <span>
                <CheckCircle2 size={18} aria-hidden="true" />
                Simple online booking
              </span>
              <span>
                <CheckCircle2 size={18} aria-hidden="true" />
                Flexible service options
              </span>
              <span>
                <CheckCircle2 size={18} aria-hidden="true" />
                Professional local cleaning team
              </span>
            </div>
          </div>

          <div className={styles.visualFooter}>
            <ShieldCheck size={20} aria-hidden="true" />
            <span>
              <strong>Your space, professionally cared for</strong>
              Serving Middlesbrough and surrounding areas
            </span>
          </div>
        </div>
      </section>

      <section className={styles.formPanel}>
        <div className={styles.mobileBrand}>
          <span className={styles.logoWrap}>
            <Image
              src="/logo.jpeg"
              alt="Hosanna Global logo"
              width={46}
              height={46}
              className={styles.logo}
            />
          </span>
          <span className={styles.brandText}>
            <strong>Hosanna Global</strong>
            <span>Enterprises Limited</span>
          </span>
        </div>

        <div className={styles.formWrap}>
          <div className={styles.formHeading}>
            <span>Create your profile</span>
            <h2>Set up your account</h2>
            <p>Enter your details below to get started with Hosanna Global.</p>
          </div>

          {error && (
            <div className={styles.errorMessage} role="alert">
              <span>!</span>
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div className={styles.successMessage} role="status">
              <span><Check size={14} aria-hidden="true" /></span>
              <div>
                <strong>{success}</strong>
                <p>Taking you to the login page...</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.nameGrid}>
              <div className={styles.fieldGroup}>
                <label htmlFor="firstName">First name</label>
                <div className={styles.inputWrap}>
                  <UserRound size={18} aria-hidden="true" />
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    required
                  />
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="lastName">Last name</label>
                <div className={styles.inputWrap}>
                  <UserRound size={18} aria-hidden="true" />
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="email">Email address</label>
              <div className={styles.inputWrap}>
                <Mail size={19} aria-hidden="true" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="phone">Phone number</label>
              <div className={styles.inputWrap}>
                <Phone size={19} aria-hidden="true" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+44 800 000 0000"
                  required
                />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="password">Password</label>
              <div className={styles.inputWrap}>
                <LockKeyhole size={19} aria-hidden="true" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className={styles.registerButton}>
              {loading ? (
                <>
                  <Loader2 className={styles.spinner} size={19} aria-hidden="true" />
                  Creating account...
                </>
              ) : (
                <>
                  Create account
                  <ArrowRight size={19} aria-hidden="true" />
                </>
              )}
            </button>
          </form>

          <div className={styles.divider}>
            <span>Already registered?</span>
          </div>

          <p className={styles.loginPrompt}>
            Already have an account? <Link href="/login">Login</Link>
          </p>

          <p className={styles.securityNote}>
            <ShieldCheck size={15} aria-hidden="true" />
            Your account details are handled securely.
          </p>
        </div>

        <p className={styles.copyright}>© 2026 Hosanna Global Enterprises Limited</p>
      </section>
    </main>
  );
}
