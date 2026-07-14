"use client";

/**
 * Store-specific CTA buttons in place of the reservation form. Each button
 * links straight out to that store's external reservation system.
 *
 * Deviation from the platform norm (documented per team decision): this
 * bypasses LPForm entirely, so bookings made here are NOT captured as CVs —
 * they won't show up in the dashboard or trigger CV notifications. Confirmed
 * with the client owner; the tradeoff is intentional for this LP only.
 *
 * TODO: replace the placeholder hrefs below with the real per-store
 * reservation URLs once shared.
 */
export default function StoreCtaButtons({ accent }: { accent: string }) {
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
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  } as const;

  return (
    <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
      <a href="#TODO-umeda-reservation-url" style={buttonStyle}>
        梅田店の体験予約する
      </a>
      <a href="#TODO-shinsaibashi-reservation-url" style={buttonStyle}>
        心斎橋店の体験予約する
      </a>
    </div>
  );
}
