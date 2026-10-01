import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  RotateCcw,
  UserRound,
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

const LOGO_SRC = "/manus-storage/judicial-gpt-logo_1bbf5396.svg";

type AuthMode = "login" | "signup";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [replayKey, setReplayKey] = useState(0);
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!showSplash) return;

    const timer = window.setTimeout(() => {
      setShowSplash(false);
    }, 2200);

    return () => window.clearTimeout(timer);
  }, [replayKey, showSplash]);

  const replayIntro = () => {
    setStatus("");
    setShowSplash(true);
    setReplayKey((key) => key + 1);
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setStatus(
      mode === "login"
        ? "Demo mode: connect your secure login API here."
        : "Demo mode: connect your account creation API here.",
    );
  };

  return (
    <main className="judicial-demo">
      <section
        className="mobile-app-shell"
        aria-label="Judicial GPT mobile app demo"
      >
        {/* BACKGROUND / ATMOSPHERE */}
        <div className="judicial-atmosphere" aria-hidden="true">
          <span className="ambient-column ambient-column-left" />
          <span className="ambient-column ambient-column-right" />
          <span className="ambient-orbit ambient-orbit-one" />
          <span className="ambient-orbit ambient-orbit-two" />
        </div>

        {/* LOGIN / SIGN UP PAGE */}
        <motion.section
          className="auth-view"
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* TOP BAR */}
          <div className="top-bar">
            <div className="micro-brand">
              <span className="micro-dot" />
              PUNJAB JUDICIAL ACADEMY
            </div>

            <button
              className="replay-button"
              type="button"
              onClick={replayIntro}
            >
              <RotateCcw size={14} />
              Replay
            </button>
          </div>

          {/* BRAND */}
          <div className="auth-brand-lockup">
            <div className="logo-halo logo-halo-small">
              <img
                src={LOGO_SRC}
                alt="Punjab Judicial Academy official emblem"
              />
            </div>

            <p className="brand-kicker">SECURE LEGAL INTELLIGENCE</p>

            <h1>JUDICIAL GPT</h1>

            <p className="brand-subtitle">Intelligent Legal Assistance</p>
          </div>

          {/* AUTH CARD */}
          <div className="auth-card">
            {/* TABS */}
            <div
              className="auth-tabs"
              role="tablist"
              aria-label="Authentication mode"
            >
              <button
                className={mode === "login" ? "active" : ""}
                type="button"
                role="tab"
                aria-selected={mode === "login"}
                onClick={() => {
                  setMode("login");
                  setStatus("");
                }}
              >
                Log In
              </button>

              <button
                className={mode === "signup" ? "active" : ""}
                type="button"
                role="tab"
                aria-selected={mode === "signup"}
                onClick={() => {
                  setMode("signup");
                  setStatus("");
                }}
              >
                Sign Up
              </button>
            </div>

            {/* HEADING */}
            <div className="auth-heading">
              <span className="heading-rule" />

              <div>
                <p className="eyebrow">WELCOME TO YOUR DIGITAL CHAMBERS</p>

                <h2>
                  {mode === "login" ? "Welcome back" : "Create your account"}
                </h2>

                <p className="heading-copy">
                  {mode === "login"
                    ? "Access your secure legal workspace."
                    : "Set up your secure legal workspace in minutes."}
                </p>
              </div>
            </div>

            {/* FORM */}
            <form onSubmit={submitForm} className="auth-form">
              {/* FULL NAME */}
              {mode === "signup" && (
                <label className="field-label">
                  Full name
                  <span className="field-wrap">
                    <UserRound size={19} />
                    <input type="text" placeholder="Your full name" required />
                  </span>
                </label>
              )}

              {/* EMAIL */}
              <label className="field-label">
                Email address
                <span className="field-wrap">
                  <Mail size={19} />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                </span>
              </label>

              {/* PASSWORD */}
              <label className="field-label">
                Password
                <span className="field-wrap">
                  <LockKeyhole size={19} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    minLength={6}
                    required
                  />
                  <button
                    className="password-toggle"
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((visible) => !visible)}
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </span>
              </label>

              {/* FORGOT PASSWORD */}
              {mode === "login" && (
                <button
                  className="forgot-link"
                  type="button"
                  onClick={() => setStatus("Password recovery flow placeholder.")}
                >
                  Forgot password?
                </button>
              )}

              {/* PRIMARY BUTTON */}
              <button className="primary-action" type="submit">
                <span>{mode === "login" ? "Log In" : "Create Account"}</span>
                <ArrowRight size={19} />
              </button>

              {/* DIVIDER */}
              <div className="divider" aria-hidden="true">
                <span />
                <small>OR CONTINUE WITH</small>
                <span />
              </div>

              {/* GOOGLE */}
              <button
                className="google-action"
                type="button"
                onClick={() => setStatus("Google authentication placeholder.")}
              >
                <span className="google-mark">G</span>
                Continue with Google
              </button>
            </form>

            {/* STATUS */}
            {status && (
              <p className="form-status" role="status">
                {status}
              </p>
            )}

            {/* SWITCH LOGIN / SIGNUP */}
            <p className="switch-copy">
              {mode === "login"
                ? "Don\u2019t have an account?"
                : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => setMode(mode === "login" ? "signup" : "login")}
              >
                {mode === "login" ? "Sign Up" : "Log In"}
              </button>
            </p>
          </div>

          {/* PRIVACY */}
          <p className="privacy-note">
            Your conversations are protected with secure access controls.
          </p>
        </motion.section>

        {/* SPLASH / DOOR ANIMATION */}
        <AnimatePresence mode="wait">
          {showSplash && (
            <motion.section
              key={`splash-${replayKey}`}
              className="splash-screen"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 1 }}
              transition={{ duration: 0 }}
              aria-label="Judicial GPT splash screen"
            >
              {/* LEFT DOOR */}
              <motion.div
                className="gate-panel gate-panel-left"
                initial={{ x: "0%" }}
                animate={{ x: "-101%" }}
                transition={{
                  duration: 1.25,
                  delay: 0.95,
                  ease: [0.77, 0, 0.175, 1],
                }}
              >
                <img
                  className="gate-image"
                  src="/assets/images/judicial_gpt_left_half.png"
                  alt="Judicial GPT left splash door"
                />
              </motion.div>

              {/* RIGHT DOOR */}
              <motion.div
                className="gate-panel gate-panel-right"
                initial={{ x: "0%" }}
                animate={{ x: "101%" }}
                transition={{
                  duration: 1.25,
                  delay: 0.95,
                  ease: [0.77, 0, 0.175, 1],
                }}
              >
                <img
                  className="gate-image"
                  src="/assets/images/judicial_gpt_right_half.png"
                  alt="Judicial GPT right splash door"
                />
              </motion.div>
            </motion.section>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
