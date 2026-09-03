-- パーソナルマシンピラティス SAKURA（ブランド全体の広告集客LP, slug=sakura-pilates）の
-- clients 行を作成する。
--
-- LPコードは apps/lp/clients/sakura-pilates/。ページ表示（/sakura-pilates ルーティング）
-- だけでなく、LPShell が同じ slug で clients 行を引いてタグ注入・noindex・CV転送を行うため、
-- この行が無いとページは200で出るのにタグが一切入らない（days-pilates / bee-pilates-ebisu で
-- 実際に発生した不具合クラス）。フォルダ名 sakura-pilates と clients.slug を必ず一致させること。
--
-- 既にダッシュボードで枠を作ってある場合を考慮して `do nothing` にしている。
-- ダッシュボード側の設定（Pixel ID・通知先など）を、このマイグレーションが後から
-- 空で上書きしてしまうのを防ぐため。行が既にあるなら、このファイルは何もしない。
--
-- 店舗単位ではなくブランド全体のLPなので、confirmation_meta には `stores` も `letter` も
-- 置かない。34店舗のどこを希望するかはフォームの `store` で受けており、住所の確定案内は
-- 折り返しの担当者連絡で行う運用のため、確認メールは formFields のエコー形式にしている。
--
-- meta_pixel_id / ga4_id / notify_emails は未設定。広告配信前にダッシュボードから
-- 必ず設定すること（空でも送信自体は動作するが、CVがMetaに戻らない）。

insert into public.clients (slug, name, status, industry, cv_events, confirmation_meta, notify_emails)
values (
  'sakura-pilates',
  'パーソナルマシンピラティス SAKURA',
  'draft',
  'fitness',
  '{"form_submit": true, "tel_tap": false, "line_tap": false}'::jsonb,
  '{
    "adminSubject": "{{name}}様から体験レッスンのお申し込みがあります",
    "confirmationSubject": "【SAKURA】体験レッスンのお申し込みを受け付けました",
    "confirmationLines": [
      "この度は、パーソナルマシンピラティスSAKURAの体験レッスンにお申し込みいただき、誠にありがとうございます。",
      "以下の内容でお申し込みを受け付けいたしました。",
      "ご希望の店舗・日程を確認のうえ、担当者より順次ご連絡いたします。"
    ],
    "formFields": [
      { "name": "name",  "label": "お名前" },
      { "name": "tel",   "label": "電話番号" },
      { "name": "email", "label": "メールアドレス" },
      { "name": "store", "label": "ご希望の店舗" },
      { "name": "date1", "label": "ご希望日（第1希望）" },
      { "name": "date2", "label": "ご希望日（第2希望）" },
      { "name": "note",  "label": "ご希望の時間帯・ご相談内容" }
    ]
  }'::jsonb,
  '{}'::text[]
)
on conflict (slug) do nothing;
