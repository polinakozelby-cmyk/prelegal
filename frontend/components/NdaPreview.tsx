import { STANDARD_TERMS_SECTIONS, SOURCE_ATTRIBUTION } from "@/lib/ndaContent";
import type { CoverPageData } from "@/lib/types";

function CoverField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
        {label}
      </dt>
      <dd className="text-zinc-900">{value}</dd>
    </div>
  );
}

export default function NdaPreview({ cover }: { cover: CoverPageData }) {
  return (
    <article className="flex flex-col gap-8 bg-white p-8 text-sm leading-relaxed text-zinc-800 shadow-sm ring-1 ring-zinc-200">
      <header className="flex flex-col gap-1 border-b border-zinc-200 pb-6">
        <h1 className="text-2xl font-semibold text-zinc-900">
          Mutual Non-Disclosure Agreement
        </h1>
        <p className="text-zinc-500">Cover Page</p>
      </header>

      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <CoverField label="Purpose" value={cover.purpose} />
        <CoverField label="Effective Date" value={cover.effectiveDate} />
        <CoverField label="MNDA Term" value={cover.mndaTerm} />
        <CoverField
          label="Term of Confidentiality"
          value={cover.confidentialityTerm}
        />
        <CoverField label="Governing Law" value={cover.governingLaw} />
        <CoverField label="Jurisdiction" value={cover.jurisdiction} />
        <CoverField label="MNDA Modifications" value={cover.modifications} />
      </dl>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr>
              <th className="border border-zinc-200 bg-zinc-50 p-2"></th>
              <th className="border border-zinc-200 bg-zinc-50 p-2 font-semibold">
                Party 1
              </th>
              <th className="border border-zinc-200 bg-zinc-50 p-2 font-semibold">
                Party 2
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="border border-zinc-200 p-2 font-medium text-zinc-500">
                Print Name
              </th>
              <td className="border border-zinc-200 p-2">
                {cover.party1.name}
              </td>
              <td className="border border-zinc-200 p-2">
                {cover.party2.name}
              </td>
            </tr>
            <tr>
              <th className="border border-zinc-200 p-2 font-medium text-zinc-500">
                Company
              </th>
              <td className="border border-zinc-200 p-2">
                {cover.party1.company}
              </td>
              <td className="border border-zinc-200 p-2">
                {cover.party2.company}
              </td>
            </tr>
            <tr>
              <th className="border border-zinc-200 p-2 font-medium text-zinc-500">
                Signature
              </th>
              <td className="border border-zinc-200 p-2 text-zinc-400">
                &nbsp;
              </td>
              <td className="border border-zinc-200 p-2 text-zinc-400">
                &nbsp;
              </td>
            </tr>
            <tr>
              <th className="border border-zinc-200 p-2 font-medium text-zinc-500">
                Date
              </th>
              <td className="border border-zinc-200 p-2 text-zinc-400">
                &nbsp;
              </td>
              <td className="border border-zinc-200 p-2 text-zinc-400">
                &nbsp;
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <section className="flex flex-col gap-4 border-t border-zinc-200 pt-6">
        <h2 className="text-lg font-semibold text-zinc-900">
          Standard Terms
        </h2>
        {STANDARD_TERMS_SECTIONS.map((section) => (
          <div key={section.title} className="flex flex-col gap-1">
            <h3 className="font-semibold text-zinc-900">{section.title}</h3>
            <p>{section.body}</p>
          </div>
        ))}
      </section>

      <footer className="border-t border-zinc-200 pt-4 text-xs text-zinc-400">
        {SOURCE_ATTRIBUTION}
      </footer>
    </article>
  );
}
