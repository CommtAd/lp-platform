-- Beat Pilates 名古屋伏見店の運営者宛の予約通知メールを、店舗名・第2希望日時・
-- UTMアトリビューション情報を省いた簡易フォーマットにする
-- （単一店舗・単一希望日時のみのフォームのため、常に空欄になる項目を削る）。
-- confirmation_meta.letter（0010で設定済み）はそのまま残すため、
-- jsonb の || で adminSimple キーだけ追加する。

update public.clients
set confirmation_meta = confirmation_meta || '{"adminSimple": true}'::jsonb
where slug = 'beat-pilates-nagoyafushimi';
