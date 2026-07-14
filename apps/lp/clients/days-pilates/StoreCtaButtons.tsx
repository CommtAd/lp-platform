"use client";

import { useState, type ReactNode } from "react";
import LPForm, { type LPFormField } from "@/components/LPForm";

/**
 * Store-specific CTA buttons in front of the reservation form. Picking a
 * store pre-selects that store's toggle option and reveals the real LPForm
 * (so the submission still goes through the platform's CV capture) instead
 * of asking the visitor to pick the toggle themselves.
 */
export default function StoreCtaButtons({
  clientSlug,
  accent,
  fields,
  submitLabel,
  errorMessage,
  disclaimer,
}: {
  clientSlug: string;
  accent: string;
  fields: LPFormField[];
  submitLabel?: string;
  errorMessage?: string;
  disclaimer?: ReactNode;
}) {
  const [selectedStore, setSelectedStore] = useState<string | null>(null);

  const buttonStyle = {
    flex: 1,
    height: 56,
    borderRadius: 999,
    border: "none",
    background: "linear-gradient(135deg, #E8C877 0%, #C1902F 100%)",
    boxShadow: "0 10px 22px rgba(160,120,40,0.4)",
    color: "#FFFFFF",
    fontFamily: "inherit",
    fontSize: 14.5,
    fontWeight: 700,
    letterSpacing: "0.04em",
    cursor: "pointer",
  } as const;

  if (selectedStore) {
    return (
      <>
        <button
          type="button"
          onClick={() => setSelectedStore(null)}
          style={{
            display: "block",
            margin: "20px auto 0",
            background: "none",
            border: "none",
            color: "#9A9C90",
            fontSize: 12,
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          店舗を選び直す
        </button>
        <LPForm
          clientSlug={clientSlug}
          accent={accent}
          fields={fields}
          submitLabel={submitLabel}
          errorMessage={errorMessage}
          disclaimer={disclaimer}
          initialValues={{ store: selectedStore }}
        />
      </>
    );
  }

  return (
    <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
      <button type="button" onClick={() => setSelectedStore("umeda")} style={buttonStyle}>
        梅田店の体験予約する
      </button>
      <button type="button" onClick={() => setSelectedStore("shinsaibashi")} style={buttonStyle}>
        心斎橋店の体験予約する
      </button>
    </div>
  );
}
