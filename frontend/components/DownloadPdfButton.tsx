"use client";

import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import NdaPdfDocument from "./NdaPdfDocument";
import type { CoverPageData } from "@/lib/types";

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function DownloadPdfButton({
  cover,
}: {
  cover: CoverPageData;
}) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const blob = await pdf(<NdaPdfDocument cover={cover} />).toBlob();
      const url = URL.createObjectURL(blob);
      const party1 = slugify(cover.party1.name) || "party-1";
      const party2 = slugify(cover.party2.name) || "party-2";
      const link = document.createElement("a");
      link.href = url;
      link.download = `mutual-nda-${party1}-${party2}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isGenerating}
      className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isGenerating ? "Generating PDF…" : "Download PDF"}
    </button>
  );
}
