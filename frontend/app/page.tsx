"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import NdaChat from "@/components/NdaChat";
import NdaPreview from "@/components/NdaPreview";
import DownloadPdfButton from "@/components/DownloadPdfButton";
import { buildCoverPageData } from "@/lib/ndaContent";
import { clearSession, getSessionEmail } from "@/lib/session";
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
  const router = useRouter();
  const [formData, setFormData] = useState<NdaFormData>(initialFormData);
  const [email, setEmail] = useState<string | null>(null);
  const cover = useMemo(() => buildCoverPageData(formData), [formData]);

  useEffect(() => {
    const sessionEmail = getSessionEmail();
    if (!sessionEmail) {
      router.replace("/login/");
      return;
    }
    setEmail(sessionEmail);
  }, [router]);

  if (!email) {
    return null;
  }

  const handleLogout = () => {
    clearSession();
    router.replace("/login/");
  };

  return (
    <div className="min-h-full bg-zinc-50">
      <header className="flex items-center justify-between border-b border-zinc-200 bg-white px-6 py-4">
        <div>
          <h1 className="text-lg font-semibold text-navy">
            Mutual NDA Creator
          </h1>
          <p className="text-sm text-gray-text">
            Chat with the assistant to fill in the details and generate a
            Mutual Non-Disclosure Agreement.
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-text">
          <span>{email}</span>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-md border border-zinc-300 px-3 py-1.5 font-medium text-zinc-700 hover:bg-zinc-100"
          >
            Log out
          </button>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-8 lg:grid-cols-[380px_1fr]">
        <aside className="flex flex-col gap-6">
          <NdaChat fields={formData} onFieldsChange={setFormData} />
          <DownloadPdfButton cover={cover} />
        </aside>

        <section>
          <NdaPreview cover={cover} />
        </section>
      </main>
    </div>
  );
}
