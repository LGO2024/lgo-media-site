// LGO プラン一覧ページ
// Design: Japanese Editorial × Digital-Native
// Funnel: ランキング表示 → 各プランのカード → LINE診断CTA

import { useState } from "react";
import { Link } from "wouter";
import { Star, Users, MessageCircle, ChevronRight, MapPin, Filter } from "lucide-react";
import { PageLayout } from "@/components/Layout";
import { plans, LINE_GATEWAY_PATH } from "@/lib/data";

const areas = ["すべて", "関東", "関西", "九州・沖縄"];
const categories = ["すべて", "温泉", "BBQ", "ビーチ", "文化", "アクティビティ"];

function RankBadge({ rank }: { rank: number }) {
  const cls = rank === 1 ? "rank-1" : rank === 2 ? "rank-2" : rank === 3 ? "rank-3" : "bg-gray-200 text-gray-600";
  return (
    <span className={`${cls} text-xs font-bold px-2.5 py-1 rounded-full inline-block`}>
      {rank <= 3 ? `${rank}位` : `No.${rank}`}
    </span>
  );
}

export default function Plans() {
  const [selectedArea, setSelectedArea] = useState("すべて");
  const [selectedCat, setSelectedCat] = useState("すべて");

  const filtered = plans.filter((p) => {
    const areaOk = selectedArea === "すべて" || p.area === selectedArea;
    const catOk = selectedCat === "すべて" || p.category.some((c) => c.includes(selectedCat));
    return areaOk && catOk;
  });

  return (
    <PageLayout>
      {/* Page Header */}
      <div className="bg-[oklch(0.22_0.06_250)] py-10">
        <div className="container">
          <div className="text-white/60 text-xs mb-2 flex items-center gap-1">
            <Link href="/" className="no-underline text-white/60 hover:text-white">トップ</Link>
            <ChevronRight size={12} />
            <span>プランを探す</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white mb-2">合宿・旅行プラン一覧</h1>
          <p className="text-white/70 text-sm">幹事さんに選ばれているプランをエリア・目的別に探せます</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-border sticky top-14 md:top-16 z-30">
        <div className="container py-3">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
            <Filter size={14} className="shrink-0 text-muted-foreground" />
            <div className="flex gap-2 shrink-0">
              {areas.map((area) => (
                <button
                  key={area}
                  onClick={() => setSelectedArea(area)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all whitespace-nowrap ${
                    selectedArea === area
                      ? "text-white border-transparent"
                      : "border-border text-muted-foreground hover:border-primary"
                  }`}
                  style={selectedArea === area ? { background: "oklch(0.72 0.15 210)", borderColor: "oklch(0.72 0.15 210)" } : {}}
                >
                  {area}
                </button>
              ))}
            </div>
            <div className="w-px h-4 bg-border shrink-0" />
            <div className="flex gap-2 shrink-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all whitespace-nowrap ${
                    selectedCat === cat
                      ? "text-white border-transparent"
                      : "border-border text-muted-foreground hover:border-primary"
                  }`}
                  style={selectedCat === cat ? { background: "oklch(0.22 0.06 250)" } : {}}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container py-10">
        {/* Inline CTA Banner */}
        <div className="rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 border border-[oklch(0.72_0.15_210)/30]" style={{ background: "oklch(0.97 0.02 210)" }}>
          <div>
            <p className="font-bold text-sm mb-1" style={{ color: "oklch(0.22 0.06 250)" }}>
              どのプランが自分に合うか分からない？
            </p>
            <p className="text-xs text-muted-foreground">AIが人数・予算・希望に合わせて最適な3プランを1分で提案します。</p>
          </div>
          <a
            href={LINE_GATEWAY_PATH}
            className="btn-line text-sm shrink-0"
          >
            <MessageCircle size={15} />
            AIに相談する（無料）
          </a>
        </div>

        {/* Plan List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((plan) => (
            <Link key={plan.id} href={`/plans/${plan.id}`} className="no-underline">
              <div className="bg-white rounded-2xl overflow-hidden border border-border card-hover shadow-sm h-full flex flex-col">
                <div className="relative h-52 overflow-hidden">
                  <img src={plan.image} alt={plan.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3">
                    <RankBadge rank={plan.rank} />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)" }}>
                    <div className="flex items-center gap-1 text-white text-xs">
                      <MapPin size={11} />
                      {plan.prefecture}
                    </div>
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {plan.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-[oklch(0.93_0.005_240)] text-muted-foreground">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-bold text-sm leading-snug mb-3 flex-1" style={{ color: "oklch(0.22 0.06 250)" }}>
                    {plan.title}
                  </h3>
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div>
                      <div className="text-xs text-muted-foreground">1人あたり</div>
                      <div className="font-black text-xl" style={{ fontFamily: "Oswald, sans-serif", color: "oklch(0.22 0.06 250)" }}>
                        ¥{plan.priceFrom.toLocaleString()}<span className="text-xs font-normal text-muted-foreground">〜</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-xs justify-end">
                        <Star size={11} className="text-yellow-400" fill="currentColor" />
                        <span className="font-bold">{plan.reviewScore}</span>
                        <span className="text-muted-foreground">({plan.reviewCount}件)</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                        <Users size={11} />
                        {plan.capacity}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="mb-4">該当するプランが見つかりませんでした。</p>
            <a href={LINE_GATEWAY_PATH} className="btn-line text-sm">
              <MessageCircle size={15} />
              AIに相談して探す
            </a>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            希望のプランが見つからない場合は、AIに直接相談してください。<br />
            非公開プランや特別条件も含めて提案します。
          </p>
          <a href={LINE_GATEWAY_PATH} className="btn-line text-base">
            <MessageCircle size={18} />
            AIに1分で丸投げ！LINE無料診断
          </a>
        </div>
      </div>
    </PageLayout>
  );
}
