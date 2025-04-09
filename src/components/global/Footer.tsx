import Link from 'next/link';
import React from 'react';

const navLinks = [
  { href: "/components", label: "Components" },
  { href: "/docs", label: "Documentation" },
];

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-black text-gray-600 dark:text-gray-400 py-6 px-4 md:px-8 font-sans border-t border-gray-200 dark:border-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between relative">
          <div className="flex items-center mb-4 md:mb-0">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="h-8 w-8 border-2 border-white dark:border-black flex items-center justify-center bg-black dark:bg-white rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.0" fill="currentColor" viewBox="185.7693927125506 148.35232 684.0200809716599 711.7382399999999" preserveAspectRatio="xMidYMid meet" width="28" height="28">
                  <g transform="translate(0.000000,1024.000000) scale(0.100000,-0.100000)" fill="currentColor" className="text-white dark:text-black">
                    <path d="M0 5120 l0 -5120 5120 0 5120 0 0 5120 0 5120 -5120 0 -5120 0 0 -5120z m5375 2860 c140 -12 393 -49 415 -61 10 -5 -2 -8 -34 -9 -70 0 -244 -27 -371 -57 -432 -101 -860 -347 -1160 -665 -351 -372 -581 -849 -662 -1368 -27 -173 -24 -540 5 -710 76 -448 246 -823 520 -1151 351 -419 881 -713 1422 -790 141 -20 478 -18 615 4 526 86 976 314 1364 692 151 147 261 280 367 440 126 192 247 443 304 633 12 40 24 71 26 69 2 -2 -1 -57 -7 -123 -71 -841 -511 -1626 -1193 -2132 -693 -513 -1598 -694 -2436 -486 -1191 296 -2083 1312 -2224 2534 -18 155 -21 467 -6 621 68 689 347 1289 819 1760 197 196 400 347 634 473 475 254 1051 372 1602 326z m1946 -570 c13 -112 50 -246 86 -313 71 -130 243 -220 493 -258 l84 -13 -107 -17 c-388 -62 -499 -187 -565 -639 l-8 -55 -17 128 c-10 70 -28 161 -41 202 -69 217 -223 323 -529 365 -45 7 -83 13 -85 14 -1 2 24 6 56 10 166 19 353 90 435 165 85 78 131 204 162 440 8 58 15 111 16 116 1 6 4 -3 5 -20 2 -16 9 -73 15 -125z m-1840 -48 c141 -133 236 -305 293 -532 37 -146 46 -224 46 -408 0 -93 4 -194 10 -223 21 -114 153 -338 301 -510 117 -136 142 -175 147 -228 5 -64 -23 -102 -128 -173 -158 -106 -176 -156 -99 -276 34 -54 38 -103 10 -148 -25 -41 -78 -81 -137 -103 l-46 -18 42 -7 c48 -8 95 -48 106 -91 9 -34 -11 -77 -65 -139 -37 -42 -41 -53 -41 -100 0 -30 7 -73 16 -97 37 -103 16 -206 -58 -276 -105 -101 -280 -109 -623 -25 -122 29 -170 36 -255 36 -92 1 -111 -2 -154 -23 -137 -67 -201 -210 -194 -429 2 -56 0 -102 -3 -102 -11 0 -157 158 -222 240 -174 217 -272 427 -324 695 -27 140 -24 446 6 585 56 262 165 487 344 710 34 41 176 190 317 330 280 278 357 372 443 539 101 194 134 346 124 565 -6 116 -31 276 -53 330 -14 36 114 -44 197 -122z m1730 -1872 c20 -76 56 -136 103 -175 55 -45 172 -92 252 -102 l59 -7 -93 -18 c-221 -44 -303 -134 -333 -367 -16 -120 -21 -127 -30 -41 -29 267 -109 361 -344 409 l-84 17 84 16 c152 29 250 90 294 184 21 44 50 185 52 253 1 24 6 9 15 -44 7 -44 18 -100 25 -125z" />
                  </g>
                </svg>
              </div>
              <span className="font-bold text-gray-800 dark:text-gray-100">
                Nyx <span className="text-purple-700 dark:text-purple-400">UI</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-4 md:mt-0 text-gray-900 dark:text-gray-100 relative">
            <span>🚀Brought to you by </span>
            <Link
              href="https://github.com/MihirJaiswal"
              target="_blank"
              rel='noopener noreferrer'
              className="text-purple-800 dark:text-purple-300 underline"
            >
              Mihir
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;