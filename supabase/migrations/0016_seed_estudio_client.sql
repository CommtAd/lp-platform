-- Pilates E-studio（参宮橋 / 女性専用パーソナルピラティス, slug=estudio）の clients 行を作成する。
--
-- LP コードは apps/lp/clients/estudio/。ページ表示（/estudio ルーティング）だけでなく、
-- LPShell が同じ slug で clients 行を引いてタグ注入・noindex・CV転送を行うため、
-- この行が無いとタグが一切注入されない（days-pilates / bee-pilates-ebisu で実際に発生した
-- 不具合クラス）。フォルダ名 estudio と clients.slug を必ず一致させること。
--
-- タグ: ヒアリングシート（2026-08）より Meta（旧Facebook）Pixel を注入する。
--   Pixel ID = 997903674886595（計測目的＝予約ページのコンバージョン）。
--
-- confirmation_meta.letter: 単一店舗・体験60分のため beat-pilates と同形式の
-- 専用テンプレートを使う。可変部分（メニュー・店舗名・住所・持ち物・道案内文）のみ持たせ、
-- 固定文言は form-submit/index.ts の buildConfirmationHtml 側にある。
-- adminSimple: 単一店舗・第2希望のみのフォームで常に空になる項目（店舗名・UTM等）を
-- 運営者宛通知から省く。
--
-- notify_emails は空。運営者宛の新規予約通知を受け取るには、ダッシュボードまたは
-- 下記配列に通知先メールアドレスを設定すること（空でも入力者宛確認メールと送信自体は動作）。

insert into public.clients (slug, name, status, meta_pixel_id, cv_events, confirmation_meta, notify_emails)
values (
  'estudio',
  'Pilates E-studio',
  'draft',
  '997903674886595',
  '{"form_submit": true, "tel_tap": false, "line_tap": false}'::jsonb,
  '{
    "adminSimple": true,
    "letter": {
      "menu": "60分体験レッスン",
      "storeLabel": "Pilates E-studio（参宮橋）",
      "storeAddressLines": [
        "〒151-0053",
        "東京都渋谷区代々木4-6-2",
        "宍戸ビル202"
      ],
      "items": [
        "特にありません（手ぶらでOK）",
        "レンタルウェア・ソックス・お水を完備しています",
        "動きやすい服装でお越しいただいてもOKです"
      ],
      "directionsNote": "当日、スタジオの場所が分からないなど道に迷われた場合は、どうぞお気軽にお問い合わせください。"
    }
  }'::jsonb,
  '{}'::text[]
)
on conflict (slug) do update
set name              = excluded.name,
    status            = excluded.status,
    meta_pixel_id     = excluded.meta_pixel_id,
    cv_events         = excluded.cv_events,
    confirmation_meta = excluded.confirmation_meta;
