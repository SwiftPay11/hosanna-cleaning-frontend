"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import styles from "./page.module.css";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const data = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      localStorage.setItem("token", data.access_token);
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Server error");
      } else {
        setError("Server error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.visualPanel} aria-label="Hosanna Global cleaning services">
        <Image
          src="/process/cleaning.jpg"
          alt="Hosanna professional cleaning team"
          fill
          priority
          sizes="(max-width: 900px) 100vw, 56vw"
          className={styles.backgroundImage}
        />
        <div className={styles.visualOverlay} />
        <div className={styles.visualGlow} />

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
              Welcome back
            </span>
            <h1>A cleaner space is only a few clicks away.</h1>
            <p>
              Sign in to manage your bookings and keep your home or business
              looking its best.
            </p>

            <div className={styles.benefits}>
              <span>
                <CheckCircle2 size={18} aria-hidden="true" />
                Manage your cleaning bookings
              </span>
              <span>
                <CheckCircle2 size={18} aria-hidden="true" />
                Review your service details
              </span>
              <span>
                <CheckCircle2 size={18} aria-hidden="true" />
                Access your account securely
              </span>
            </div>
          </div>

          <div className={styles.visualFooter}>
            <ShieldCheck size={20} aria-hidden="true" />
            <span>
              <strong>Professional care</strong>
              For homes, offices, and businesses
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
            <span>Client portal</span>
            <h2>Login to your account</h2>
            <p>Enter your details to access your cleaning services.</p>
          </div>

          {error && (
            <div className={styles.errorMessage} role="alert">
              <span>!</span>
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className={styles.form}>
            <div className={styles.fieldGroup}>
              <label htmlFor="email">Email address</label>
              <div className={styles.inputWrap}>
                <Mail size={19} aria-hidden="true" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  aria-invalid={Boolean(error)}
                  required
                />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <div className={styles.labelRow}>
                <label htmlFor="password">Password</label>
                <Link href="/forgot-password">Forgot password?</Link>
              </div>
              <div className={styles.inputWrap}>
                <LockKeyhole size={19} aria-hidden="true" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  aria-invalid={Boolean(error)}
                  required
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className={styles.loginButton}>
              {loading ? (
                <>
                  <Loader2 className={styles.spinner} size={19} aria-hidden="true" />
                  Logging in...
                </>
              ) : (
                <>
                  Login
                  <ArrowRight size={19} aria-hidden="true" />
                </>
              )}
            </button>
          </form>

          <div className={styles.divider}>
            <span>New to Hosanna?</span>
          </div>

          <p className={styles.registerPrompt}>
            Don&apos;t have an account? <Link href="/register">Create account</Link>
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
