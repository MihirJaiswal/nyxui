"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { useProAccess } from "@/components/providers/pro-access-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

/** Polar customer portal — where Pro customers manage billing. */
const POLAR_PORTAL_URL =
  process.env.NEXT_PUBLIC_POLAR_PORTAL_URL ?? "https://polar.sh/purchases";

/** Shown when the Google profile photo fails to load or is missing. */
const FALLBACK_AVATAR = "/blocks/images/avatars/gradient.avif";

/**
 * Account button for the navbar. Three states:
 *   - loading  → 36px placeholder that keeps the layout stable
 *   - signed out → outlined pill with a Google glyph, so it reads as an
 *                  action rather than another nav link
 *   - signed in  → avatar chip with a Pro dot, opens the account menu
 *
 * Every state is 36px tall so it sits flush with the ghost icon buttons
 * next to it (github, x, theme toggle).
 */
export function ProAccountButton() {
  const { user, entitled, plan, loading, signIn, signOut } = useProAccess();
  const [busy, setBusy] = useState(false);
  const [avatarFailed, setAvatarFailed] = useState(false);

  const avatarSrc =
    avatarFailed || !user?.photoURL ? FALLBACK_AVATAR : user.photoURL;

  if (loading && !user) {
    return (
      <div
        aria-hidden="true"
        className="ml-1 flex h-9 w-9 items-center justify-center"
      >
        <Loader2 className="size-3.5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return (
      <button
        type="button"
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          try {
            await signIn();
          } catch {
            // Popup dismissed.
          } finally {
            setBusy(false);
          }
        }}
        className={cn(
          "ml-1 inline-flex h-9 items-center rounded-lg px-2.5 text-[13px] font-medium",
          "text-neutral-500 transition-colors hover:text-neutral-950",
          "dark:text-neutral-400 dark:hover:text-white",
          "disabled:cursor-not-allowed disabled:opacity-60",
        )}
      >
        {busy ? (
          <Loader2 aria-hidden="true" className="size-3.5 animate-spin" />
        ) : (
          <span>Login</span>
        )}
      </button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Account menu"
          className={cn(
            "ml-1 relative inline-flex h-9 items-center gap-2 rounded-full border border-transparent pl-1 pr-2.5",
            "transition-colors hover:border-border/60 hover:bg-muted/60 data-[state=open]:border-border/60 data-[state=open]:bg-muted/60",
          )}
        >
          <span className="relative flex size-7 items-center justify-center rounded-full bg-muted/60">
            <Image
              src={avatarSrc}
              alt=""
              width={28}
              height={28}
              className="size-7 rounded-full object-cover"
              unoptimized
              onError={() => setAvatarFailed(true)}
            />
            {entitled && (
              <span
                aria-hidden="true"
                title={plan === "lifetime" ? "Lifetime Pro" : "Annual Pro"}
                className="absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full bg-brand ring-2 ring-background"
              />
            )}
          </span>
          {entitled && (
            <span className="hidden font-mono text-[10px] font-semibold tracking-wider text-brand uppercase lg:inline">
              Pro
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center gap-3">
            <Image
              src={avatarSrc}
              alt=""
              width={36}
              height={36}
              className="size-9 rounded-full object-cover"
              unoptimized
              onError={() => setAvatarFailed(true)}
            />
            <div className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-foreground">
                {user.displayName ?? "Signed in"}
              </span>
              <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                {user.email}
              </span>
            </div>
          </div>

          <div className="mt-3 rounded-md bg-muted/60 px-2.5 py-1.5">
            <span className="font-mono text-[10px] font-semibold tracking-wider uppercase">
              {entitled ? (
                <span className="text-brand">
                  {plan === "lifetime" ? "Lifetime Pro" : "Annual Pro"}
                </span>
              ) : (
                <span className="text-muted-foreground">Free plan</span>
              )}
            </span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {entitled && (
          <DropdownMenuItem asChild>
            <a
              href={POLAR_PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Manage billing
            </a>
          </DropdownMenuItem>
        )}
        {!entitled && (
          <DropdownMenuItem asChild>
            <Link href="/pro" className="text-brand focus:text-brand">
              Get Pro access
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={() => void signOut()}
          className="text-muted-foreground"
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProAccountButton;
