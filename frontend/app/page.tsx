"use client";

import { useMemo, useState } from "react";
import NdaForm from "@/components/NdaForm";
import NdaPreview from "@/components/NdaPreview";
import DownloadPdfButton from "@/components/DownloadPdfButton";
import { buildCoverPageData } from "@/lib/ndaContent";
import type { NdaFormData } from "@/lib/types";

function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

const initialFormData: NdaFormData = {
  party1Name: "",
  party1Company: "",
  party2Name: "",
  party2Company: "",
  effectiveDate: todayIsoDate(),
  governingLaw: "",
  jurisdiction: "",
};

export default function Home() {
  const [formData, setFormData] = useState<NdaFormData>(initialFormData);
  const cover = useMemo(() => buildCoverPageData(formData), [formData]);

  return (
    <div className="min-h-full bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white px-6 py-4">
        <h1 className="text-lg font-semibold text-zinc-900">
          Mutual NDA Creator
        </h1>
        <p className="text-sm text-zinc-500">
          Fill in the details below to generate a Mutual Non-Disclosure
          Agreement.
        </p>
      </header>

      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-8 lg:grid-cols-[320px_1fr]">
        <aside className="flex flex-col gap-6">
          <NdaForm data={formData} onChange={setFormData} />
          <DownloadPdfButton cover={cover} />
        </aside>

        <section>
          <NdaPreview cover={cover} />
        </section>
      </main>
    </div>
  );
}
