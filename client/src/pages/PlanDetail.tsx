// LGO プラン詳細ページ
// Design: Japanese Editorial × Digital-Native
// Key UX: 「寸止め」設計 - 空き状況・正確見積もりはLINEへ誘導（モゲチェック型UX②）

import { useParams, Link } from "wouter";
import { Star, Users, MapPin, ChevronRight, MessageCircle, Lock, CheckCircle, Clock, Wifi, Car, Utensils } from "lucide-react";
import { PageLayout } from "@/components/Layout";
import { plans, LINE_GATEWAY_PATH } from "@/lib/data";

const facilityIcons: Record<string, React.ReactNode> = {
  "Wi-Fi": <Wifi size={14} />,
  "駐車場": <Car size={14} />,
  "食堂": <Utensils size={14} />,
  "レストラン": <Utensils size={14} />,
};

export default function PlanDetail() {
  const { id } = useParams<{ id: string }>();
  const plan = plans.find((p) => p.id === id);

  if (!plan) {
    return (
      <PageLayout>
        <div className="container py-20 text-center">
          <p className="text-muted-foreground mb-4">プランが見つかりませんでした。</p>
          <Link href="/plans" className="btn-line text-sm no-underline inline-flex">プラン一覧へ戻る</Link>
        </div>
      </PageLayout>
    );
  }

  const relatedPlans = plans.filter((p) => p.id !== plan.id && p.area === plan.area).slice(0, 3);

  return (
    <PageLayout>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-border">
        <div className="container py-3">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Link href="/" className="no-underline hover:text-foreground">トップ</Link>
            <ChevronRight size={12} />
            <Link href="/plans" className="no-underline hover:text-foreground">プラン一覧</Link>
            <ChevronRight size={12} />
            <span className="text-foreground truncate max-w-[200px]">{plan.title}</span>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            <div className="rounded-2xl overflow-hidden h-64 md:h-80 relative">
              <img src={plan.image} alt={plan.title} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4">
                <span className={`${plan.rank <= 3 ? (plan.rank === 1 ? "rank-1" : plan.rank === 2 ? "rank-2" : "rank-3") : "bg-gray-200 text-gray-600"} text-sm font-bold px-3 py-1 rounded-full`}>
                  人気{plan.rank}位
                </span>
              </div>
            </div>

            {/* Title & Meta */}
            <div>
              <div className="flex flex-wrap gap-1 mb-3">
                {plan.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-[oklch(0.93_0.005_240)] text-muted-foreground">
                    #{tag}
                  </span>
                ))}
              </div>
              <h1 className="text-xl md:text-2xl font-black mb-3" style={{ color: "oklch(0.22 0.06 250)" }}>
                {plan.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin size={14} />{plan.prefecture}</span>
                <span className="flex items-center gap-1"><Users size={14} />{plan.capacity}</span>
                <span className="flex items-center gap-1"><Clock size={14} />{plan.nights}泊〜</span>
                <span className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-400" fill="currentColor" />
                  <strong className="text-foreground">{plan.reviewScore}</strong>
                  <span>({plan.reviewCount}件の口コミ)</span>
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-5 border border-border">
              <h2 className="font-bold text-base mb-3 section-heading" style={{ color: "oklch(0.22 0.06 250)" }}>プラン概要</h2>
              <p className="text-sm text-foreground leading-relaxed mt-4">{plan.description}</p>
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-2xl p-5 border border-border">
              <h2 className="font-bold text-base mb-4 section-heading" style={{ color: "oklch(0.22 0.06 250)" }}>おすすめポイント</h2>
              <ul className="mt-4 space-y-3">
                {plan.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <CheckCircle size={16} className="shrink-0 mt-0.5" style={{ color: "oklch(0.72 0.15 210)" }} />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Basic Info */}
            <div className="bg-white rounded-2xl p-5 border border-border">
              <h2 className="font-bold text-base mb-4 section-heading" style={{ color: "oklch(0.22 0.06 250)" }}>基本情報</h2>
              <table className="w-full mt-4 text-sm">
                <tbody className="divide-y divide-border">
                  {[
                    { label: "エリア", value: plan.prefecture },
                    { label: "収容人数", value: plan.capacity },
                    { label: "最短宿泊", value: `${plan.nights}泊〜` },
                    { label: "アクセス", value: plan.access },
                  ].map((row) => (
                    <tr key={row.label}>
                      <td className="py-2.5 pr-4 text-muted-foreground font-medium w-28">{row.label}</td>
                      <td className="py-2.5">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Facilities */}
            <div className="bg-white rounded-2xl p-5 border border-border">
              <h2 className="font-bold text-base mb-4 section-heading" style={{ color: "oklch(0.22 0.06 250)" }}>設備・アメニティ</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {plan.facilities.map((f) => (
                  <span key={f} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-border bg-[oklch(0.975_0.003_240)]">
                    {facilityIcons[f] || <CheckCircle size={12} />}
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* ===== 寸止めCTA（モゲチェック型UX②）===== */}
            <div
              className="rounded-2xl p-6 border-2 text-center"
              style={{ borderColor: "oklch(0.72 0.15 210)", background: "oklch(0.97 0.02 210)" }}
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <Lock size={18} style={{ color: "oklch(0.72 0.15 210)" }} />
                <h3 className="font-black text-base" style={{ color: "oklch(0.22 0.06 250)" }}>
                  正確な料金と空き状況はLINEでチェック！
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                ご希望の日程・人数に合わせて、AIが最新の空き状況と<br className="hidden sm:block" />
                正確な見積もりを<strong className="text-foreground">1分</strong>でお届けします。<br />
                人気プランのため、今すぐ確認をおすすめします。
              </p>
              {/* 価格の寸止め表示 */}
              <div className="bg-white rounded-xl p-4 mb-5 relative overflow-hidden">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">1人あたり概算</span>
                  <span className="font-black text-xl" style={{ fontFamily: "Oswald, sans-serif", color: "oklch(0.22 0.06 250)" }}>
                    ¥{plan.priceFrom.toLocaleString()}〜
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm mt-2">
                  <span className="text-muted-foreground">正確な見積もり</span>
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-24 rounded bg-gray-200 blur-sm" />
                    <Lock size={14} className="text-muted-foreground" />
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm mt-2">
                  <span className="text-muted-foreground">空き状況</span>
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-20 rounded bg-gray-200 blur-sm" />
                    <Lock size={14} className="text-muted-foreground" />
                  </div>
                </div>
              </div>
              <a
                href={LINE_GATEWAY_PATH}
                                className="btn-line text-base w-full justify-center"
              >
                <MessageCircle size={18} />
                このプランの空き状況をLINEで確認する
              </a>
              <p className="text-xs text-muted-foreground mt-3">完全無料・1分で回答 · 成約特典で思い出AI動画も無料</p>
            </div>

            {/* Testimonial */}
            <div className="bg-white rounded-2xl p-5 border border-border">
              <h2 className="font-bold text-base mb-4 section-heading" style={{ color: "oklch(0.22 0.06 250)" }}>利用者の声</h2>
              <div className="mt-4">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400" fill="currentColor" />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-3">
                  「{plan.testimonial.text}」
                </p>
                <p className="text-xs text-muted-foreground font-medium">{plan.testimonial.name}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Sticky CTA Card */}
            <div className="lg:sticky lg:top-24">
              <div className="bg-white rounded-2xl border-2 p-5 shadow-md" style={{ borderColor: "oklch(0.72 0.15 210)" }}>
                <div className="text-center mb-4">
                  <div className="text-xs text-muted-foreground mb-1">1人あたり概算</div>
                  <div className="font-black text-3xl" style={{ fontFamily: "Oswald, sans-serif", color: "oklch(0.22 0.06 250)" }}>
                    ¥{plan.priceFrom.toLocaleString()}
                    <span className="text-base font-normal text-muted-foreground">〜</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">※正確な金額はLINEでご確認ください</div>
                </div>

                <a
                  href={LINE_GATEWAY_PATH}
                                    className="btn-line text-sm w-full justify-center mb-3"
                >
                  <MessageCircle size={16} />
                  空き状況・見積もりをLINEで確認
                </a>

                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={12} style={{ color: "oklch(0.72 0.15 210)" }} />
                    <span>完全無料で相談できます</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={12} style={{ color: "oklch(0.72 0.15 210)" }} />
                    <span>AIが1分で回答</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={12} style={{ color: "oklch(0.72 0.15 210)" }} />
                    <span>成約特典：思い出AI動画が無料</span>
                  </div>
                </div>
              </div>

              {/* Related Plans */}
              {relatedPlans.length > 0 && (
                <div className="bg-white rounded-2xl border border-border p-5 mt-4">
                  <h3 className="font-bold text-sm mb-4" style={{ color: "oklch(0.22 0.06 250)" }}>
                    同じエリアのプラン
                  </h3>
                  <div className="space-y-3">
                    {relatedPlans.map((rp) => (
                      <Link key={rp.id} href={`/plans/${rp.id}`} className="no-underline">
                        <div className="flex gap-3 hover:bg-[oklch(0.975_0.003_240)] rounded-lg p-2 transition-colors">
                          <img src={rp.image} alt={rp.title} className="w-16 h-12 object-cover rounded-lg shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs font-medium leading-snug truncate" style={{ color: "oklch(0.22 0.06 250)" }}>
                              {rp.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              ¥{rp.priceFrom.toLocaleString()}〜
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
