"use client";

import { ArrowRightIcon, Download, Github, Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { externalLinks } from "@/lib/links";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

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
      <button
        onClick={handleDownload}
        disabled={loading}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "not-prose group relative gap-2 rounded-lg",
        )}
      >
        {loading ? "Downloading" : "Free Download"}
        {!loading && <Download className="size-4" />}
        {loading && <Loader className="size-4 animate-spin" />}
      </button>
    );
  }

  return (
    <a
      href={externalLinks.githubRepo}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        buttonVariants({
          variant: "outline",
        }),
        "not-prose group relative gap-2 rounded-lg",
      )}
    >
      <Github className="size-4" />
      Buy Now
      <ArrowRightIcon className="size-4 transition-all duration-300 ease-out group-hover:translate-x-1" />
    </a>
  );
}
