"use client";

import { useEffect, useMemo, useState, type ComponentProps } from "react";
import LPForm, { type LPFormField } from "@/components/LPForm";
import { HAS_SUPABASE, SUPABASE_ANON_KEY, SUPABASE_URL } from "@/lib/env";

/**
 * 予約フォーム（LPForm）に「LPで予約が入った枠を出さない」処理を足したラッパー。
 *
 * 時間の選択肢は config.ts の HACOMONO_OPEN_SLOTS（hacomono の空き枠の写し）を
 * dateLinkedOptions.byDate で日付ごとに出している。ここではページ表示時に
 * Supabase の get_booked_slots（supabase/migrations/0042_get_booked_slots.sql）から
 * このLPに入った予約の「希望日＋時間」を読み、その組を byDate から取り除く。
 *
 * 返ってくるのは日付と時刻だけ（氏名などは関数側で返さない）。
 * 取得に失敗した／関数が未適用のときは、写した空き枠をそのまま出す（フォームは止めない）。
 * 送信先は LPForm のまま（基盤固定）。
 */
type Props = ComponentProps<typeof LPForm>;

type Booked = Set<string>; // "YYYY-MM-DD|H:MM"

async function fetchBooked(slug: string): Promise<Booked> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_booked_slots`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ p_slug: slug }),
    cache: "no-store",
  });
  if (!res.ok) return new Set();
  const rows = (await res.json()) as { slot_date: string; slot_time: string }[];
  return new Set(rows.map((r) => `${r.slot_date}|${r.slot_time}`));
}

function removeBooked(fields: LPFormField[], booked: Booked): LPFormField[] {
  if (booked.size === 0) return fields;
  return fields.map((f) => {
    if (f.type !== "select" || !f.dateLinkedOptions?.byDate) return f;
    const byDate = Object.fromEntries(
      Object.entries(f.dateLinkedOptions.byDate).map(([d, opts]) => [
        d,
        opts.filter((o) => !booked.has(`${d}|${o.value}`)),
      ]),
    );
    return { ...f, dateLinkedOptions: { ...f.dateLinkedOptions, byDate } };
  });
}

export default function SlotForm(props: Props) {
  const [booked, setBooked] = useState<Booked>(() => new Set());

  useEffect(() => {
    if (!HAS_SUPABASE) return;
    let alive = true;
    fetchBooked(props.clientSlug)
      .then((b) => alive && setBooked(b))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [props.clientSlug]);

  const fields = useMemo(() => removeBooked(props.fields, booked), [props.fields, booked]);
  return <LPForm {...props} fields={fields} />;
}
