import { Fragment } from "react";
import LPShell from "@/components/LPShell";
import LPCanvas from "@/components/LPCanvas";
import LPForm from "@/components/LPForm";
import StickyFooterCTA from "@/components/StickyFooterCTA";
import MenuNav from "./MenuNav";
import TelLink from "./TelLink";
import DoctorSlider from "./DoctorSlider";
import { css } from "./styles";
import config from "./config";

/**
 * 新宿美容外科クリニック｜イボ・ほくろ除去LP（テスト枠）。brief.md の13セクション構成。
 *
 *   ヘッダー → ①FV → ③施術について → ④診察・施術方法 → ⑤施術イメージ
 *   → ⑥症例写真 → ⑦施術時間・注意点 → ⑧治療のステップ → ⑨料金表（診察料・お支払い方法）
 *   → ⑩医師紹介 → ⑪クリニック案内 → ⑫FAQ → ⑬予約フォーム ＋ 追従フッターCTA
 *
 * 守っているルール:
 *   1. 幅390pxの1枚のキャンバス（`<LPCanvas>`）。スタイルは `styles.ts` に `.sbc` 配下で
 *      スコープし、ビューポート単位は使わない（CLAUDE.md §16-17）。
 *   2. フォームは LPForm（送信先は基盤側で固定）。電話は TelLink 経由で `tel_tap` を計測。
 *   3. 「要確認」タグ（`.tbc`）は顧客確認が取れたら該当箇所ごと差し替える。
 *   4. 画像のプレースホルダ（`.ph`）は、顧客素材が届いたら public/clients/{slug}/ に置いて差し替える。
 */

const c = config;

const brand = "#b75a88";
const ctaGrad = "linear-gradient(180deg, #d96a9f, #b2457c)";

/**
 * 文節区切り。"/" の位置にだけ改行を許す（`.sbc` は word-break: keep-all）。
 * キャンバスは幅390px固定なので、ここで決めた改行位置はどの端末でも同じになる。
 */
function w(text: string) {
  const parts = text.split("/");
  return parts.map((p, i) => (
    <Fragment key={i}>
      {/* 文節の途中の「・」では折り返さない（U+2060 WORD JOINER） */}
      {p.replace(/・(?=.)/g, "・\u2060")}
      {i < parts.length - 1 && <wbr />}
    </Fragment>
  ));
}

/** public/clients/{slug}/ 配下の画像。症例以外は色味を統一済み（brief.md 参照）。 */
function img(name: string) {
  return `/clients/${c.slug}/${name}.webp`;
}

/** 症例写真ブロックの表示切替。一旦非表示（2026-10-13 依頼）。戻すときは true にする（MenuNav も連動）。 */
const SHOW_CASE = false;

function mapSrc(q: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;
}

export default function Page() {
  return (
    <LPShell clientSlug={c.slug} fallback={{ name: c.meta.title, status: c.status }}>
      <div style={{ background: "#efe7ea", minHeight: "100vh" }}>
        <LPCanvas style={{ background: "#fff" }} boxShadow="0 0 24px rgba(0,0,0,.06)">
          <style dangerouslySetInnerHTML={{ __html: css }} />
          <div className="sbc">
            <MenuNav />
              <main id="top">

                {/* ================= 1. FV ================= */}
                <section className="fv" aria-label="メインビジュアル">
                  <div className="fv-photo"><img src={c.fvImage} alt="" width="1122" height="1402" fetchPriority="high" decoding="async" /></div>
                  <div className="fv-catch-area">
                  <h1 className="fv-catch">
                    <span>気になる<span className="em">イボ<span className="sm">・</span>ほくろ</span>を</span><br />
                    <span><span className="em">まとめて</span>キレイに除去</span>
                  </h1>
                  </div>
                  <div className="fv-price">
                    <p className="fv-ribbon">顔・首・身体などどこでも対応</p>
                    <div className="fv-box">
                      <div className="fv-row"><span className="n">3個</span><span className="t">19,800<small>円</small></span><span className="u">1個あたり<b>6,600</b><small>円</small></span></div>
                      <div className="fv-row"><span className="n">10個</span><span className="t">49,500<small>円</small></span><span className="u">1個あたり<b>4,950</b><small>円</small></span></div>
                      <div className="fv-row"><span className="n">30個</span><span className="t">99,000<small>円</small></span><span className="u">1個あたり<b>3,300</b><small>円</small></span></div>
                      <p className="fv-note">※1個あたり2mmまで<br />※金額は全て税込になります。</p>
                    </div>
                  </div>
                  <div className="fv-cta">
                    <a className="btn-cta shine" href="#reserve">カウンセリングを予約する</a>
                  </div>
                </section>

                {/* ================= 3. 施術についての説明 ================= */}
                <section className="sec bg-white" id="about">
                  <div className="inner">
                    <h2 className="sec-title"><span className="en">About</span><span className="ja">当院のイボ・ほくろ除去<br />について</span></h2>
                    <p className="about-lead">
                      {w("お顔の/目立つ/ところに/ある/大きめの/ほくろや/イボ、/細かく/点在する/ほくろなど、/お悩みを/お持ちの/方は/少なく/ありません。")}<br />
                      {w("ほくろや/イボは")}<span className="mk">{w("比較的/短時間の/施術で/除去できる/ものも/多く")}</span>{w("、/ひとつ/なくなる/だけで/お顔の/印象が/変わる/ことも/あります。")}<br />
                      {w("お顔だけでなく、/全身の/ほくろ・/イボの/治療を/行っています。")}
                    </p>
                    <div className="device">
                      <div className="ph has-img device-img"><img src={img("device-action2")} alt="エルビウムヤグレーザー（ACTION Ⅱ）" loading="lazy" decoding="async" /></div>
                      <div className="device-body">
                        <h3>エルビウムヤグレーザー<br /><span style={{ fontSize: "13px", fontWeight: "400" }}>(ACTION Ⅱ)</span></h3>
                        {/* 機器説明：顧客指定（AUN 2026-10-13）。参考LPと同じ機種・同じ文面 */}
                        <p>{w("エルビウムヤグレーザーは、/膨らみの/ある/「ほくろ」や/「イボ」、/「脂漏性角化症/（セボケラ）」の/除去に/適した/レーザーです。/水に/吸収され/やすいため/発熱が/少なく、/周辺（正常）組織への/熱影響（損傷）が/ほとんど/ありません。/そのため、/施術後の/色素沈着の/リスクや/施術後の/発赤期間が/軽減します。")}</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* ================= 4. 診断・施術方法 ================= */}
                <section className="sec bg-white diag" id="diagnosis" style={{ paddingTop: "0" }}>
                  <div className="inner">
                    <h2 className="sec-title"><span className="en">Diagnosis</span><span className="ja">ダーモスコピーによる<br />皮膚診断も行っております</span></h2>
                    {/* 文面：顧客指定（AUN 2026-10-13、参考LPと同内容）。写真は顧客支給（ダーモスコピー）。写真上・本文下 */}
                    <div className="dermo">
                      <div className="ph has-img dermo-img"><img src={img("dermoscopy")} alt="ダーモスコピーによる皮膚診断" loading="lazy" decoding="async" /></div>
                      <p className="dermo-txt">
                        当院では<span className="mk-y">{w("ダーモスコピーに/よる/皮膚診断も/無料で/行って/おります。")}</span><br />
                        {w("肉眼では/見えない/病変の/細かい/構造を/確認する/ことにより")}<span className="mk-y">{w("病変の/良性、/悪性の/鑑別の/補助として/役立って/います。")}</span><br />
                        {w("ご希望の/方は/カウンセリング時に/お申し付け/ください。")}
                      </p>
                    </div>
                  </div>
                </section>

                {/* ================= 5. 施術イメージ ================= */}
                <section className="sec bg-beige" id="image">
                  <div className="inner">
                    <h2 className="sec-title"><span className="en">Image</span><span className="ja">イボ・ほくろ除去の<br />イメージ</span></h2>
                    <ol className="flow-img">
                      <li>
                        <svg viewBox="0 0 140 140" role="img" aria-label="ほくろのある肌の内部">
                          <defs><clipPath id="c1"><circle cx="70" cy="70" r="70"/></clipPath></defs>
                          <g clipPath="url(#c1)">
                            <rect width="140" height="140" fill="#fff"/>
                            <rect y="74" width="140" height="18" fill="#f5c6cf"/>
                            <rect y="92" width="140" height="48" fill="#fbe5df"/>
                            <g fill="none" stroke="#efc5bd" strokeWidth="1"><path d="M0 104h140M0 116h140M0 128h140"/><path d="M14 92v12M38 104v12M62 92v12M86 104v12M110 92v12M134 104v12M26 116v12M74 116v12M122 116v12"/></g>
                            <path d="M44 76 Q70 40 96 76 Z" fill="#4a3a42"/>
                            <g fill="#4a3a42"><circle cx="58" cy="84" r="2"/><circle cx="70" cy="88" r="2.4"/><circle cx="82" cy="83" r="2"/><circle cx="64" cy="96" r="2"/><circle cx="77" cy="98" r="2.2"/><circle cx="70" cy="108" r="1.8"/></g>
                            <text x="70" y="30" textAnchor="middle" fontSize="12" fontWeight="700" fill="#4a3a42">ほくろ</text>
                          </g>
                        </svg>
                        <div><p className="no">01.</p><p>{w("ほくろ・/イボは、/色素をつくる/細胞などが/皮膚の/中で/増える/ことで/できています。")}</p></div>
                      </li>
                      <li>
                        <svg viewBox="0 0 140 140" role="img" aria-label="レーザーを照射して削り取る">
                          <defs>
                            <clipPath id="c2"><circle cx="70" cy="70" r="70"/></clipPath>
                            <radialGradient id="c2glow"><stop offset="0" stopColor="#7cc4ff" stopOpacity=".7"/><stop offset="1" stopColor="#7cc4ff" stopOpacity="0"/></radialGradient>
                            <linearGradient id="c2beam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5fb4f5" stopOpacity=".85"/><stop offset="1" stopColor="#a9dbff" stopOpacity=".45"/></linearGradient>
                          </defs>
                          <g clipPath="url(#c2)">
                            <rect width="140" height="140" fill="#fff"/>
                            <rect y="74" width="140" height="18" fill="#f5c6cf"/>
                            <rect y="92" width="140" height="48" fill="#fbe5df"/>
                            <g fill="none" stroke="#efc5bd" strokeWidth="1"><path d="M0 104h140M0 116h140M0 128h140"/></g>
                            <path d="M44 76 Q70 40 96 76 Z" fill="#4a3a42"/>
                            <g fill="#4a3a42"><circle cx="58" cy="84" r="2"/><circle cx="70" cy="88" r="2.4"/><circle cx="82" cy="83" r="2"/><circle cx="64" cy="96" r="2"/><circle cx="77" cy="98" r="2.2"/></g>
                            <ellipse cx="70" cy="62" rx="30" ry="16" fill="url(#c2glow)"/>
                            <path d="M86 34 L92 37 L94 64 Q70 54 48 66 Z" fill="url(#c2beam)"/>
                            <path d="M118 -6 L95 26" stroke="#b9b2b6" strokeWidth="13" strokeLinecap="round"/>
                            <path d="M108 6 L103 13" stroke="#d8d2d5" strokeWidth="4" strokeLinecap="round"/>
                            <path d="M94 28 L90 33" stroke="#8d8088" strokeWidth="6" strokeLinecap="round"/>
                            <text x="38" y="40" textAnchor="middle" fontSize="11" fontWeight="700" fill="#9c4472">レーザー</text>
                          </g>
                        </svg>
                        <div><p className="no">02.</p><p>{w("レーザーを/ほくろに/照射して、/皮膚の/中の/ほくろを/含めて/削り取ります。")}</p></div>
                      </li>
                      <li>
                        <svg viewBox="0 0 140 140" role="img" aria-label="少しへこんだ状態">
                          <defs><clipPath id="c3"><circle cx="70" cy="70" r="70"/></clipPath></defs>
                          <g clipPath="url(#c3)">
                            <rect width="140" height="140" fill="#fff"/>
                            <path d="M0 74 H48 Q70 100 92 74 H140 V92 H0Z" fill="#f5c6cf"/>
                            <rect y="92" width="140" height="48" fill="#fbe5df"/>
                            <path d="M48 74 Q70 100 92 74" fill="#fff" stroke="#e7a3b0" strokeWidth="1.5"/>
                            <g fill="none" stroke="#efc5bd" strokeWidth="1"><path d="M0 104h140M0 116h140M0 128h140"/></g>
                            <text x="70" y="44" textAnchor="middle" fontSize="11" fontWeight="700" fill="#4a3a42">少しへこんだ状態</text>
                          </g>
                        </svg>
                        <div><p className="no">03.</p><p>{w("除去後の/患部は、/一時的に/少しへこんだ/状態になります。")}</p></div>
                      </li>
                      <li>
                        <svg viewBox="0 0 140 140" role="img" aria-label="皮膚が再生していく">
                          <defs><clipPath id="c4"><circle cx="70" cy="70" r="70"/></clipPath></defs>
                          <g clipPath="url(#c4)">
                            <rect width="140" height="140" fill="#fff"/>
                            <path d="M0 74 H48 Q70 82 92 74 H140 V92 H0Z" fill="#f5c6cf"/>
                            <rect y="92" width="140" height="48" fill="#fbe5df"/>
                            <g fill="none" stroke="#efc5bd" strokeWidth="1"><path d="M0 104h140M0 116h140M0 128h140"/></g>
                            <g stroke="#b75a88" strokeWidth="3" strokeLinecap="round" fill="none"><path d="M50 108l8-18M58 90l-7 2M58 90l2 7"/><path d="M90 108l-8-18M82 90l7 2M82 90l-2 7"/><path d="M70 112V92M70 92l-5 5M70 92l5 5"/></g>
                            <text x="70" y="44" textAnchor="middle" fontSize="11" fontWeight="700" fill="#4a3a42">皮膚が再生</text>
                          </g>
                        </svg>
                        <div><p className="no">04.</p><p>{w("時間の/経過と/ともに/周囲から/皮膚が/再生し、/へこみは/徐々に/目立ちにくく/なっていきます。/経過には/個人差が/あります。")}</p></div>
                      </li>
                    </ol>
                  </div>
                </section>

                {/* ================= 6. 症例写真 ================= */}
                {SHOW_CASE && (
                <section className="sec bg-pink" id="case">
                  <div className="inner">
                    <h2 className="sec-title"><span className="en">Case Photo</span><span className="ja">症例写真</span></h2>
                    {/* 症例写真：顧客支給（AUN 2026-10-13）。医療広告ガイドラインに配慮し、色補正はせず縮小のみ */}
                    <div className="case">
                      <figure className="case-photos" style={{ margin: "0" }}>
                        <div className="ph has-img" style={{ aspectRatio: "664 / 375" }}><img src={img("case1-before")} alt="症例1 施術前" loading="lazy" decoding="async" /></div>
                        <i className="arrow" aria-hidden="true" />
                        <div className="ph has-img" style={{ aspectRatio: "664 / 375" }}><img src={img("case1-after")} alt="症例1 施術後（3ヶ月後）" loading="lazy" decoding="async" /></div>
                        <figcaption><span>Before</span><span></span><span>After</span></figcaption>
                      </figure>
                      <dl className="case-info">
                        <dt>施術名</dt><dd>イボ・ほくろ除去</dd>
                        <dt>治療回数・経過</dt><dd>1回（施術から3ヶ月後）</dd>
                        <dt>副作用（リスク）</dt><dd>へこみ、色素沈着、ひりつき、傷跡、痛み、赤み</dd>
                        <dt>価格</dt><dd>3個 19,800円〜30個 99,000円（税込）</dd>
                      </dl>
                    </div>
                    <div className="case">
                      <figure className="case-photos" style={{ margin: "0" }}>
                        <div className="ph has-img" style={{ aspectRatio: "1432 / 842" }}><img src={img("case2-before")} alt="症例2 施術前" loading="lazy" decoding="async" /></div>
                        <i className="arrow" aria-hidden="true" />
                        <div className="ph has-img" style={{ aspectRatio: "1432 / 842" }}><img src={img("case2-after")} alt="症例2 施術後（3ヶ月後）" loading="lazy" decoding="async" /></div>
                        <figcaption><span>Before</span><span></span><span>After</span></figcaption>
                      </figure>
                      <dl className="case-info">
                        <dt>施術名</dt><dd>イボ・ほくろ除去</dd>
                        <dt>治療回数・経過</dt><dd>1回（施術から3ヶ月後）</dd>
                        <dt>副作用（リスク）</dt><dd>へこみ、色素沈着、ひりつき、傷跡、痛み、赤み</dd>
                        <dt>価格</dt><dd>3個 19,800円〜30個 99,000円（税込）</dd>
                      </dl>
                    </div>
                    <div className="case">
                      <figure className="case-photos" style={{ margin: "0" }}>
                        <div className="ph has-img" style={{ aspectRatio: "753 / 475" }}><img src={img("case3-before")} alt="症例3 施術前" loading="lazy" decoding="async" /></div>
                        <i className="arrow" aria-hidden="true" />
                        <div className="ph has-img" style={{ aspectRatio: "753 / 475" }}><img src={img("case3-after")} alt="症例3 施術後（3ヶ月後）" loading="lazy" decoding="async" /></div>
                        <figcaption><span>Before</span><span></span><span>After</span></figcaption>
                      </figure>
                      <dl className="case-info">
                        <dt>施術名</dt><dd>イボ・ほくろ除去</dd>
                        <dt>治療回数・経過</dt><dd>1回（施術から3ヶ月後）</dd>
                        <dt>副作用（リスク）</dt><dd>へこみ、色素沈着、ひりつき、傷跡、痛み、赤み</dd>
                        <dt>価格</dt><dd>3個 19,800円〜30個 99,000円（税込）</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="cta-block">
                    <p className="lead">気になるイボ・ほくろをご相談ください</p>
                    <a className="btn-cta" href="#reserve">カウンセリングを予約する</a>
                  </div>
                </section>
                )}

                {/* ================= 7. 施術時間・注意点・ダウンタイム ================= */}
                <section className="sec bg-white" id="treatment">
                  <div className="inner">
                    <h2 className="sec-title"><span className="en">About Treatment</span><span className="ja">施術時間や注意点</span></h2>
                    <div className="spec-grid">
                      <div className="spec">
                        <span className="ico"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></span>
                        <h3>施術時間</h3><p>15〜20分程度</p>
                      </div>
                      <div className="spec">
                        <span className="ico"><svg viewBox="0 0 24 24"><path d="m14 4 6 6M4 20l3-1 11-11-2-2L5 17z"/></svg></span>
                        <h3>痛み</h3><p>局所麻酔で<br />痛みを和らげます</p>
                      </div>
                      <div className="spec">
                        <span className="ico"><svg viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/></svg></span>
                        <h3>ダウンタイム</h3><p>2〜3か月程度</p>
                      </div>
                      <div className="spec">
                        <span className="ico"><svg viewBox="0 0 24 24"><path d="M7 21h10M9 21V9h6v12M10 9V5l4-2v6"/></svg></span>
                        <h3>お化粧・洗顔</h3><p>当日から可能</p>
                      </div>
                      <div className="spec wide">
                        <span className="ico"><svg viewBox="0 0 24 24"><path d="M5 12h14v3a5 5 0 0 1-5 5h-4a5 5 0 0 1-5-5zM7 12V6a2 2 0 0 1 4 0M9 3v1"/></svg></span>
                        <h3>入浴</h3><p>当日から可能</p>
                      </div>
                    </div>
                    <div className="risk">
                      <h3>主なリスク・副作用</h3>
                      <p>へこみ、色素沈着、ひりつき、傷跡、痛み、赤み</p>
                      <p style={{ marginTop: "8px" }}>{w("局所麻酔の/注射時に/痛みを/感じる/場合が/あります。/術後は/一時的に/表皮が/ない/状態に/なるため、/日焼けにより/シミの/原因と/なる/ことが/あります。/紫外線対策を/行ってください。")}</p>
                      <p className="risk-note">{w("※効果・/経過には/個人差が/あります。")}</p>
                    </div>
                  </div>
                </section>

                {/* ================= 8. 治療のステップ ================= */}
                <section className="sec bg-beige" id="step">
                  <div className="inner">
                    <h2 className="sec-title"><span className="en">Treatment Step</span><span className="ja">治療のステップ</span></h2>
                    <ol className="steps">
                      <li>
                        <div className="ph has-img"><img src={img("step1")} alt="お問合せ・ご予約" loading="lazy" decoding="async" /></div>
                        <div><p className="no">01.</p><h3>お問合せ・ご予約</h3><p>{w("お電話・/メールにて/お問い合わせ・/ご予約ください。")}</p></div>
                      </li>
                      <li>
                        <div className="ph has-img"><img src={img("step2")} alt="カウンセリング" loading="lazy" decoding="async" /></div>
                        <div><p className="no">02.</p><h3>ご来院・<br />カウンセリング</h3><p>{w("医師が/患者様に/合った/適切な/治療法を/ご提案。")}</p></div>
                      </li>
                      <li>
                        <div className="ph has-img"><img src={img("step3")} alt="施術" loading="lazy" decoding="async" /></div>
                        <div><p className="no">03.</p><h3>施術</h3><p>{w("医師・/スタッフが/対応します。/数分程度で/終了。")}</p></div>
                      </li>
                      <li>
                        <div className="ph has-img"><img src={img("step4")} alt="アフターケア" loading="lazy" decoding="async" /></div>
                        <div><p className="no">04.</p><h3>アフターケア</h3><p>{w("治療後も/きめ細かい/フォローを/心がけて/います。")}</p></div>
                      </li>
                    </ol>
                  </div>
                </section>

                {/* ================= 9. 料金表 ================= */}
                <section className="sec bg-white" id="price">
                  <div className="inner">
                    <h2 className="sec-title"><span className="en">Price</span><span className="ja">料金表</span></h2>
                    {/* 診察料：顧客指定（AUN 2026-10-13）で初診料・再診料とも0円／カウンセリング無料は公式CTAの表記 */}
                    <div className="fees">
                      <div className="fee is-free"><p className="fee-name">初診料</p><p className="fee-val">0<small>円</small></p></div>
                      <div className="fee is-free"><p className="fee-name">再診料</p><p className="fee-val">0<small>円</small></p></div>
                      <div className="fee is-free"><p className="fee-name">カウンセリング料</p><p className="fee-val">0<small>円</small></p></div>
                    </div>

                    <span className="p-label">イボ・ほくろ除去</span>
                    <h3 className="p-head">まとめて除去プラン</h3>
                    <p className="p-sub">1個あたり2mmまで</p>
                    <table className="p-table">
                      <tbody>
                        <tr>
                          <th>2mmまで<br /><b>3個プラン</b></th>
                          <td><span className="yen">19,800<small>円</small></span><span className="per">1個あたり<b>6,600</b>円</span></td>
                        </tr>
                        <tr>
                          <th>2mmまで<br /><b>10個プラン</b></th>
                          <td><span className="yen">49,500<small>円</small></span><span className="per">1個あたり<b>4,950</b>円</span></td>
                        </tr>
                        <tr>
                          <th>2mmまで<br /><b>30個プラン</b></th>
                          <td><span className="yen">99,000<small>円</small></span><span className="per">1個あたり<b>3,300</b>円</span></td>
                        </tr>
                        <tr>
                          <th>2mm以下<br /><b>個数無制限</b><br /><span className="p-sub2">（全身取り放題）</span></th>
                          <td><span className="yen">330,000<small>円</small></span></td>
                        </tr>
                      </tbody>
                    </table>
                    <ul className="p-notes">
                      <li>※「2mmまで」は1個あたりのサイズです。</li>
                      <li>※金額は全て税込になります。</li>
                    </ul>

                    {/* 電気分解法・切除法・シミ治療：顧客指定（AUN 2026-10-13、参考LPと同内容・同額で確定） */}
                    <h3 className="p-head" style={{ marginTop: "36px" }}>電気分解法</h3>
                    <table className="p-mini"><tbody><tr><th>1mm</th><td>4,400<small>円</small></td></tr></tbody></table>
                    <h3 className="p-head" style={{ marginTop: "28px" }}>切除法</h3>
                    <table className="p-mini"><tbody><tr><th>1cm</th><td>44,000<small>円</small></td></tr></tbody></table>
                    <p className="p-tax">※表示の料金はすべて税込の価格です。</p>

                    <p className="p-ribbon">“ほくろ”と同時に“気になるシミ”を除去</p>
                    <span className="p-label">シミ治療</span>
                    <h3 className="p-head">QスイッチYAGレーザー</h3>
                    <table className="p-mini"><tbody><tr><th>1mm</th><td>2,200<small>円</small></td></tr></tbody></table>
                    <p className="p-tax">※表示の料金はすべて税込の価格です。</p>

                    {/* お支払い方法：公式HP 料金一覧「ご利用可能な決済方法一覧」より */}
                    <div className="pay">
                      <h3 className="p-head">お支払い方法</h3>
                      <p className="pay-lead">{w("当院では、/下記3通りの/お支払い方法が/可能です。")}<br />{w("ご都合に/あわせて/お選び/ください。")}</p>

                      <h4 className="pay-h">現金</h4>
                      <p className="pay-txt">当日、現金でのお支払いが可能です。</p>

                      <h4 className="pay-h">クレジットカード</h4>
                      <p className="pay-txt">各種クレジットカードがご利用いただけます。</p>
                      {/* ブランドロゴ画像を使う場合は、各社の利用規約に沿った公式素材に差し替え */}
                      <ul className="brands">
                        <li>VISA</li><li>Mastercard</li><li>JCB</li><li>American Express</li><li>Diners Club</li><li>DISCOVER</li><li>UnionPay（銀聯）</li>
                      </ul>

                      <h4 className="pay-h">医療ローン</h4>
                      <p className="pay-txt">{w("頭金0円・/最長84回まで、/ご都合に/合わせて/ご利用/いただけます。")}<br />{w("お申込みの/際には/お手続き、/審査が/必要と/なりますが、/秘密厳守の/ため、/ご家族にも/気づかれません。/なお、/専業主婦の方、/年金受給者の方、/学生の方でも/ご利用/いただけます。")}</p>
                    </div>
                  </div>
                  <div className="cta-block">
                    <p className="lead">プランは医師にご相談ください</p>
                    <a className="btn-cta" href="#reserve">カウンセリングを予約する</a>
                  </div>
                </section>

                {/* ================= 10. 医師紹介 ================= */}
                <section className="sec bg-beige" id="doctor">
                  <div className="inner">
                    <h2 className="sec-title"><span className="en">Doctor Introduction</span><span className="ja">医師紹介</span></h2>

                    {/* 医師カード：顧客支給のカード画像（AUN 2026-10-13 doctor1〜3.png）と同じ構成・文面。写真はカード画像から切り出し */}
                    <DoctorSlider>
                      <article className="dr-card">
                        <div className="dr-photo"><img src={img("doctor-lee-card")} alt="医師 リジンヨン" loading="lazy" decoding="async" /></div>
                        <div className="dr-body">
                          <p className="dr-clinic">新宿美容外科クリニック</p>
                          <h3 className="dr-name"><small>医師</small>リジンヨン</h3>
                          <h4 className="dr-tag">経歴</h4>
                          <dl className="dr-career">
                            <dt>2009年</dt><dd>{w("韓国　国立全北大学/医学部医学科　卒業")}<br />{w("韓国　保健福祉部　/公衆保険医（兵役）")}</dd>
                            <dt>2012年</dt><dd>仙台市立病院　初期研修医</dd>
                            <dt>2014年</dt><dd>{w("形成外科　額顔面外科　/美容外科研修")}<br />{w("（福岡記念病院、/豊見城中央病院、/生駒市立病院、/長崎大学病院）")}</dd>
                            <dt>2020年</dt><dd>{w("イムス札幌消化器/中央総合病院")}<br />形成外科・皮膚科</dd>
                            <dt>2022年</dt><dd>Theoryクリニック 勤務</dd>
                            <dt>2023年</dt><dd>城本クリニック 勤務</dd>
                            <dt>2024年</dt><dd>新宿美容外科クリニック 勤務</dd>
                          </dl>
                          <h4 className="dr-tag">所属学会</h4>
                          <p className="dr-text">日本形成外科学会 専門医</p>
                        </div>
                      </article>
                      <article className="dr-card">
                        <div className="dr-photo"><img src={img("doctor-toeda-card")} alt="医師 戸枝 幹夫" loading="lazy" decoding="async" /></div>
                        <div className="dr-body">
                          <p className="dr-clinic">新宿美容外科クリニック</p>
                          <h3 className="dr-name"><small>医師</small>戸枝 幹夫</h3>
                          <h4 className="dr-tag">経歴</h4>
                          <dl className="dr-career">
                            <dt>1992年</dt><dd>愛知医科大学医学部医学科 卒業</dd>
                            <dt>1992年</dt><dd>{w("聖マリアンナ医科大学/医学部付属病院")}<br />皮膚科　入職</dd>
                            <dt className="span">2006年〜2009年<span>大手美容外科　院長</span></dt>
                            <dt>2012年</dt><dd>{w("新宿美容外科クリニック/新宿院")}<br />院長就任</dd>
                            <dt>2014年</dt><dd>{w("新宿美容外科クリニック/Men’s新宿院")}<br />院長就任</dd>
                            <dt>2016年</dt><dd>医療法人社団泰聖会　理事就任</dd>
                            <dt>2018年</dt><dd>{w("新宿美容外科クリニック/立川院")}<br />院長就任</dd>
                          </dl>
                        </div>
                      </article>
                      <article className="dr-card">
                        <div className="dr-photo"><img src={img("doctor-aoki-card")} alt="医師 青木宏信" loading="lazy" decoding="async" /></div>
                        <div className="dr-body">
                          <p className="dr-clinic">新宿美容外科クリニック</p>
                          <h3 className="dr-name"><small>医師</small>青木宏信</h3>
                          <h4 className="dr-tag">メッセージ</h4>
                          <p className="dr-text strong">{w("形成外科医としての/経験をいかし、/丁寧な/手技と/寄り添う/姿勢で、/美しさと/自信を/引き出す/美容医療を/提供いたします。")}</p>
                          <h4 className="dr-tag">経歴</h4>
                          <dl className="dr-career">
                            <dt>2010年</dt><dd>東京医科大学医学部 卒業<br />横浜旭中央総合病院 勤務</dd>
                            <dt>2012年</dt><dd>{w("日本医科大学付属病院/形成外科 勤務")}<br />都内美容クリニック 勤務</dd>
                            <dt>2021年</dt><dd>新宿美容外科クリニック 勤務</dd>
                          </dl>
                          <h4 className="dr-tag">所属学会</h4>
                          <ul className="dr-list">
                            <li>日本形成外科学会 専門医</li>
                            <li>{w("乳房オンコプラスチック/サージャリー学会")}</li>
                            <li>{w("マイクロサージャリー学会/乳房再建用/エキスパンダー・/インプラント/責任医師")}</li>
                          </ul>
                          <p className="dr-text strong">{w("2010年/東京医科大学/医学部卒業/その後、/大学病院にて/形成外科を/習得。/現在も/年間100件を/超える/外科手術を/行っている。/病院勤務と/並行して、/都内美容/クリニックで/美容施術を/学び、/レーザー治療、/注入治療/ともに/症例を/積んだ。")}</p>
                        </div>
                      </article>
                    </DoctorSlider>
                  </div>
                </section>

                {/* ================= 11. クリニック案内 ================= */}
                <section className="sec bg-white" id="clinic">
                  <div className="inner">
                    <h2 className="sec-title"><span className="en">Clinic Information</span><span className="ja">クリニック案内</span></h2>

                    <div className="clinic">
                      <h3>新宿院</h3>
                      <div className="ph has-img" style={{ aspectRatio: "980 / 613" }}><img src={img("clinic-shinjuku")} alt="新宿院の外観と院内" loading="lazy" decoding="async" /></div>
                      <table className="info">
                        <tbody>
                        <tr><th>電話番号</th><td><TelLink clientSlug={c.slug} tel="03-6380-0131">03-6380-0131</TelLink></td></tr>
                        <tr><th>診療時間</th><td>10:00〜19:00（完全予約制）</td></tr>
                        <tr><th>休診日</th><td>年中無休</td></tr>
                        <tr><th>住所</th><td>東京都新宿区新宿3-2-4<br />M&amp;E SQUARE 8F</td></tr>
                        <tr><th>アクセス</th><td>{w("東京メトロ/丸の内線・/副都心線/「新宿三丁目駅」/C4出口/出てすぐ/左側")}<br />{w("新宿駅東口より/徒歩5分/（マルイアネックス/向かい側）")}</td></tr>
                        </tbody>
                      </table>
                      <div className="map"><iframe src={mapSrc("東京都新宿区新宿3-2-4 M&E SQUARE")} loading="lazy" title="東京都新宿区新宿3-2-4 M&E SQUARE の地図" referrerPolicy="no-referrer-when-downgrade" /></div>
                    </div>

                    <div className="clinic">
                      <h3>立川院</h3>
                      <div className="ph has-img" style={{ aspectRatio: "980 / 613" }}><img src={img("clinic-tachikawa")} alt="立川院の外観と院内" loading="lazy" decoding="async" /></div>
                      <table className="info">
                        <tbody>
                        <tr><th>電話番号</th><td><TelLink clientSlug={c.slug} tel="042-548-5803">042-548-5803</TelLink></td></tr>
                        <tr><th>診療時間</th><td>10:00〜19:00（完全予約制）</td></tr>
                        <tr><th>休診日</th><td>年中無休</td></tr>
                        <tr><th>住所</th><td>東京都立川市曙町2-7-19<br />MAビル5F</td></tr>
                        <tr><th>アクセス</th><td>JR立川駅北口より徒歩1分</td></tr>
                        </tbody>
                      </table>
                      <div className="map"><iframe src={mapSrc("東京都立川市曙町2-7-19")} loading="lazy" title="東京都立川市曙町2-7-19 の地図" referrerPolicy="no-referrer-when-downgrade" /></div>
                    </div>
                  </div>
                </section>

                {/* ================= 12. よくある質問 ================= */}
                <section className="sec bg-beige" id="faq">
                  <div className="inner">
                    <h2 className="sec-title"><span className="en">FAQ</span><span className="ja">よくある質問</span></h2>
                    <dl className="faq">
                      <div className="faq-item">
                        <dt><span className="qa">Q</span><span>施術は痛いですか？</span></dt>
                        <dd><span className="qa">A</span><span>{w("必要な/場合は/局所麻酔を/行い、/痛みを/和らげます。/麻酔の/注射の/際に/痛みを/感じる/箇所も/あり、/感じ方には/個人差が/あります。/麻酔の/効果は/3時間程度で/自然に/なくなります。")}</span></dd>
                      </div>
                      <div className="faq-item">
                        <dt><span className="qa">Q</span><span>施術時間はどのくらいですか？</span></dt>
                        <dd><span className="qa">A</span><span>{w("15〜20分程度です。/個数や/大きさ、/施術方法によって/異なります。")}</span></dd>
                      </div>
                      <div className="faq-item">
                        <dt><span className="qa">Q</span><span>施術後のケア方法について教えてください。</span></dt>
                        <dd><span className="qa">A</span><span>{w("一時的に/表皮が/ない/状態に/なりますので、/新しい/表皮が/できるまでの/間は、/バイ菌が/入らないよう/綿棒で/軟こうを/塗り、/保護用の/肌色の/テープを/貼る/ことを/おすすめしています。")}</span></dd>
                      </div>
                      <div className="faq-item">
                        <dt><span className="qa">Q</span><span>除去後は普段通りに生活できますか？</span></dt>
                        <dd><span className="qa">A</span><span>{w("当日から、/お化粧・/洗顔・/入浴が/可能です。/術後は/一時的に/皮膚が/ない/状態に/なるため、/日焼けを/すると/シミの/原因に/なります。/紫外線対策を/行ってください。")}</span></dd>
                      </div>
                      <div className="faq-item">
                        <dt><span className="qa">Q</span><span>ダウンタイムはどのくらいですか？</span></dt>
                        <dd><span className="qa">A</span><span>{w("2〜3か月程度が/目安です。/経過には個人差があります。")}</span></dd>
                      </div>
                      <div className="faq-item">
                        <dt><span className="qa">Q</span><span>{w("2mmより/大きい/ほくろ・/イボも/相談できますか？")}</span></dt>
                        <dd><span className="qa">A</span><span>{w("はい。/カウンセリングで/医師が/状態を/確認し、/適した/施術方法を/ご説明します。/プランの対象外となる/場合の/料金は")} <span className="tbc">要確認</span></span></dd>
                      </div>
                    </dl>
                  </div>
                </section>

                {/* ================= 13. 予約フォーム ================= */}
                <section className="sec bg-white" id="reserve">
                  <div className="inner">
                    <h2 className="sec-title"><span className="en">Contact</span><span className="ja">カウンセリング予約</span></h2>
                    <p className="form-lead">{w("新宿美容外科クリニックでは、/WEBからの/カウンセリング予約を/受け付けております。")}<br />{w("お悩みや/ご相談に/丁寧に/お応えいたします。")}</p>
                    <p className="form-tel">・お急ぎの方はお電話でご予約ください。<br />
                      　新宿院 <TelLink clientSlug={c.slug} tel="03-6380-0131">03-6380-0131</TelLink><br />
                      　立川院 <TelLink clientSlug={c.slug} tel="042-548-5803">042-548-5803</TelLink><br />
                      　（年中無休 10:00〜19:00）</p>

                    <div className="form-box">
                      <LPForm
                        clientSlug={c.slug}
                        accent={brand}
                        fields={c.form.fields}
                        submitLabel={c.form.submitLabel}
                        submitStyle={{ background: ctaGrad, boxShadow: "0 4px 0 #8f3563, 0 8px 18px rgba(143,53,99,.25)", borderRadius: 999 }}
                        microcopy={c.form.microcopy}
                        disclaimer={
                          <>
                            {w("ご入力いただいた/個人情報は、/ご予約の/確認・/ご連絡の/ためにのみ/使用します。")}
                            <a href={c.privacyUrl} target="_blank" rel="noopener noreferrer">プライバシーポリシー</a>
                            をご確認ください。
                          </>
                        }
                      />
                    </div>
                  </div>
                </section>
              </main>

              <footer className="footer">
                <nav>
                  <a href="https://www.shinjukubiyou.com/" target="_blank" rel="noopener noreferrer">公式サイト</a>
                  <a href="https://www.shinjukubiyou.com/privacy/" target="_blank" rel="noopener noreferrer">プライバシーポリシー</a>
                  <a href="https://www.shinjukubiyou.com/guideline/" target="_blank" rel="noopener noreferrer">医療広告ガイドライン</a>
                </nav>
                <p className="copy">Copyright © 新宿美容外科クリニック All rights reserved.</p>
              </footer>

          </div>
        </LPCanvas>
      </div>

      <StickyFooterCTA
        anchor="#reserve"
        buttonText={c.sticky.buttonText}
        showAfter={c.sticky.showAfter}
        buttonGradient={ctaGrad}
        shadowColor="rgba(143,53,99,0.35)"
        borderColor="rgba(183,90,136,0.35)"
        offers={c.sticky.offers.map((o) => (
          <span key={o.label} style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#4a3a42" }}>{o.label}</span>
            <span style={{ fontFamily: "'Shippori Mincho', serif", fontWeight: 700, fontSize: 24, lineHeight: 1, color: "#ab0058", background: "linear-gradient(transparent 62%, #fbd9e4 62%)", padding: "0 2px" }}>
              {o.value}
            </span>
          </span>
        ))}
      />
    </LPShell>
  );
}
