"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Github, Twitter, Search } from "lucide-react"
import { ModeToggle } from "./ThemeToggle"
import { cn } from "@/lib/utils"
import { CommandPalette } from "./CommandPallete"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState("/")
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  useEffect(() => {
    setActiveLink(window.location.pathname)
  }, [])

  const navLinks = [
    { href: "/components", label: "Components" },
    { href: "/docs", label: "Documentation" },
    { href: "/playground", label: "Playground" },
  ]

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 bg-white dark:bg-black border-b",
        scrolled ? "bg-background/85 backdrop-blur-xl shadow-sm" : "bg-background/50 backdrop-blur-sm",
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center space-x-4">
          <Link href="/" className="group flex items-center transition-all duration-300 hover:opacity-90">
            <div className="relative flex items-center justify-center overflow-hidden ">
              <div className="h-10 w-10 border-4 border-white dark:border-black flex items-center justify-center bg-black dark:bg-white rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" version="1.0" fill="currentColor" viewBox="185.7693927125506 148.35232 684.0200809716599 711.7382399999999" preserveAspectRatio="xMidYMid meet" width="684.0200809716599" height="711.7382399999999">
                <g id="deeditor_bgCarrier" strokeWidth="0">
                  <rect id="dee_c_e" x="-3" y="-3" width="1030" height="1030" rx="0"/>
                </g>

                <g transform="translate(0.000000,1024.000000) scale(0.100000,-0.100000)" fill="currentColor" className="text-white dark:text-black">
                <path d="M0 5120 l0 -5120 5120 0 5120 0 0 5120 0 5120 -5120 0 -5120 0 0 -5120z m5375 2860 c140 -12 393 -49 415 -61 10 -5 -2 -8 -34 -9 -70 0 -244 -27 -371 -57 -432 -101 -860 -347 -1160 -665 -351 -372 -581 -849 -662 -1368 -27 -173 -24 -540 5 -710 76 -448 246 -823 520 -1151 351 -419 881 -713 1422 -790 141 -20 478 -18 615 4 526 86 976 314 1364 692 151 147 261 280 367 440 126 192 247 443 304 633 12 40 24 71 26 69 2 -2 -1 -57 -7 -123 -71 -841 -511 -1626 -1193 -2132 -693 -513 -1598 -694 -2436 -486 -1191 296 -2083 1312 -2224 2534 -18 155 -21 467 -6 621 68 689 347 1289 819 1760 197 196 400 347 634 473 475 254 1051 372 1602 326z m1946 -570 c13 -112 50 -246 86 -313 71 -130 243 -220 493 -258 l84 -13 -107 -17 c-388 -62 -499 -187 -565 -639 l-8 -55 -17 128 c-10 70 -28 161 -41 202 -69 217 -223 323 -529 365 -45 7 -83 13 -85 14 -1 2 24 6 56 10 166 19 353 90 435 165 85 78 131 204 162 440 8 58 15 111 16 116 1 6 4 -3 5 -20 2 -16 9 -73 15 -125z m-1840 -48 c141 -133 236 -305 293 -532 37 -146 46 -224 46 -408 0 -93 4 -194 10 -223 21 -114 153 -338 301 -510 117 -136 142 -175 147 -228 5 -64 -23 -102 -128 -173 -158 -106 -176 -156 -99 -276 34 -54 38 -103 10 -148 -25 -41 -78 -81 -137 -103 l-46 -18 42 -7 c48 -8 95 -48 106 -91 9 -34 -11 -77 -65 -139 -37 -42 -41 -53 -41 -100 0 -30 7 -73 16 -97 37 -103 16 -206 -58 -276 -105 -101 -280 -109 -623 -25 -122 29 -170 36 -255 36 -92 1 -111 -2 -154 -23 -137 -67 -201 -210 -194 -429 2 -56 0 -102 -3 -102 -11 0 -157 158 -222 240 -174 217 -272 427 -324 695 -27 140 -24 446 6 585 56 262 165 487 344 710 34 41 176 190 317 330 280 278 357 372 443 539 101 194 134 346 124 565 -6 116 -31 276 -53 330 -14 36 114 -44 197 -122z m1730 -1872 c20 -76 56 -136 103 -175 55 -45 172 -92 252 -102 l59 -7 -93 -18 c-221 -44 -303 -134 -333 -367 -16 -120 -21 -127 -30 -41 -29 267 -109 361 -344 409 l-84 17 84 16 c152 29 250 90 294 184 21 44 50 185 52 253 1 24 6 9 15 -44 7 -44 18 -100 25 -125z" />
                </g>
              </svg>
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="hidden md:block text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
              Nyx{" "}<span className="text-purple-700 dark:text-purple-400">UI</span>
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
            <div className="hidden md:flex items-center flex-1 justify-center px-4">
              <CommandPalette />
            </div>
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
          </div>

          <div className="flex md:hidden items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="border-none hover:bg-muted/80 rounded-full transition-all duration-300"
              onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'k', 'ctrlKey': true}))}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
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
                    <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full ">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.0" fill="currentColor" viewBox="185.7693927125506 148.35232 684.0200809716599 711.7382399999999" preserveAspectRatio="xMidYMid meet" width="684.0200809716599" height="711.7382399999999">
                      <g id="deeditor_bgCarrier" strokeWidth="0">
                        <rect id="dee_c_e" x="-3" y="-3" width="1030" height="1030" rx="0"/>
                      </g>

                      <g transform="translate(0.000000,1024.000000) scale(0.100000,-0.100000)" fill="currentColor" className="text-white dark:text-black">
                      <path d="M0 5120 l0 -5120 5120 0 5120 0 0 5120 0 5120 -5120 0 -5120 0 0 -5120z m5375 2860 c140 -12 393 -49 415 -61 10 -5 -2 -8 -34 -9 -70 0 -244 -27 -371 -57 -432 -101 -860 -347 -1160 -665 -351 -372 -581 -849 -662 -1368 -27 -173 -24 -540 5 -710 76 -448 246 -823 520 -1151 351 -419 881 -713 1422 -790 141 -20 478 -18 615 4 526 86 976 314 1364 692 151 147 261 280 367 440 126 192 247 443 304 633 12 40 24 71 26 69 2 -2 -1 -57 -7 -123 -71 -841 -511 -1626 -1193 -2132 -693 -513 -1598 -694 -2436 -486 -1191 296 -2083 1312 -2224 2534 -18 155 -21 467 -6 621 68 689 347 1289 819 1760 197 196 400 347 634 473 475 254 1051 372 1602 326z m1946 -570 c13 -112 50 -246 86 -313 71 -130 243 -220 493 -258 l84 -13 -107 -17 c-388 -62 -499 -187 -565 -639 l-8 -55 -17 128 c-10 70 -28 161 -41 202 -69 217 -223 323 -529 365 -45 7 -83 13 -85 14 -1 2 24 6 56 10 166 19 353 90 435 165 85 78 131 204 162 440 8 58 15 111 16 116 1 6 4 -3 5 -20 2 -16 9 -73 15 -125z m-1840 -48 c141 -133 236 -305 293 -532 37 -146 46 -224 46 -408 0 -93 4 -194 10 -223 21 -114 153 -338 301 -510 117 -136 142 -175 147 -228 5 -64 -23 -102 -128 -173 -158 -106 -176 -156 -99 -276 34 -54 38 -103 10 -148 -25 -41 -78 -81 -137 -103 l-46 -18 42 -7 c48 -8 95 -48 106 -91 9 -34 -11 -77 -65 -139 -37 -42 -41 -53 -41 -100 0 -30 7 -73 16 -97 37 -103 16 -206 -58 -276 -105 -101 -280 -109 -623 -25 -122 29 -170 36 -255 36 -92 1 -111 -2 -154 -23 -137 -67 -201 -210 -194 -429 2 -56 0 -102 -3 -102 -11 0 -157 158 -222 240 -174 217 -272 427 -324 695 -27 140 -24 446 6 585 56 262 165 487 344 710 34 41 176 190 317 330 280 278 357 372 443 539 101 194 134 346 124 565 -6 116 -31 276 -53 330 -14 36 114 -44 197 -122z m1730 -1872 c20 -76 56 -136 103 -175 55 -45 172 -92 252 -102 l59 -7 -93 -18 c-221 -44 -303 -134 -333 -367 -16 -120 -21 -127 -30 -41 -29 267 -109 361 -344 409 l-84 17 84 16 c152 29 250 90 294 184 21 44 50 185 52 253 1 24 6 9 15 -44 7 -44 18 -100 25 -125z" />
                      </g>
                    </svg>
                    </div>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                      Nyx {" "}
                      <span className="text-purple-500">UI</span>
                    </span>
                  </SheetTitle>
                </SheetHeader>

                {/* Mobile search */}
                <div className="mb-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-sm text-muted-foreground rounded-md"
                    onClick={() => {
                      document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'k', 'ctrlKey': true}))
                    }}
                  >
                    <Search className="mr-2 h-4 w-4" />
                    <span>Search components...</span>
                  </Button>
                </div>

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
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}