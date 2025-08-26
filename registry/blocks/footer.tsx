'use client'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight, Sparkles, Moon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export const Footer = () => {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  // Quick Links data
  const quickLinks = [
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ]

  // Support Links data
  const supportLinks = [
    { label: "Help Center", href: "/help" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "FAQ", href: "/faq" },
  ]

  // Social Media data
  const socialLinks = [
    { icon: Facebook, href: "/", label: "Follow us on Facebook" },
    { icon: Twitter, href: "/", label: "Follow us on Twitter" },
    { icon: Instagram, href: "/", label: "Follow us on Instagram" },
    { icon: Linkedin, href: "/", label: "Connect with us on LinkedIn" },
  ]

  const handleNewsletterSubmit = async (e : React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubmitMessage("Successfully subscribed to newsletter!")
      setEmail("")
    } catch (error) {
      setSubmitMessage("Failed to subscribe. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer 
      className="relative bg-gradient-to-b from-background via-muted/50 to-background text-foreground overflow-hidden border"
      role="contentinfo"
      aria-labelledby="footer-heading"
    >
      {/* Screen reader only heading */}
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      
      <div className="relative container mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 px-6">
          {/* Company Info */}
          <section aria-labelledby="company-info">
            <h3 id="company-info" className="sr-only">Company Information</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
                  <Moon className="h-4 w-4 text-primary-foreground" aria-hidden="true" />
                </div>
                <span className="text-xl font-bold">NYX UI</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                Building the future of user interfaces.
              </p>
              
              {/* Contact Information */}
              <address className="space-y-3 text-sm text-muted-foreground not-italic">
                <div className="flex items-center gap-3 hover:text-foreground transition-colors">
                  <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center" aria-hidden="true">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span>City, Address</span>
                </div>
                <div className="flex items-center gap-3 hover:text-foreground transition-colors">
                  <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center" aria-hidden="true">
                    <Phone className="h-4 w-4" />
                  </div>
                  <Link
                    href="tel:+916969696969" 
                    className="hover:underline focus:underline focus:outline-none"
                    aria-label="Call us at +91 69 69 69 69 69"
                  >
                    (+91) 69696969
                  </Link>
                </div>
                <div className="flex items-center gap-3 hover:text-foreground transition-colors">
                  <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center" aria-hidden="true">
                    <Mail className="h-4 w-4" />
                  </div>
                  <Link
                    href="mailto:hello@nyxui.com" 
                    className="hover:underline focus:underline focus:outline-none"
                    aria-label="Send us an email"
                  >
                    hello@nyxui.com
                  </Link>
                </div>
              </address>
            </div>
          </section>

          {/* Quick Links */}
          <nav aria-labelledby="quick-links">
            <h3 id="quick-links" className="text-lg font-semibold text-foreground mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm" role="list">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-muted-foreground hover:text-foreground focus:text-foreground transition-all duration-200 focus:outline-none focus:underline"
                  >
                    <div className="relative flex items-center">
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity absolute -left-4" aria-hidden="true" />
                      <span className="group-hover:translate-x-4 group-focus:translate-x-4 transition-transform duration-200">
                        {link.label}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Support */}
          <nav aria-labelledby="support-links">
            <h3 id="support-links" className="text-lg font-semibold text-foreground mb-6">
              Support
            </h3>
            <ul className="space-y-3 text-sm" role="list">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-muted-foreground hover:text-foreground focus:text-foreground transition-all duration-200 focus:outline-none focus:underline"
                  >
                    <div className="relative flex items-center">
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity absolute -left-4" aria-hidden="true" />
                      <span className="group-hover:translate-x-4 group-focus:translate-x-4 transition-transform duration-200">
                        {link.label}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Newsletter */}
          <section aria-labelledby="newsletter">
            <h3 id="newsletter" className="text-lg font-semibold text-foreground mb-6">
              Stay Updated
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Join our community and get the latest updates delivered to your inbox.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <div className="relative">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address for newsletter subscription
                </label>
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-muted/50 backdrop-blur-sm text-foreground border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 placeholder:text-muted-foreground"
                  aria-describedby={submitMessage ? "newsletter-status" : undefined}
                />
              </div>
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className="group w-full px-4 py-3 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background flex items-center justify-center gap-2"
                aria-describedby={submitMessage ? "newsletter-status" : undefined}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
              </button>
              
              {submitMessage && (
                <div 
                  id="newsletter-status"
                  className="text-sm text-center p-2 rounded-lg bg-muted/50"
                  role="status"
                  aria-live="polite"
                >
                  {submitMessage}
                </div>
              )}
            </form>
          </section>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 px-6">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Nyx UI, All rights reserved
            </div>

            {/* Social Media Icons */}
            <nav aria-label="Social media links">
              <ul className="flex gap-3" role="list">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon
                  return (
                    <li key={index}>
                      <Link
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group w-10 h-10 bg-muted/50 backdrop-blur-sm hover:bg-primary focus:bg-primary text-muted-foreground hover:text-primary-foreground focus:text-primary-foreground transition-all duration-200 rounded-xl flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                        aria-label={social.label}
                      >
                        <IconComponent className="h-4 w-4 group-hover:scale-110 group-focus:scale-110 transition-transform duration-200" aria-hidden="true" />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}