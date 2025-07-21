"use client";

import { ArrowRightIcon, Download, Loader } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "../../lib/utils";

interface RepoDownloadProps {
  url: string;
  free?: boolean;
}

export default function RepoDownload({ url, free = false }: RepoDownloadProps) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);

    try {
      window.location.href = url;
    } catch (error) {
      toast.error("Error occured while downloading. Please try again.");
      console.error("error", error);
    } finally {
      setLoading(false);
    }
  };

  if (free) {
    return (
      <Button
        onClick={handleDownload}
        disabled={loading}
        className="not-prose group relative rounded-sm w-full gap-2"
      >
        {loading ? "Downloading" : "Free Download"}
        {!loading && <Download className="size-4" />}
        {loading && <Loader className="size-4 animate-spin" />}
      </Button>
    );
  }

  return (
    <Link
      href="https://github.com/nyxui/nyxui"
      target="_blank"
      className={cn(
        buttonVariants({
          variant: "default",
        }),
        "not-prose group relative w-full gap-1",
      )}
    >
      Buy Now
      <ArrowRightIcon className="size-4 transition-all duration-300 ease-out group-hover:translate-x-1" />
    </Link>
  );
}
