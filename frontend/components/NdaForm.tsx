"use client";

import type { NdaFormData } from "@/lib/types";

interface NdaFormProps {
  data: NdaFormData;
  onChange: (data: NdaFormData) => void;
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  name: keyof NdaFormData;
  value: string;
  onChange: (name: keyof NdaFormData, value: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="font-medium text-zinc-700">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(name, e.target.value)}
        className="rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
      />
    </label>
  );
}

export default function NdaForm({ data, onChange }: NdaFormProps) {
  const update = (name: keyof NdaFormData, value: string) => {
    onChange({ ...data, [name]: value });
  };

  return (
    <form className="flex flex-col gap-6">
      <fieldset className="flex flex-col gap-3">
        <legend className="mb-1 text-sm font-semibold text-zinc-900">
          Party 1
        </legend>
        <Field
          label="Name"
          name="party1Name"
          value={data.party1Name}
          onChange={update}
          placeholder="Jane Doe"
        />
        <Field
          label="Company"
          name="party1Company"
          value={data.party1Company}
          onChange={update}
          placeholder="Acme Inc."
        />
      </fieldset>

      <fieldset className="flex flex-col gap-3">
        <legend className="mb-1 text-sm font-semibold text-zinc-900">
          Party 2
        </legend>
        <Field
          label="Name"
          name="party2Name"
          value={data.party2Name}
          onChange={update}
          placeholder="John Smith"
        />
        <Field
          label="Company"
          name="party2Company"
          value={data.party2Company}
          onChange={update}
          placeholder="Globex Corp."
        />
      </fieldset>

      <fieldset className="flex flex-col gap-3">
        <legend className="mb-1 text-sm font-semibold text-zinc-900">
          Agreement Details
        </legend>
        <Field
          label="Effective Date"
          name="effectiveDate"
          value={data.effectiveDate}
          onChange={update}
          type="date"
        />
        <Field
          label="Governing Law (state)"
          name="governingLaw"
          value={data.governingLaw}
          onChange={update}
          placeholder="Delaware"
        />
        <Field
          label="Jurisdiction (city or county, state)"
          name="jurisdiction"
          value={data.jurisdiction}
          onChange={update}
          placeholder="New Castle, DE"
        />
      </fieldset>
    </form>
  );
}
