import LPShell from "@/components/LPShell";
import LPCanvas from "@/components/LPCanvas";
import LPForm from "@/components/LPForm";
import StickyFooterCTA from "@/components/StickyFooterCTA";
import MenuNav from "./MenuNav";
import TelLink from "./TelLink";
import { css } from "./styles";
import config from "./config";

/**
 * 新宿美容外科クリニック｜イボ・ホクロ除去LP（テスト枠）。brief.md の13セクション構成。
 *
 *   ヘッダー → ①FV → ②プラン紹介 → ③施術について → ④診察・施術方法 → ⑤施術イメージ
 *   → ⑥症例写真 → ⑦施術時間・注意点 → ⑧施術の流れ → ⑨料金表（診察料・お支払い方法）
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
                    <span>気になる</span><br />
                    <span><span className="em">イボ</span><span className="sm">・</span><span className="em">ホクロ</span>を</span><br />
                    <span>まとめて除去</span>
                  </h1>
                  </div>
                  <div className="fv-price">
                    <p className="fv-ribbon">1個2mmまで｜お顔・全身に対応</p>
                    <div className="fv-box">
                      <div className="fv-row"><span className="n">3個</span><span className="t">19,800<small>円</small></span><span className="u">1個あたり<b>6,600</b><small>円</small></span></div>
                      <div className="fv-row"><span className="n">10個</span><span className="t">49,500<small>円</small></span><span className="u">1個あたり<b>4,950</b><small>円</small></span></div>
                      <div className="fv-row"><span className="n">30個</span><span className="t">99,000<small>円</small></span><span className="u">1個あたり<b>3,300</b><small>円</small></span></div>
                      <p className="fv-note">※「2mmまで」は1個あたりのサイズです。<br />※金額は全て税込になります。</p>
                    </div>
                  </div>
                  <div className="fv-cta">
                    <a className="btn-cta shine" href="#reserve">カウンセリングを予約する</a>
                  </div>
                </section>

                {/* ================= 2. プラン紹介 ================= */}
                <section className="sec bg-pink" id="plan">
                  <div className="inner">
                    <h2 className="sec-title"><span className="en">Plan</span><span className="ja">イボ・ホクロ除去<br />まとめて除去プラン</span></h2>
                    <p className="about-lead" style={{ textAlign: "center", marginBottom: "24px" }}>気になる数に合わせて選べる<br /><span className="mk">3つのプラン</span>をご用意しています。</p>
                    <div className="plan-cards">
                      <div className="plan-card">
                        <div className="num"><span><b>3</b><small>個</small></span><small>プラン</small></div>
                        <div className="body">
                          <p className="total"><b>19,800</b>円</p>
                          <span className="per">1個あたり <b>6,600</b>円</span>
                        </div>
                      </div>
                      <div className="plan-card">
                        <div className="num"><span><b>10</b><small>個</small></span><small>プラン</small></div>
                        <div className="body">
                          <p className="total"><b>49,500</b>円</p>
                          <span className="per">1個あたり <b>4,950</b>円</span>
                        </div>
                      </div>
                      <div className="plan-card is-best">
                        <div className="num"><span><b>30</b><small>個</small></span><small>プラン</small></div>
                        <div className="body">
                          <p className="total"><b>99,000</b>円</p>
                          <span className="per">1個あたり <b>3,300</b>円</span>
                        </div>
                      </div>
                    </div>
                    <p className="plan-note">
                      ※対象は1個あたり2mmまでのイボ・ホクロです。<br />
                      ※金額は全て税込になります。<br />
                      ※<span className="tbc">追加費用・適用条件 要確認</span>
                    </p>
                  </div>
                  <div className="cta-block">
                    <p className="lead">まずは医師にご相談ください</p>
                    <a className="btn-cta" href="#reserve">カウンセリングを予約する</a>
                  </div>
                </section>

                {/* ================= 3. 施術についての説明 ================= */}
                <section className="sec bg-white" id="about">
                  <div className="inner">
                    <h2 className="sec-title"><span className="en">About</span><span className="ja">当院のイボ・ホクロ除去<br />について</span></h2>
                    <p className="about-lead">
                      お顔の目立つところにある大きめのほくろやイボ、細かく点在するほくろなど、お悩みをお持ちの方は少なくありません。<br />
                      ほくろやイボは<span className="mk">比較的短時間の施術で除去できるものも多く</span>、ひとつなくなるだけでお顔の印象が変わることもあります。<br />
                      お顔だけでなく、全身のほくろ・イボの治療を行っています。
                    </p>
                    <div className="device">
                      <div className="ph"><span>施術機器・施術風景<br />（差し替え）</span></div>
                      <div className="device-body">
                        <h3>電気メスによる除去<br /><span style={{ fontSize: "13px", fontWeight: "400" }}>（電気焼灼法）</span></h3>
                        <p>一般的なメスとは異なり、イボやほくろを電気の熱で焼灼して取り除く方法です。縫合の必要はなく、局所麻酔を行ったうえで施術します。施術当日から洗顔や入浴が可能です。</p>
                        <p><span className="tbc">本プランの施術方法 要確認</span></p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* ================= 4. 診断・施術方法 ================= */}
                <section className="sec bg-white diag" id="diagnosis" style={{ paddingTop: "0" }}>
                  <div className="inner">
                    <h2 className="sec-title"><span className="en">Diagnosis</span><span className="ja">医師による診察と<br />施術方法のご提案</span></h2>
                    <div className="ph"><span>カウンセリング・診察風景<br />（差し替え）</span></div>
                    <p>カウンセリングでは医師がお悩みやご希望をうかがい、<span className="mk">ほくろ・イボの状態を確認したうえで、適した施術方法をご説明</span>します。</p>
                    <p>ほくろやイボには、まれに悪性のものが含まれることもあります。自己判断せず、医師の診察を受けることをおすすめします。</p>
                    <div className="methods">
                      <div className="method">
                        <h3>電気メス治療</h3>
                        <p>電気の熱で焼灼して除去します。縫合は不要です。</p>
                      </div>
                      <div className="method">
                        <h3>切縫法</h3>
                        <p>電気メスで除去できない大きなほくろ・イボに用いる方法です。皮膚を切開して縫合し、術後1週間前後で抜糸します。</p>
                      </div>
                      <div className="method">
                        <h3>くり抜き法</h3>
                        <p>色素が皮膚の深い部分まで及んでいる、直径6mm以内のほくろに用いる方法です。ほくろの形に沿ってくり抜き、縫合します。</p>
                      </div>
                    </div>
                    <p className="plan-note">※2mmを超えるもの、切縫法・くり抜き法となる場合の料金：<span className="tbc">要確認</span></p>
                  </div>
                </section>

                {/* ================= 5. 施術イメージ ================= */}
                <section className="sec bg-beige" id="image">
                  <div className="inner">
                    <h2 className="sec-title"><span className="en">Image</span><span className="ja">イボ・ホクロ除去の<br />イメージ</span></h2>
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
                            <text x="70" y="30" textAnchor="middle" fontSize="12" fontWeight="700" fill="#4a3a42">ホクロ</text>
                          </g>
                        </svg>
                        <div><p className="no">01.</p><p>ほくろ・イボは、色素をつくる細胞などが皮膚の中で増えることでできています。</p></div>
                      </li>
                      <li>
                        <svg viewBox="0 0 140 140" role="img" aria-label="電気メスで焼灼">
                          <defs><clipPath id="c2"><circle cx="70" cy="70" r="70"/></clipPath></defs>
                          <g clipPath="url(#c2)">
                            <rect width="140" height="140" fill="#fff"/>
                            <rect y="74" width="140" height="18" fill="#f5c6cf"/>
                            <rect y="92" width="140" height="48" fill="#fbe5df"/>
                            <g fill="none" stroke="#efc5bd" strokeWidth="1"><path d="M0 104h140M0 116h140M0 128h140"/></g>
                            <path d="M44 76 Q70 40 96 76 Z" fill="#4a3a42"/>
                            <g fill="#4a3a42"><circle cx="58" cy="84" r="2"/><circle cx="70" cy="88" r="2.4"/><circle cx="82" cy="83" r="2"/><circle cx="64" cy="96" r="2"/><circle cx="77" cy="98" r="2.2"/></g>
                            <g transform="rotate(35 70 56)"><rect x="64" y="-6" width="12" height="46" rx="5" fill="#b9b2b6"/><path d="M66 40h8l-4 14z" fill="#8d8088"/></g>
                            <g stroke="#b75a88" strokeWidth="2" strokeLinecap="round"><path d="M88 48l8-4M90 56l9 1M84 41l4-7"/></g>
                            <text x="36" y="40" textAnchor="middle" fontSize="11" fontWeight="700" fill="#9c4472">電気メス</text>
                          </g>
                        </svg>
                        <div><p className="no">02.</p><p>局所麻酔を行ったうえで、電気メスでほくろ・イボを焼灼して取り除きます。</p></div>
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
                        <div><p className="no">03.</p><p>除去後の患部は、一時的に少しへこんだ状態になります。</p></div>
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
                        <div><p className="no">04.</p><p>時間の経過とともに周囲から皮膚が再生し、へこみは徐々に目立ちにくくなっていきます。経過には個人差があります。</p></div>
                      </li>
                    </ol>
                  </div>
                </section>

                {/* ================= 6. 症例写真 ================= */}
                <section className="sec bg-pink" id="case">
                  <div className="inner">
                    <h2 className="sec-title"><span className="en">Case Photo</span><span className="ja">症例写真</span></h2>
                    {/* 症例写真：使用許可済みの当院症例のみ。images/case-01-before.jpg 等に差し替え */}
                    <div className="case">
                      <figure className="case-photos" style={{ margin: "0" }}>
                        <div className="ph"><span>症例1 施術前<br />（許可済み素材に差し替え）</span></div>
                        <i className="arrow" aria-hidden="true" />
                        <div className="ph"><span>症例1 施術後<br />（許可済み素材に差し替え）</span></div>
                        <figcaption><span>Before</span><span></span><span>After</span></figcaption>
                      </figure>
                      <dl className="case-info">
                        <dt>施術名</dt><dd>イボ・ホクロ除去</dd>
                        <dt>治療回数・期間</dt><dd><span className="tbc">症例ごとに記載</span></dd>
                        <dt>副作用（リスク）</dt><dd>へこみ、色素沈着、ひりつき、傷跡、痛み、赤み</dd>
                        <dt>価格</dt><dd>3個 19,800円〜30個 99,000円（税込）</dd>
                      </dl>
                    </div>
                    <div className="case">
                      <figure className="case-photos" style={{ margin: "0" }}>
                        <div className="ph"><span>症例2 施術前<br />（許可済み素材に差し替え）</span></div>
                        <i className="arrow" aria-hidden="true" />
                        <div className="ph"><span>症例2 施術後<br />（許可済み素材に差し替え）</span></div>
                        <figcaption><span>Before</span><span></span><span>After</span></figcaption>
                      </figure>
                      <dl className="case-info">
                        <dt>施術名</dt><dd>イボ・ホクロ除去</dd>
                        <dt>治療回数・期間</dt><dd><span className="tbc">症例ごとに記載</span></dd>
                        <dt>副作用（リスク）</dt><dd>へこみ、色素沈着、ひりつき、傷跡、痛み、赤み</dd>
                        <dt>価格</dt><dd>3個 19,800円〜30個 99,000円（税込）</dd>
                      </dl>
                    </div>
                    <div className="case">
                      <figure className="case-photos" style={{ margin: "0" }}>
                        <div className="ph"><span>症例3 施術前<br />（許可済み素材に差し替え）</span></div>
                        <i className="arrow" aria-hidden="true" />
                        <div className="ph"><span>症例3 施術後<br />（許可済み素材に差し替え）</span></div>
                        <figcaption><span>Before</span><span></span><span>After</span></figcaption>
                      </figure>
                      <dl className="case-info">
                        <dt>施術名</dt><dd>イボ・ホクロ除去</dd>
                        <dt>治療回数・期間</dt><dd><span className="tbc">症例ごとに記載</span></dd>
                        <dt>副作用（リスク）</dt><dd>へこみ、色素沈着、ひりつき、傷跡、痛み、赤み</dd>
                        <dt>価格</dt><dd>3個 19,800円〜30個 99,000円（税込）</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="cta-block">
                    <p className="lead">気になるイボ・ホクロをご相談ください</p>
                    <a className="btn-cta" href="#reserve">カウンセリングを予約する</a>
                  </div>
                </section>

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
                      <p style={{ marginTop: "8px" }}>局所麻酔の注射時に痛みを感じる場合があります。術後は一時的に表皮がない状態になるため、日焼けによりシミの原因となることがあります。紫外線対策を行ってください。効果・経過には個人差があります。</p>
                    </div>
                  </div>
                </section>

                {/* ================= 8. 施術の流れ ================= */}
                <section className="sec bg-beige" id="step">
                  <div className="inner">
                    <h2 className="sec-title"><span className="en">Treatment Step</span><span className="ja">施術の流れ</span></h2>
                    <ol className="steps">
                      <li>
                        <div className="ph"><span>STEP1 画像<br />（差し替え）</span></div>
                        <div><p className="no">01.</p><h3>ご予約</h3><p>予約フォーム・お電話からご予約ください。</p></div>
                      </li>
                      <li>
                        <div className="ph"><span>STEP2 画像<br />（差し替え）</span></div>
                        <div><p className="no">02.</p><h3>ご来院・<br />カウンセリング</h3><p>医師がお悩みをうかがい、肌の状態を確認して施術方法をご説明します。</p></div>
                      </li>
                      <li>
                        <div className="ph"><span>STEP3 画像<br />（差し替え）</span></div>
                        <div><p className="no">03.</p><h3>施術</h3><p>局所麻酔を行ったうえで施術します。施術後はアイシングを行い、問題がなければそのままご帰宅いただけます。</p></div>
                      </li>
                      <li>
                        <div className="ph"><span>STEP4 画像<br />（差し替え）</span></div>
                        <div><p className="no">04.</p><h3>アフターケア</h3><p>後日、術後経過を確認する検診を行います。不安なことはメールでもご相談いただけます。</p></div>
                      </li>
                    </ol>
                  </div>
                </section>

                {/* ================= 9. 料金表 ================= */}
                <section className="sec bg-white" id="price">
                  <div className="inner">
                    <h2 className="sec-title"><span className="en">Price</span><span className="ja">料金表</span></h2>
                    {/* 診察料：公式HP 料金一覧（初診料3,300円・再診料2,200円 税込）／カウンセリング無料は公式CTAの表記 */}
                    <div className="fees">
                      <div className="fee"><p className="fee-name">初診料</p><p className="fee-val">3,300<small>円</small></p><p className="fee-tax">（税込）</p></div>
                      <div className="fee"><p className="fee-name">再診料</p><p className="fee-val">2,200<small>円</small></p><p className="fee-tax">（税込）</p></div>
                      <div className="fee is-free"><p className="fee-name">カウンセリング料</p><p className="fee-val">0<small>円</small></p><p className="fee-tax">&nbsp;</p></div>
                    </div>
                    <p className="fee-note">※カウンセリングのみの場合の初診料の扱い：<span className="tbc">要確認</span></p>

                    <span className="p-label">イボ・ホクロ除去</span>
                    <h3 className="p-head">まとめて除去プラン</h3>
                    <p className="p-sub">1個あたり2mmまで</p>
                    <table className="p-table">
                      <tbody>
                        <tr>
                          <th>2mmまで<br /><b>3個プラン</b></th>
                          <td><span className="yen">19,800<small>円</small></span><span className="per">1個あたり6,600円</span></td>
                        </tr>
                        <tr>
                          <th>2mmまで<br /><b>10個プラン</b></th>
                          <td><span className="yen">49,500<small>円</small></span><span className="per">1個あたり4,950円</span></td>
                        </tr>
                        <tr className="is-best">
                          <th>2mmまで<br /><b>30個プラン</b><span className="tag">1個あたり最安</span></th>
                          <td><span className="yen">99,000<small>円</small></span><span className="per">1個あたり3,300円</span></td>
                        </tr>
                      </tbody>
                    </table>
                    <ul className="p-notes">
                      <li>※「2mmまで」は1個あたりのサイズです。</li>
                      <li>※金額は全て税込になります。</li>
                      <li>※追加費用（麻酔・薬代・術後検診等）：<span className="tbc">要確認</span></li>
                      <li>※プランの適用条件（有効期限・部位・複数回来院の可否等）：<span className="tbc">要確認</span></li>
                    </ul>

                    {/* お支払い方法：公式HP 料金一覧「ご利用可能な決済方法一覧」より */}
                    <div className="pay">
                      <h3 className="p-head">お支払い方法</h3>
                      <p className="pay-lead">当日の現金でのお支払いのほか、クレジットカード・電子マネー・QRコード決済・お振込み・医療ローンがご利用いただけます。<br />お支払いについては、カウンセリング時に担当者へご相談ください。</p>

                      <h4 className="pay-h">現金</h4>
                      <p className="pay-txt">当日、現金でのお支払いが可能です。</p>

                      <h4 className="pay-h">クレジットカード</h4>
                      <p className="pay-txt">各種クレジットカードがご利用いただけます。</p>
                      {/* ブランドロゴ画像を使う場合は、各社の利用規約に沿った公式素材に差し替え */}
                      <ul className="brands">
                        <li>VISA</li><li>Mastercard</li><li>JCB</li><li>American Express</li><li>Diners Club</li><li>DISCOVER</li><li>UnionPay（銀聯）</li>
                      </ul>

                      <h4 className="pay-h">電子マネー・QRコード決済</h4>
                      <dl className="pay-list">
                        <dt>電子マネー</dt><dd>Apple Pay／iD／QUICPay</dd>
                        <dt>交通系電子マネー</dt><dd>Kitaca／Suica／PASMO／TOICA／manaca／ICOCA／SUGOCA／nimoca／はやかけん</dd>
                        <dt>QRコード決済</dt><dd>PayPay／楽天ペイ（R Pay）／d払い／au PAY／COIN+／Smart Code／J-coin Pay／微信支付（WeChat Pay）／UnionPay（銀聯）QRコード／Alipay+（支付宝、AlipayHK、カカオペイ等）</dd>
                      </dl>

                      <h4 className="pay-h">医療ローン</h4>
                      <p className="pay-txt">医療ローン（分割）もご利用いただけます。詳細はお問い合わせください。<br /><span className="pay-sub">※未成年の方は分割をご利用いただけません。</span></p>
                      <p className="pay-txt" style={{ marginTop: "6px" }}><span className="tbc">本プランでの各決済・医療ローン利用可否 要確認</span></p>
                    </div>
                  </div>
                  <div className="cta-block">
                    <p className="lead">ご自身に合うプランは医師にご相談ください</p>
                    <a className="btn-cta" href="#reserve">カウンセリングを予約する</a>
                  </div>
                </section>

                {/* ================= 10. 医師紹介 ================= */}
                <section className="sec bg-beige" id="doctor">
                  <div className="inner">
                    <h2 className="sec-title"><span className="en">Doctor Introduction</span><span className="ja">医師紹介</span></h2>
                    <p className="plan-note" style={{ textAlign: "center", margin: "-16px 0 28px" }}><span className="tbc">掲載医師・写真 要確認</span></p>

                    <div className="doctor">
                      <div className="ph"><span>医師写真<br />（差し替え）</span></div>
                      <p className="pos">新宿院　院長</p>
                      <p className="name">リ ジンヨン</p>
                      <p className="en">Dr. Jinyoung Lee</p>
                      <div className="career">
                        <h4>経歴</h4>
                        <dl>
                          <dt>2009年</dt><dd>韓国 国立全北大学医学部医学科 卒業</dd>
                          <dt>2009年</dt><dd>韓国 保健福祉部 公衆保険医（兵役）</dd>
                          <dt>2012年</dt><dd>仙台市立病院 初期研修医</dd>
                          <dt>2014年</dt><dd>形成外科 額顔面外科 美容外科研修（福岡記念病院、豊見城中央病院、生駒市立病院、長崎大学病院）</dd>
                          <dt>2020年</dt><dd>イムス札幌消化器中央総合病院 形成外科 皮膚科</dd>
                          <dt>2022年</dt><dd>Theoryクリニック 勤務</dd>
                          <dt>2023年</dt><dd>城本クリニック 勤務</dd>
                          <dt>2024年</dt><dd>新宿美容外科クリニック 勤務</dd>
                        </dl>
                        <h4>所属学会</h4>
                        <ul><li>日本形成外科学会 専門医</li></ul>
                      </div>
                    </div>

                    <div className="doctor">
                      <div className="ph"><span>医師写真<br />（差し替え）</span></div>
                      <p className="pos">立川院　院長</p>
                      <p className="name">戸枝 幹夫</p>
                      <p className="en">Dr. Mikio Toeda</p>
                      <div className="career">
                        <h4>経歴</h4>
                        <dl>
                          <dt>1992年</dt><dd>愛知医科大学医学部医学科 卒業<br />聖マリアンナ医科大学医学部付属病院皮膚科 入職</dd>
                          <dt>2006年</dt><dd>大手美容外科 院長（〜2009年）</dd>
                          <dt>2012年</dt><dd>新宿美容外科クリニック新宿院院長就任</dd>
                          <dt>2014年</dt><dd>新宿美容外科クリニックMens新宿院就任</dd>
                          <dt>2018年</dt><dd>新宿美容外科クリニック立川院院長就任</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </section>

                {/* ================= 11. クリニック案内 ================= */}
                <section className="sec bg-white" id="clinic">
                  <div className="inner">
                    <h2 className="sec-title"><span className="en">Clinic Information</span><span className="ja">クリニック案内</span></h2>

                    <div className="clinic">
                      <h3>新宿院</h3>
                      <div className="ph"><span>新宿院 院内写真<br />（差し替え）</span></div>
                      <table className="info">
                        <tbody>
                        <tr><th>電話番号</th><td><TelLink clientSlug={c.slug} tel="03-6380-0131">03-6380-0131</TelLink></td></tr>
                        <tr><th>診療時間</th><td>10:00〜19:00（完全予約制）</td></tr>
                        <tr><th>休診日</th><td>年中無休</td></tr>
                        <tr><th>住所</th><td>東京都新宿区新宿3-2-4<br />M&amp;E SQUARE 8F</td></tr>
                        <tr><th>アクセス</th><td>東京メトロ丸の内線・副都心線「新宿三丁目駅」C4出口出てすぐ左側<br />新宿駅東口より徒歩5分（マルイアネックス向かい側）</td></tr>
                        </tbody>
                      </table>
                      <div className="map"><iframe src={mapSrc("東京都新宿区新宿3-2-4 M&E SQUARE")} loading="lazy" title="東京都新宿区新宿3-2-4 M&E SQUARE の地図" referrerPolicy="no-referrer-when-downgrade" /></div>
                    </div>

                    <div className="clinic">
                      <h3>立川院</h3>
                      <div className="ph"><span>立川院 院内写真<br />（差し替え）</span></div>
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
                        <dd><span className="qa">A</span><span>必要な場合は局所麻酔を行い、痛みを和らげます。麻酔の注射の際に痛みを感じる箇所もあり、感じ方には個人差があります。麻酔の効果は3時間程度で自然になくなります。</span></dd>
                      </div>
                      <div className="faq-item">
                        <dt><span className="qa">Q</span><span>施術時間はどのくらいですか？</span></dt>
                        <dd><span className="qa">A</span><span>15〜20分程度です。個数や大きさ、施術方法によって異なります。</span></dd>
                      </div>
                      <div className="faq-item">
                        <dt><span className="qa">Q</span><span>施術後のケア方法について教えてください。</span></dt>
                        <dd><span className="qa">A</span><span>一時的に表皮がない状態になりますので、新しい表皮ができるまでの間は、バイ菌が入らないよう綿棒で軟こうを塗り、保護用の肌色のテープを貼ることをおすすめしています。</span></dd>
                      </div>
                      <div className="faq-item">
                        <dt><span className="qa">Q</span><span>除去後は普段通りに生活できますか？</span></dt>
                        <dd><span className="qa">A</span><span>当日から、お化粧・洗顔・入浴が可能です。術後は一時的に皮膚がない状態になるため、日焼けをするとシミの原因になります。紫外線対策を行ってください。</span></dd>
                      </div>
                      <div className="faq-item">
                        <dt><span className="qa">Q</span><span>ダウンタイムはどのくらいですか？</span></dt>
                        <dd><span className="qa">A</span><span>2〜3か月程度が目安です。経過には個人差があります。</span></dd>
                      </div>
                      <div className="faq-item">
                        <dt><span className="qa">Q</span><span>2mmより大きいほくろ・イボも相談できますか？</span></dt>
                        <dd><span className="qa">A</span><span>はい。カウンセリングで医師が状態を確認し、適した施術方法をご説明します。プランの対象外となる場合の料金は <span className="tbc">要確認</span></span></dd>
                      </div>
                    </dl>
                  </div>
                </section>

                {/* ================= 13. 予約フォーム ================= */}
                <section className="sec bg-white" id="reserve">
                  <div className="inner">
                    <h2 className="sec-title"><span className="en">Contact</span><span className="ja">カウンセリング予約</span></h2>
                    <p className="form-lead">新宿美容外科クリニックでは、WEBからのカウンセリング予約を受け付けております。<br />お悩みやご相談に丁寧にお応えいたします。</p>
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
                            ご入力いただいた個人情報は、ご予約の確認・ご連絡のためにのみ使用します。
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
            <span style={{ fontSize: 11, color: "#666" }}>{o.label}</span>
            <span style={{ fontFamily: "'Shippori Mincho', serif", fontWeight: 700, fontSize: 17, lineHeight: 1, color: "#ab0058" }}>
              {o.value.replace("円", "")}
              <span style={{ fontSize: 11 }}>円</span>
            </span>
          </span>
        ))}
      />
    </LPShell>
  );
}
