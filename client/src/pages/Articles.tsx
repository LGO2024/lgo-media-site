// LGO 記事一覧ページ
// Design: Japanese Editorial × Digital-Native
// Funnel: SEO流入受け皿 → 記事カード → LINE診断CTA

import { useState } from "react";
import { Link } from "wouter";
import { Clock, ChevronRight, MessageCircle, TrendingUp, BookOpen } from "lucide-react";
import { PageLayout } from "@/components/Layout";
import { articles, LINE_GATEWAY_PATH } from "@/lib/data";

const categories = ["すべて", "幹事ガイド", "費用・予算", "AI活用", "ゼミ向け"];

export default function Articles() {
  const [selectedCat, setSelectedCat] = useState("すべて");

  const filtered = articles.filter(
    (a) => selectedCat === "すべて" || a.category === selectedCat
  );
  const popular = articles.filter((a) => a.popular);

  return (
    <PageLayout>
      {/* Page Header */}
      <div className="bg-[oklch(0.22_0.06_250)] py-10">
        <div className="container">
          <div className="text-white/60 text-xs mb-2 flex items-center gap-1">
            <Link href="/" className="no-underline text-white/60 hover:text-white">トップ</Link>
            <ChevronRight size={12} />
            <span>お役立ち記事</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white mb-2">幹事さん必見！お役立ち記事</h1>
          <p className="text-white/70 text-sm">合宿・旅行の準備から当日まで、幹事の悩みを解決するコンテンツ</p>
        </div>
      </div>

      <div className="container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
                    selectedCat === cat
                      ? "text-white border-transparent"
                      : "border-border text-muted-foreground hover:border-primary"
                  }`}
                  style={selectedCat === cat ? { background: "oklch(0.72 0.15 210)" } : {}}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Article List */}
            <div className="space-y-4">
              {filtered.map((article) => (
                <Link key={article.id} href={`/articles/${article.id}`} className="no-underline">
                  <div className="bg-white rounded-2xl overflow-hidden border border-border card-hover shadow-sm flex flex-col sm:flex-row">
                    <div className="sm:w-48 h-40 sm:h-auto overflow-hidden shrink-0">
                      <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4 flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "oklch(0.93_0.005_240)", color: "oklch(0.35 0.07 250)" }}>
                            {article.category}
                          </span>
                          {article.popular && (
                            <span className="text-xs px-2 py-0.5 rounded-full font-bold text-white flex items-center gap-1" style={{ background: "oklch(0.72 0.15 210)" }}>
                              <TrendingUp size={10} />人気
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold text-sm leading-snug mb-2" style={{ color: "oklch(0.22 0.06 250)" }}>
                          {article.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                          {article.excerpt}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-3">
                        <span className="flex items-center gap-1"><Clock size={11} />{article.readTime}分で読める</span>
                        <span>{article.publishedAt}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* CTA Card */}
            <div className="rounded-2xl p-5 text-white" style={{ background: "oklch(0.22 0.06 250)" }}>
              <div className="flex items-center gap-2 mb-3">
                <MessageCircle size={18} style={{ color: "oklch(0.85 0.15 210)" }} />
                <h3 className="font-bold text-sm">AIに丸投げしませんか？</h3>
              </div>
              <p className="text-xs text-white/70 leading-relaxed mb-4">
                記事を読む時間も惜しい方へ。LINEで人数・予算・エリアを送るだけで、AIが1分で最適な3プランを提案します。
              </p>
              <a
                href={LINE_GATEWAY_PATH}
                className="flex items-center justify-center gap-2 text-sm font-bold text-white py-2.5 px-4 rounded-full w-full"
                style={{ background: "oklch(0.72 0.15 210)" }}
              >
                <MessageCircle size={15} />
                LINE無料診断
              </a>
            </div>

            {/* Popular Articles */}
            <div className="bg-white rounded-2xl border border-border p-5">
              <h3 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color: "oklch(0.22 0.06 250)" }}>
                <TrendingUp size={14} style={{ color: "oklch(0.72 0.15 210)" }} />
                人気記事
              </h3>
              <div className="space-y-3">
                {popular.map((article, i) => (
                  <Link key={article.id} href={`/articles/${article.id}`} className="no-underline">
                    <div className="flex gap-3 hover:bg-[oklch(0.975_0.003_240)] rounded-lg p-2 transition-colors">
                      <span className="font-black text-2xl shrink-0 w-6 text-center" style={{ fontFamily: "Oswald, sans-serif", color: "oklch(0.88 0.006 240)" }}>
                        {i + 1}
                      </span>
                      <p className="text-xs font-medium leading-snug" style={{ color: "oklch(0.22 0.06 250)" }}>
                        {article.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Category Links */}
            <div className="bg-white rounded-2xl border border-border p-5">
              <h3 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color: "oklch(0.22 0.06 250)" }}>
                <BookOpen size={14} style={{ color: "oklch(0.72 0.15 210)" }} />
                カテゴリ
              </h3>
              <div className="space-y-1">
                {categories.slice(1).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCat(cat)}
                    className="w-full text-left text-sm py-2 px-3 rounded-lg hover:bg-[oklch(0.975_0.003_240)] transition-colors flex items-center justify-between"
                    style={{ color: selectedCat === cat ? "oklch(0.72 0.15 210)" : "oklch(0.22 0.06 250)" }}
                  >
                    <span>{cat}</span>
                    <ChevronRight size={14} className="text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
