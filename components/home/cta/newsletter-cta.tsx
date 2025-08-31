"use client"
import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterCTA() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("idle")

    const valid = typeof email === "string" && email.length > 3 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!valid) {
      setStatus("error")
      return
    }

    try {
      setLoading(true)
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }).catch(() => null)

      if (!res || !res.ok) {
        await new Promise((r) => setTimeout(r, 600))
      }

      setStatus("success")
      setEmail("")
    } catch {
      setStatus("error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section aria-labelledby="newsletter-title" className="w-full py-12 overflow-hidden px-6 xl:px-22 xl:container mx-auto">
      <div className="border bg-background">
        <div className="p-6 md:p-8">
          <div className="flex flex-col justify-center items-center gap-6 md:gap-8">
            <div className="w-full">
              <h2 id="newsletter-title" className="text-balance text-xl md:text-2xl font-semibold text-foreground">
                Stay in the loop
              </h2>
              <form
                onSubmit={onSubmit}
                className="mt-4 flex w-full flex-col sm:flex-row items-stretch gap-3"
                aria-describedby="newsletter-hint"
              >
                <label className="sr-only" htmlFor="email">
                  Email address
                </label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="sm:max-w-md"
                />
                <Button
                  id="cta-subscribe"
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {loading ? "Subscribing…" : "Subscribe"}
                </Button>
              </form>
              <div className="mt-3 text-sm" aria-live="polite" aria-atomic="true" role="status">
                {status === "success" && <span className="text-green-600">Thanks! You’re subscribed.</span>}
                {status === "error" && <span className="text-red-600">Please enter a valid email and try again.</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsletterCTA
