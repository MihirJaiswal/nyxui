"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Github, Twitter, ChevronRight } from "lucide-react"
import { ModeToggle } from "./ThemeToggle"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState("/")

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Set active link based on current path
  useEffect(() => {
    setActiveLink(window.location.pathname)
  }, [])

  const navLinks = [
    { href: "/components", label: "Components" },
    { href: "/docs", label: "Documentation" },
    { href: "/themes", label: "Themes" },
    { href: "/playground", label: "Playground" },
    { href: "/blog", label: "Blog" },
  ]

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-background/85 backdrop-blur-xl border-b shadow-sm" : "bg-background/50 backdrop-blur-sm",
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 md:px-8">
        {/* Logo & Desktop Navigation */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="group flex items-center gap-2 transition-all duration-300 hover:opacity-90">
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-md group-hover:shadow-primary/20 transition-all duration-300">
              <Image
                src="/logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="scale-100 group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="hidden md:block text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
              Nyx UI
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1 ml-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium rounded-md transition-all duration-300",
                  "hover:text-foreground hover:bg-muted/50",
                  "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-primary after:rounded-full after:transition-all after:duration-300",
                  "hover:after:w-4/5",
                  activeLink === link.href ? "text-foreground after:w-4/5 bg-muted/30" : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2">
            <Link href="https://github.com/nyx-ui/components" target="_blank" rel="noreferrer">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-muted/80 transition-all duration-300 hover:scale-105"
              >
                <Github className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Link href="https://twitter.com/nyx_ui" target="_blank" rel="noreferrer">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-muted/80 transition-all duration-300 hover:scale-105"
              >
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                <span className="sr-only">Twitter</span>
              </Button>
            </Link>
            <ModeToggle />
            <Button
              asChild
              className="ml-4 bg-gradient-to-r from-primary to-primary/90 hover:from-primary hover:to-primary shadow-md hover:shadow-primary/20 transition-all duration-300 transform hover:scale-105 hover:translate-y-[-1px]"
            >
              <Link href="/docs/getting-started" className="flex items-center gap-1">
                Get Started
                <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>

          <div className="flex md:hidden items-center space-x-2">
            <ModeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-none hover:bg-muted/80 rounded-full transition-all duration-300"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] bg-background/95 backdrop-blur-xl p-6 border-l border-muted/30"
              >
                <SheetHeader className="mb-6">
                  <SheetTitle className="flex items-center gap-2 text-lg font-bold">
                    <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-md">
                      <Image
                        src="/logo.png"
                        alt="Logo"
                        width={40}
                        height={40}
                        className="scale-100 transition-transform duration-300"
                      />
                    </div>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                      Nyx UI
                    </span>
                  </SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col space-y-1 mt-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "flex items-center text-sm font-medium p-3 rounded-md transition-all duration-300",
                        "hover:translate-x-1",
                        activeLink === link.href
                          ? "text-foreground bg-muted/50 border-l-2 border-primary pl-[10px]"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/30",
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                <div className="mt-8 flex flex-col space-y-4">
                  <div className="flex justify-around items-center p-2 rounded-lg bg-muted/30">
                    <Link href="https://github.com/nyx-ui/components" target="_blank" rel="noreferrer">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full hover:bg-background/80 transition-all duration-300"
                      >
                        <Github className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                        <span className="sr-only">GitHub</span>
                      </Button>
                    </Link>
                    <Link href="https://twitter.com/nyx_ui" target="_blank" rel="noreferrer">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full hover:bg-background/80 transition-all duration-300"
                      >
                        <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                        <span className="sr-only">Twitter</span>
                      </Button>
                    </Link>
                  </div>
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary hover:to-primary shadow-md hover:shadow-primary/20 transition-all duration-300 transform hover:scale-[1.02] hover:translate-y-[-1px]"
                  >
                    <Link href="/docs/getting-started" className="flex items-center justify-center gap-1">
                      Get Started
                      <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

