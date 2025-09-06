"use client";
import type React from "react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import AnimatedLogo from "./animated-logo";

// Zod schema for email validation
const emailSchema = z
  .string()
  .email("Please enter a valid email address")
  .min(1, "Email is required")
  .max(100, "Email address is too long")
  .refine((email) => {
    const suspiciousPatterns = [
      /(.)\1{3,}/, // More than 3 consecutive identical characters
      /^[^a-zA-Z]/, // Doesn't start with a letter
      /^\d+@/, // Starts with only numbers before @
      /\.{2,}/, // Multiple consecutive dots
    ];
    return !suspiciousPatterns.some((pattern) => pattern.test(email));
  }, "Email format appears invalid")
  .transform((email) => email.toLowerCase().trim());

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const lastSubmissionTime = useRef<number>(0);
  const submissionCount = useRef<number>(0);

  // Rate limiting check
  const checkRateLimit = (): boolean => {
    const now = Date.now();
    const timeDiff = now - lastSubmissionTime.current;

    // Reset counter if more than 5 minutes have passed
    if (timeDiff > 5 * 60 * 1000) {
      submissionCount.current = 0;
    }
    // Allow max 3 submissions per 5 minutes
    if (submissionCount.current >= 3 && timeDiff < 5 * 60 * 1000) {
      return false;
    }
    // Prevent submissions faster than 10 seconds apart
    if (timeDiff < 10 * 1000 && submissionCount.current > 0) {
      return false;
    }

    return true;
  };

  const handleEmailChange = (value: string) => {
    // Clean input by removing unwanted characters
    const cleanValue = value.replace(/[^a-zA-Z0-9@._+-]/g, "");
    setEmail(cleanValue);

    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
    if (successMessage) {
      setSuccessMessage("");
    }
  };

  const validateEmail = (
    email: string
  ): { isValid: boolean; errors: string[] } => {
    try {
      emailSchema.parse(email);
      return { isValid: true, errors: [] };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          isValid: false,
          errors: error.errors.map((err) => err.message),
        };
      }
      return { isValid: false, errors: ["Invalid email format"] };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 🔹 1. Client-side validation
    const { isValid, errors: validationErrors } = validateEmail(email);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    // 🔹 2. Rate-limit check
    if (!checkRateLimit()) {
      setErrors(["Too many attempts. Please wait before trying again."]);
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error("Failed to subscribe");
      }

      // ✅ update submission trackers
      lastSubmissionTime.current = Date.now();
      submissionCount.current += 1;

      setIsSubmitted(true);
      setEmail("");
    } catch (error) {
      console.error(error);
      setErrors(["Something went wrong. Please try again."]);
    }

    setIsLoading(false);
  };

  if (isSubmitted) {
    return (
      <section className="w-full pt-20 pb-28 px-6">
        <div className="flex justify-center items-center">
          <AnimatedLogo
            className="text-primary mb-4"
            width={130}
            height={115}
            strokeWidth={90}
            durationMs={1400}
            aria-hidden="true"
          />
        </div>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-4xl font-semibold text-white mb-4 animate-in fade-in duration-500">
            Thanks for subscribing!
          </h2>
          <button
            onClick={() => setIsSubmitted(false)}
            className="text-zinc-400 hover:text-white transition-colors duration-200 underline"
          >
            Subscribe another email
          </button>
        </div>
      </section>
    );
  }

  const hasErrors = errors.length > 0;

  return (
    <section className="w-full pt-20 pb-28 px-6">
      <div className="flex justify-center items-center">
        <AnimatedLogo
          className="text-primary mb-4"
          width={130}
          height={115}
          strokeWidth={90}
          durationMs={1400}
          aria-hidden="true"
        />
      </div>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl text-center font-bold tracking-tight leading-tight mb-2">
          Want our product updates and news?
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-center mb-5">
          Join our newsletter to stay up to date.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-3 max-w-lg mx-auto animate-in slide-in-from-bottom-6 duration-700 delay-1500 mt-3"
        >
          <div className="flex-1 relative">
            <input
              type="email"
              placeholder="Your Email *"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              required
              disabled={isLoading}
              maxLength={100}
              autoComplete="email"
              className={`w-full bg-transparent border rounded-sm px-6 py-2 sm:py-4 text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-500 transition-colors duration-200 text-lg ${
                hasErrors ? "border-red-500 bg-red-900/20" : "border-zinc-600"
              }`}
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading || !email.trim()}
            className="px-6 py-5.5 sm:py-7 rounded-sm hover:bg-zinc-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {isLoading ? "Sending..." : "Send"}
          </Button>
        </form>

        {/* Error messages */}
        {hasErrors && (
          <div className="mt-4 text-center">
            {errors.map((error, index) => (
              <div key={index} className="text-red-400 text-sm mb-1">
                {error}
              </div>
            ))}
          </div>
        )}

        {/* Success message */}
        {successMessage && (
          <div className="mt-4 text-center text-green-400 text-sm">
            {successMessage}
          </div>
        )}
      </div>
    </section>
  );
}
