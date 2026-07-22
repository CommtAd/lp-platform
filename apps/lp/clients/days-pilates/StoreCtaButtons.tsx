/**
 * Store-specific CTA buttons in front of the reservation section. Each button
 * links straight out to that store's external reservation page (reserveform.com)
 * instead of revealing the on-page LPForm — conversions are captured by the
 * external system for this client (see scripts/check-rules.ts FORM_EXEMPT).
 */
export default function StoreCtaButtons({
  stores,
}: {
  stores: { value: string; label: string; url: string }[];
}) {
  const buttonStyle = {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    borderRadius: 999,
    background: "linear-gradient(135deg, #E8C877 0%, #C1902F 100%)",
    boxShadow: "0 10px 22px rgba(160,120,40,0.4)",
    color: "#FFFFFF",
    textDecoration: "none",
    fontSize: 14.5,
    fontWeight: 700,
    letterSpacing: "0.04em",
    textAlign: "center",
  } as const;

  return (
    <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
      {stores.map((s) => (
        <a key={s.value} href={s.url} target="_blank" rel="noopener noreferrer" style={buttonStyle}>
          {s.label}
        </a>
      ))}
    </div>
  );
}
