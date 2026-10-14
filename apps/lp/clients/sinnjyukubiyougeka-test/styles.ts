/* 新宿美容外科クリニック｜イボ・ホクロ除去LP のスタイル（`.sbc` 配下にスコープ）。
   キャンバスは幅390px固定（LPCanvas）なので、PC用のメディアクエリは持たない。
   vw / vh などのビューポート単位は使わないこと（CLAUDE.md §17）。 */
export const css = String.raw`
.sbc {
  --brand: #b75a88;        
  --brand-deep: #9c4472;   
  --accent: #ab0058;       
  --cta-from: #d96a9f;
  --cta-to: #b2457c;
  --beige: #f7f3ea;        
  --pink-bg: #f8eef2;
  --pink-soft: #fbe3ec;
  --line: #e4d6dc;
  --text: #333;
  --text-sub: #666;
  --marker: #fbe3ec;
  --serif: "Shippori Mincho", YuMincho, "Yu Mincho", "Hiragino Mincho ProN", serif;
  --sans: "Noto Sans JP", YuGothic, "Yu Gothic", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif;
  --w: 750px;
  --footer-h: 64px;
}
.sbc, .sbc *, .sbc *::before, .sbc *::after { box-sizing: border-box; }
.sbc {
  font-family: var(--sans);
  font-size: 14px;
  line-height: 1.9;
  letter-spacing: .04em;
  color: var(--text);
}
.sbc img { max-width: 100%; height: auto; display: block; }
.sbc a { color: inherit; }
.sbc p { margin: 0 0 1em; }
.sbc p:last-child { margin-bottom: 0; }
.sbc h1, .sbc h2, .sbc h3, .sbc h4 { margin: 0; font-weight: 700; }
.sbc .page { max-width: var(--w); margin: 0 auto; background: #fff; overflow-x: clip; box-shadow: 0 0 24px rgba(0,0,0,.06); }
.sbc .inner { padding: 0 16px; }
.sbc .sec { padding: 64px 0 72px; scroll-margin-top: 56px; }
.sbc .bg-white { background: #fff; }
.sbc .bg-beige { background-color: var(--beige); background-image: radial-gradient(rgba(183,90,136,.07) 1px, transparent 1.2px); background-size: 8px 8px; }
.sbc .bg-pink { background-color: var(--pink-bg); background-image: radial-gradient(rgba(255,255,255,.8) 1px, transparent 1.2px); background-size: 8px 8px; }
.sbc .tbc {
  display: inline-block;
  font-family: var(--sans);
  font-size: 11px;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: 0;
  color: #8a5a00;
  background: #fff6d6;
  border: 1px dashed #d9a400;
  border-radius: 3px;
  padding: 0 5px;
  vertical-align: middle;
  text-indent: 0;
}
.sbc .sec-title { text-align: center; margin-bottom: 36px; }
.sbc .sec-title .en {
  display: inline-block;
  font-family: var(--serif);
  font-size: 12px;
  letter-spacing: .2em;
  color: #fff;
  background: var(--brand);
  border-radius: 999px;
  padding: 2px 18px;
  line-height: 1.8;
  text-transform: uppercase;
}
.sbc .sec-title .ja {
  display: block;
  margin-top: 10px;
  font-family: var(--serif);
  font-size: 24px;
  line-height: 1.45;
  letter-spacing: .08em;
  color: var(--brand-deep);
}
.sbc .mk { font-weight: 700; background: linear-gradient(transparent 55%, var(--marker) 55%); }
.sbc .header {
  position: sticky; top: 0; z-index: 50;
  height: 56px;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 8px 0 12px;
  background: rgba(255,255,255,.96);
  border-bottom: 1px solid #f1e6eb;
}
.sbc .logo { display: flex; align-items: center; gap: 8px; text-decoration: none; }
.sbc .logo img { height: 40px; width: auto; }
.sbc .logo-text { font-family: var(--serif); font-size: 15px; font-weight: 700; color: var(--brand-deep); letter-spacing: .06em; line-height: 1.2; }
.sbc .logo-text small { display: block; font-size: 9px; letter-spacing: .12em; color: var(--text-sub); font-weight: 400; }
.sbc .menu-btn {
  width: 44px; height: 44px; border: 0; background: transparent; cursor: pointer;
  display: grid; place-content: center; gap: 6px;
}
.sbc .menu-btn span { display: block; width: 26px; height: 2px; background: var(--brand); transition: .25s; }
.sbc .menu-btn[aria-expanded="true"] span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
.sbc .menu-btn[aria-expanded="true"] span:nth-child(2) { opacity: 0; }
.sbc .menu-btn[aria-expanded="true"] span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }
.sbc .gnav {
  position: absolute; top: 56px; left: 0; right: 0;
  background: rgba(255,255,255,.98);
  border-bottom: 2px solid var(--brand);
  z-index: 49;
  display: none;
}
.sbc .gnav.is-open { display: block; }
.sbc .gnav ul { list-style: none; margin: 0; padding: 8px 24px 20px; }
.sbc .gnav li a { display: block; padding: 12px 4px; border-bottom: 1px solid var(--line); text-decoration: none; font-size: 14px; }
.sbc .gnav li a::before { content: "›"; color: var(--brand); margin-right: 10px; }
.sbc .gnav .btn-cta { margin-top: 16px; }
.sbc .fv { position: relative; background: #f4e9e8; overflow: hidden; }
.sbc .fv-photo {
  position: absolute; right: 0; top: 0; width: 76%; height: 500px;
}
.sbc .fv-photo::after {
  content: ""; position: absolute; inset: 0; pointer-events: none;
  background:
    linear-gradient(90deg, #f4e9e8 0%, rgba(244,233,232,0) 20%),
    linear-gradient(0deg, #f4e9e8 0%, rgba(244,233,232,0) 22%);
}
.sbc .fv-photo img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 0; }
.sbc .fv-catch-area {
  position: absolute; z-index: 1; left: 0; top: 0;
  width: 50%; height: 430px; padding-top: 32px;
  display: flex; align-items: flex-start; justify-content: center;
}
.sbc .fv-catch {
  writing-mode: vertical-rl;
  font-family: var(--serif);
  font-weight: 700;
  font-size: 28px;
  line-height: 1.4;
  letter-spacing: .06em;
  color: #4a3a42;
  margin: 0;
  text-shadow: 0 0 12px rgba(255,255,255,.9), 0 0 2px #fff;
}
.sbc .fv-catch .em { color: var(--accent); font-size: 1.32em; }
.sbc .fv-catch .sm { font-size: .78em; }
.sbc .fv-price { position: relative; z-index: 1; padding: 0 12px 20px; margin-top: 440px; }
.sbc .fv-ribbon {
  position: relative;
  margin: 0 auto -14px; width: 92%;
  background: var(--brand);
  color: #fff; text-align: center;
  font-family: var(--serif); font-weight: 700; font-size: 17px; letter-spacing: .06em;
  padding: 6px 8px;
  clip-path: polygon(0 0, 100% 0, 97% 50%, 100% 100%, 0 100%, 3% 50%);
  z-index: 2;
}
.sbc .fv-box {
  background: rgba(255,255,255,.94);
  border: 2px solid var(--brand);
  border-radius: 6px;
  padding: 24px 8px 10px;
  box-shadow: 0 6px 18px rgba(156,68,114,.15);
}
.sbc .fv-row { display: grid; grid-template-columns: 44px 80px auto; justify-content: center; align-items: baseline; column-gap: 8px; padding: 5px 0; border-bottom: 1px dashed var(--line); font-family: var(--serif); line-height: 1.25; }
.sbc .fv-row:last-of-type { border-bottom: 0; }
.sbc .fv-row .n { font-size: 19px; font-weight: 700; color: #4a3a42; letter-spacing: 0; white-space: nowrap; }
.sbc .fv-row .t { font-size: 20px; font-weight: 700; color: #4a3a42; letter-spacing: 0; }
.sbc .fv-row .t small, .sbc .fv-row .u small { font-size: 12px; }
.sbc .fv-row .u { font-size: 12px; color: #4a3a42; white-space: nowrap; }
.sbc .fv-row .u b { font-size: 36px; color: var(--accent); letter-spacing: 0; margin-left: 2px; }
.sbc .fv-note { font-size: 10.5px; line-height: 1.6; color: var(--text-sub); margin: 6px 0 0; text-align: center; }
.sbc .fv-cta { padding: 4px 16px 28px; position: relative; z-index: 1; }
.sbc .btn-cta {
  position: relative;
  display: flex; align-items: center; justify-content: center; gap: 10px;
  width: 100%; max-width: 420px; margin: 0 auto;
  min-height: 64px; padding: 10px 44px;
  border: 0; border-radius: 999px; cursor: pointer;
  background: linear-gradient(180deg, var(--cta-from), var(--cta-to));
  box-shadow: 0 4px 0 #8f3563, 0 8px 18px rgba(143,53,99,.25);
  color: #fff; text-decoration: none;
  font-family: var(--sans); font-size: 17px; font-weight: 700; letter-spacing: .06em; line-height: 1.4;
  transition: transform .15s, box-shadow .15s;
}
.sbc .btn-cta::after {
  content: ""; position: absolute; right: 20px; top: 50%;
  width: 9px; height: 9px; border-top: 2px solid #fff; border-right: 2px solid #fff;
  transform: translateY(-50%) rotate(45deg);
}
.sbc .btn-cta:active { transform: translateY(3px); box-shadow: 0 1px 0 #8f3563, 0 4px 10px rgba(143,53,99,.25); }
.sbc .btn-cta .ico { width: 22px; height: 22px; flex: none; }
.sbc .btn-cta.shine { overflow: hidden; }
.sbc .btn-cta.shine::before {
  content: ""; position: absolute; top: 0; left: -60%; width: 40%; height: 100%;
  background: linear-gradient(100deg, transparent, rgba(255,255,255,.45), transparent);
  animation: sbc-shine 3.2s ease-in-out infinite;
}
@keyframes sbc-shine { 0%, 60% { left: -60%; } 100% { left: 130%; } }
.sbc .cta-block { padding: 36px 16px 40px; text-align: center; }
.sbc .cta-block .lead { font-family: var(--serif); font-weight: 700; font-size: 15px; color: var(--brand-deep); margin-bottom: 12px; }
.sbc .cta-block .lead::before, .sbc .cta-block .lead::after { content: "＼"; margin: 0 6px; color: var(--brand); }
.sbc .cta-block .lead::after { content: "／"; }
.sbc .plan-cards { display: grid; gap: 14px; }
.sbc .plan-card {
  position: relative;
  display: grid; grid-template-columns: 92px 1fr;
  min-height: 108px;
  background: #fff; border: 1px solid var(--line); border-radius: 6px; overflow: hidden;
}
.sbc .plan-card .num {
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;
  background: var(--brand); color: #fff; font-family: var(--serif); line-height: 1;
}
.sbc .plan-card .num b { font-size: 36px; }
.sbc .plan-card .num small { font-size: 13px; }
.sbc .plan-card.is-best .num { background: var(--accent); }
.sbc .plan-card .body {
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;
  padding: 14px 12px;
}
.sbc .plan-card .total { margin: 0; font-family: var(--serif); font-size: 14px; font-weight: 700; line-height: 1; color: #4a3a42; }
.sbc .plan-card .total b { font-size: 40px; color: var(--accent); letter-spacing: 0; }
.sbc .plan-card .per { display: inline-block; font-size: 11px; line-height: 1.8; background: var(--pink-soft); color: var(--brand-deep); padding: 1px 14px; border-radius: 999px; font-weight: 700; }
.sbc .plan-card .per b { font-size: 22px; font-family: var(--serif); color: var(--accent); letter-spacing: 0; margin: 0 1px; }
.sbc .plan-note { font-size: 12px; color: var(--text-sub); margin-top: 14px; line-height: 1.7; }
.sbc .about-lead { font-size: 15px; line-height: 2.1; }
.sbc .device { margin-top: 32px; display: grid; grid-template-columns: 42% 1fr; gap: 16px; align-items: start; }
.sbc .device .ph { margin-top: 4px; aspect-ratio: 250 / 320; }
.sbc .device .device-img { aspect-ratio: 250 / 546; background: transparent; }
.sbc .device .device-img img { object-fit: contain; }
.sbc .device h3 { font-size: 16px; line-height: 1.6; margin-bottom: 10px; }
.sbc .device p { font-size: 13.5px; line-height: 2; }
.sbc .ph {
  position: relative;
  display: grid; place-items: center;
  background: #f1eaee repeating-linear-gradient(135deg, rgba(183,90,136,.07) 0 10px, transparent 10px 20px);
  border: 1px solid #e6d8df;
  color: #9a7f8d; font-size: 11px; line-height: 1.5; text-align: center;
  padding: 8px;
  overflow: hidden;
}
.sbc .ph::before { content: ""; position: absolute; inset: 0; background: center / 28px no-repeat url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23c9aebb' stroke-width='1.5'%3E%3Crect x='3' y='5' width='18' height='14' rx='2'/%3E%3Ccircle cx='9' cy='10' r='2'/%3E%3Cpath d='m21 16-5-5-8 8'/%3E%3C/svg%3E"); opacity: .9; transform: translateY(-18px); }
.sbc .ph span { position: relative; margin-top: 30px; }
.sbc .ph img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.sbc .methods { display: grid; gap: 12px; margin-top: 24px; }
.sbc .method { background: #fff; border-left: 4px solid var(--brand); padding: 14px 16px; box-shadow: 0 1px 0 var(--line); }
.sbc .method h3 { font-size: 15px; color: var(--brand-deep); margin-bottom: 4px; }
.sbc .method p { font-size: 13px; line-height: 1.85; }
.sbc .flow-img { list-style: none; margin: 0; padding: 0; }
.sbc .flow-img li { display: grid; grid-template-columns: 140px 1fr; gap: 16px; align-items: center; }
.sbc .flow-img li + li { margin-top: 44px; position: relative; }
.sbc .flow-img li + li::before {
  content: ""; position: absolute; left: 50%; top: -34px; width: 22px; height: 22px;
  border-right: 2px solid #d9bccb; border-bottom: 2px solid #d9bccb; transform: translateX(-50%) rotate(45deg);
}
.sbc .flow-img svg { width: 140px; height: 140px; border-radius: 50%; background: #fff; box-shadow: 0 2px 10px rgba(156,68,114,.12); }
.sbc .flow-img .no { font-family: var(--serif); font-style: italic; font-size: 30px; color: var(--brand); line-height: 1; margin-bottom: 8px; }
.sbc .flow-img p { font-size: 14px; line-height: 1.9; }
.sbc .case + .case { margin-top: 32px; }
.sbc .case-photos { display: grid; grid-template-columns: 1fr 22px 1fr; align-items: center; }
.sbc .case-photos .ph { aspect-ratio: 1 / 0.78; border-radius: 6px; }
.sbc .case-photos .arrow { width: 0; height: 0; border-top: 14px solid transparent; border-bottom: 14px solid transparent; border-left: 14px solid var(--brand); margin-left: 5px; }
.sbc .case-photos figcaption { grid-column: 1 / -1; display: grid; grid-template-columns: 1fr 22px 1fr; text-align: center; font-size: 12px; font-weight: 700; color: var(--brand-deep); margin-top: 4px; }
.sbc .case-photos figcaption span:nth-child(2) { visibility: hidden; }
.sbc .case-info { margin: 14px 0 0; background: #fff; border: 1px solid var(--line); padding: 16px 18px; font-size: 13px; }
.sbc .case-info dt { font-weight: 700; font-size: 14px; }
.sbc .case-info dd { margin: 0 0 10px; }
.sbc .case-info dd:last-child { margin-bottom: 0; }
.sbc .spec-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.sbc .spec { background: #faf7f8; border: 1px solid var(--line); text-align: center; padding: 34px 8px 16px; position: relative; margin-top: 26px; }
.sbc .spec .ico {
  position: absolute; top: -26px; left: 50%; transform: translateX(-50%);
  width: 52px; height: 52px; border-radius: 50%; background: var(--brand);
  display: grid; place-items: center;
}
.sbc .spec .ico svg { width: 28px; height: 28px; stroke: #fff; fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.sbc .spec h3 { font-size: 15px; }
.sbc .spec p { font-size: 14px; line-height: 1.6; }
.sbc .spec.wide { grid-column: 1 / -1; }
.sbc .risk { margin-top: 28px; background: #fff; border: 1px solid var(--brand); padding: 16px 18px; }
.sbc .risk h3 { font-size: 15px; color: var(--brand-deep); margin-bottom: 6px; }
.sbc .risk p { font-size: 13px; line-height: 1.8; }
.sbc .risk .risk-note { font-size: 11px; line-height: 1.6; color: var(--text-sub); margin-top: 8px; }
.sbc .steps { list-style: none; margin: 0; padding: 0; }
.sbc .steps li { display: grid; grid-template-columns: 44% 1fr; gap: 14px; }
.sbc .steps li + li { margin-top: 40px; position: relative; }
.sbc .steps li + li::before { content: ""; position: absolute; left: 72%; top: -32px; width: 1px; height: 24px; background: var(--brand-deep); }
.sbc .steps .ph { aspect-ratio: 294 / 186; }
.sbc .steps .no { font-family: var(--serif); font-style: italic; font-size: 30px; color: var(--brand); line-height: 1; }
.sbc .steps h3 { font-size: 16px; line-height: 1.5; margin: 6px 0; }
.sbc .steps p { font-size: 13.5px; line-height: 1.8; }
.sbc .p-label { display: inline-block; background: var(--brand); color: #fff; font-size: 15px; letter-spacing: .12em; padding: 3px 22px 3px 14px; border-radius: 0 999px 999px 0; margin-bottom: 14px; }
.sbc .p-head { font-size: 17px; border-left: 4px solid var(--brand); padding: 4px 0 4px 12px; margin-bottom: 4px; }
.sbc .p-sub { font-size: 12px; color: var(--text-sub); margin: 0 0 4px 16px; }
.sbc .p-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
.sbc .p-table th, .sbc .p-table td { border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); padding: 14px 8px; vertical-align: middle; }
.sbc .p-table th { text-align: left; font-weight: 400; font-size: 13.5px; line-height: 1.6; }
.sbc .p-table th b { font-size: 16px; }
.sbc .p-table td { text-align: right; color: var(--accent); font-weight: 700; line-height: 1.5; white-space: nowrap; }
.sbc .p-table td .yen { font-size: 27px; font-family: var(--serif); letter-spacing: 0; }
.sbc .p-table td .yen small { font-size: 12px; }
.sbc .p-table td .per { display: block; font-size: 11px; }
.sbc .p-table td .per b { font-size: 18px; font-family: var(--serif); letter-spacing: 0; margin: 0 1px; }
.sbc .p-table tr.is-best th { position: relative; }
.sbc .p-table .tag { display: inline-block; font-size: 10px; font-weight: 700; color: #fff; background: var(--accent); border-radius: 3px; padding: 0 6px; margin-left: 6px; vertical-align: 2px; }
.sbc .p-notes { font-size: 12px; color: var(--text-sub); line-height: 1.8; margin-top: 12px; padding-left: 1em; text-indent: -1em; }
.sbc .p-notes li { list-style: none; }
.sbc .p-mini { width: 100%; border-collapse: collapse; margin-top: 8px; }
.sbc .p-mini th, .sbc .p-mini td { border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); padding: 12px 8px; }
.sbc .p-mini th { text-align: left; font-weight: 400; font-size: 13.5px; }
.sbc .p-mini td { text-align: right; color: var(--accent); font-weight: 700; font-family: var(--serif); font-size: 22px; letter-spacing: 0; line-height: 1.3; }
.sbc .p-mini td small { font-size: 12px; }
.sbc .p-tax { font-size: 12px; color: var(--text-sub); text-align: right; margin-top: 8px; }
.sbc .p-ribbon {
  margin: 40px auto 24px; width: 92%;
  background: var(--accent); color: #fff; text-align: center;
  font-family: var(--serif); font-weight: 700; font-size: 16px; letter-spacing: .02em; line-height: 1.5;
  padding: 10px 16px;
  clip-path: polygon(0 0, 100% 0, 95% 50%, 100% 100%, 0 100%, 5% 50%);
}
.sbc .p-ribbon .hl { color: #fdffa0; }
.sbc .fees { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 36px; }
.sbc .fee { display: flex; flex-direction: column; justify-content: center; background: #f6f1f3; border-radius: 6px; text-align: center; padding: 16px 2px; font-family: var(--serif); color: #6d5a64; }
.sbc .fee-name { font-size: 14px; letter-spacing: .18em; line-height: 1.4; white-space: nowrap; }
.sbc .fee .fee-name:only-child, .sbc .fee.is-free .fee-name { letter-spacing: 0; }
.sbc .fee-val { font-size: 30px; font-weight: 700; line-height: 1.2; letter-spacing: 0; margin-top: 6px; }
.sbc .fee-val small { font-size: 14px; }
.sbc .fee.is-free { background: var(--pink-soft); color: var(--accent); }
.sbc .fee.is-free .fee-name { font-size: 12.5px; margin: 0; }
.sbc .fee.is-free .fee-val { font-size: 46px; line-height: 1; margin-top: 4px; }
.sbc .fee.is-free .fee-val small { font-size: 18px; }
.sbc .pay { margin-top: 44px; }
.sbc .pay-lead { font-size: 14px; line-height: 1.9; margin: 12px 0 0; }
.sbc .pay-h { font-size: 15px; border-left: 4px solid #d6c7ce; padding-left: 10px; margin: 24px 0 8px; line-height: 1.5; }
.sbc .pay-txt { font-size: 13.5px; line-height: 1.85; padding-left: 14px; }
.sbc .pay-sub { font-size: 12px; color: var(--text-sub); }
.sbc .brands { list-style: none; margin: 10px 0 0; padding: 0 0 0 14px; display: flex; flex-wrap: wrap; gap: 6px; }
.sbc .brands li { font-size: 12px; font-weight: 700; color: #4a3a42; background: #fff; border: 1px solid #d9cdd3; border-radius: 4px; padding: 4px 10px; line-height: 1.5; }
.sbc .pay-list { margin: 0; padding-left: 14px; font-size: 13px; line-height: 1.75; }
.sbc .pay-list dt { font-weight: 700; color: var(--brand-deep); margin-top: 8px; }
.sbc .pay-list dt:first-child { margin-top: 0; }
.sbc .pay-list dd { margin: 0; }
.sbc .dr-slider { position: relative; --gold: #a88a57; --gold-deep: #8c6d3c; }
.sbc .dr-track { display: flex; align-items: flex-start; transition: height .3s; overflow-x: auto; overflow-y: hidden; scroll-snap-type: x mandatory; scrollbar-width: none; -webkit-overflow-scrolling: touch; }
.sbc .dr-track::-webkit-scrollbar { display: none; }
.sbc .dr-slide { flex: 0 0 100%; scroll-snap-align: start; padding: 4px 6px 16px; }
.sbc .dr-nav {
  position: absolute; top: 300px; z-index: 2; /* カードの高さに依存させない固定位置（名前の下あたり） */
  width: 34px; height: 34px; border-radius: 50%; border: 0; cursor: pointer;
  background: rgba(255,255,255,.95); box-shadow: 0 2px 8px rgba(0,0,0,.15);
}
.sbc .dr-nav::after {
  content: ""; position: absolute; top: 50%; left: 50%; width: 9px; height: 9px;
  border-top: 2px solid var(--gold-deep); border-right: 2px solid var(--gold-deep);
}
.sbc .dr-nav.prev { left: -15px; }
.sbc .dr-nav.prev::after { transform: translate(-30%, -50%) rotate(-135deg); }
.sbc .dr-nav.next { right: -15px; }
.sbc .dr-nav.next::after { transform: translate(-70%, -50%) rotate(45deg); }
.sbc .dr-dots { display: flex; justify-content: center; gap: 10px; margin-top: 8px; }
.sbc .dr-dots button { width: 10px; height: 10px; padding: 0; border-radius: 50%; border: 0; background: #d9cdbb; cursor: pointer; }
.sbc .dr-dots button[aria-current="true"] { background: var(--gold); }
.sbc .dr-card { border-radius: 16px; overflow: hidden; background: linear-gradient(180deg, #fdfcfa 0%, #faf3ea 100%); box-shadow: 0 4px 16px rgba(80,60,30,.12); }
.sbc .dr-photo { background: #dedfe6; aspect-ratio: 490 / 310; padding: 30px 0 16px; }
.sbc .dr-photo img { width: 100%; height: 100%; object-fit: contain; object-position: 50% 100%; }
.sbc .dr-body { position: relative; padding: 4px 18px 26px; }
.sbc .dr-body::before {
  content: ""; position: absolute; left: 10%; right: 10%; top: -16px; height: 17px;
  background: #fdfcfa; border-radius: 18px 18px 0 0;
}
.sbc .dr-clinic {
  position: relative; display: table; margin: -6px auto 0;
  background: linear-gradient(90deg, #9c7f4e, #b89b6a, #9c7f4e); color: #fff;
  font-size: 12px; letter-spacing: .14em; line-height: 1; padding: 8px 18px;
}
.sbc .dr-name { text-align: center; font-family: var(--serif); font-size: 26px; font-weight: 700; color: var(--gold-deep); letter-spacing: .12em; line-height: 1.4; margin: 10px 0 16px; }
.sbc .dr-name small { font-size: 18px; margin-right: 8px; letter-spacing: .06em; }
.sbc .dr-tag { display: inline-block; font-size: 13px; font-weight: 400; color: var(--gold-deep); letter-spacing: .12em; border: 1px solid var(--gold); border-radius: 3px; background: #fff; padding: 1px 10px; line-height: 1.6; margin: 18px 0 10px; }
.sbc .dr-body .dr-tag:first-of-type { margin-top: 0; }
.sbc .dr-career { display: grid; grid-template-columns: 3.7em 1fr; gap: 4px 10px; margin: 0; font-size: 12.5px; line-height: 1.7; letter-spacing: .04em; }
.sbc .dr-career dt { font-weight: 700; }
.sbc .dr-career dd { margin: 0; }
.sbc .dr-career dt.span { grid-column: 1 / -1; }
.sbc .dr-career dt.span span { font-weight: 400; margin-left: 10px; }
.sbc .dr-text { font-size: 12.5px; line-height: 1.8; margin: 0; }
.sbc .dr-text.strong { font-weight: 700; color: #3c3a36; }
.sbc .dr-list { margin: 0 0 12px; padding: 0; list-style: none; font-size: 12.5px; line-height: 1.7; }
.sbc .dr-list li { padding-left: 1.1em; text-indent: -1.1em; }
.sbc .dr-list li::before { content: "・"; }
.sbc .doctor + .doctor { margin-top: 48px; }
.sbc .doctor .ph { width: 56%; margin: 0 auto; aspect-ratio: 600 / 680; }
.sbc .doctor .pos { text-align: center; font-size: 13px; margin-top: 14px; }
.sbc .doctor .name { text-align: center; font-family: var(--serif); font-size: 24px; letter-spacing: .12em; line-height: 1.5; }
.sbc .doctor .en { text-align: center; font-size: 12px; color: var(--text-sub); margin-bottom: 16px; }
.sbc .career { background: #fff; border: 1px solid var(--line); padding: 16px 16px; }
.sbc .career h4 { font-size: 14px; margin-bottom: 6px; }
.sbc .career h4:not(:first-child) { margin-top: 14px; }
.sbc .career dl { display: grid; grid-template-columns: 4.6em 1fr; gap: 6px 10px; margin: 0; font-size: 13px; line-height: 1.6; }
.sbc .career dd { margin: 0; }
.sbc .career ul { margin: 0; padding-left: 1.2em; font-size: 13px; }
.sbc .clinic + .clinic { margin-top: 48px; }
.sbc .clinic h3 { font-family: var(--serif); font-size: 20px; color: var(--brand-deep); text-align: center; margin-bottom: 14px; letter-spacing: .1em; }
.sbc .clinic .ph { aspect-ratio: 16 / 9; margin-bottom: 14px; }
.sbc .info { width: 100%; border-collapse: collapse; font-size: 13.5px; }
.sbc .info th, .sbc .info td { border-bottom: 1px solid var(--line); padding: 14px 8px; text-align: left; vertical-align: top; line-height: 1.7; }
.sbc .info tr:first-child th, .sbc .info tr:first-child td { border-top: 1px solid var(--line); }
.sbc .info th { width: 6.4em; font-weight: 400; color: var(--text-sub); white-space: nowrap; }
.sbc .info td a { color: var(--brand-deep); font-weight: 700; }
.sbc .map { margin-top: 14px; aspect-ratio: 4 / 3; background: #eee; }
.sbc .map iframe { width: 100%; height: 100%; border: 0; display: block; }
.sbc .faq { margin: 0; }
.sbc .faq-item + .faq-item { margin-top: 18px; }
.sbc .faq dt, .sbc .faq dd { display: grid; grid-template-columns: 28px 1fr; gap: 12px; margin: 0; }
.sbc .faq dt { font-weight: 700; color: var(--brand-deep); font-size: 15px; line-height: 1.6; }
.sbc .faq dd { margin-top: 10px; font-size: 14px; line-height: 1.8; }
.sbc .faq .qa { width: 28px; height: 28px; border-radius: 50%; display: grid; place-items: center; color: #fff; font-family: var(--serif); font-size: 14px; line-height: 1; }
.sbc .faq dt .qa { background: var(--brand); }
.sbc .faq dd .qa { background: #8d8088; }
.sbc .footer { background: #4a3a42; color: #e9dfe4; text-align: center; padding: 28px 16px 24px; font-size: 11px; }
.sbc .footer a { color: #e9dfe4; margin: 0 8px; }
.sbc .footer .copy { margin-top: 12px; opacity: .8; }
.sbc .gnav li a.btn-cta::before { content: none; }
.sbc .gnav li a.btn-cta { margin-top: 16px; padding: 10px 44px; border: 0; font-size: 16px; }
.sbc .form-lead { font-size: 14px; font-weight: 700; line-height: 1.9; }
.sbc .form-tel { font-size: 13px; margin: 14px 0 24px; }
.sbc .form-tel a { color: var(--brand-deep); font-weight: 700; }
.sbc .form-box { background: #f7f4f5; border-top: 2px solid #8d8088; padding: 8px 16px 28px; }
.sbc .form-box a { color: var(--brand-deep); text-decoration: underline; }
.sbc .ph.has-img { padding: 0; border: 0; background: #f4ece9; }
.sbc .ph.has-img::before { content: none; }
.sbc .logo-img { display: block; height: 30px; width: auto; }
/* ── 改行：文節（page.tsx の w() が入れる <wbr>）でだけ折り返す ── */
.sbc { word-break: keep-all; overflow-wrap: anywhere; line-break: strict; }
.sbc p, .sbc dd, .sbc li, .sbc td { text-wrap: pretty; }
.sbc h2, .sbc h3, .sbc .sec-title .ja { text-wrap: balance; }
.sbc .form-box { word-break: normal; }
.sbc .form-box .lpform-note-body { white-space: pre-line; }

/* ── 余白：セクション内CTAの下に二重の余白ができないようにする ── */
.sbc .sec:has(> .cta-block) { padding-bottom: 0; }
.sbc .cta-block { padding: 44px 16px 64px; }
`;
