// LGO トップページ
// Design: Japanese Editorial × Digital-Native
// Funnel: Hero CTA → Value Props → Plan Ranking → Pain CTA → Articles → Testimonials → Final CTA

import { Link } from "wouter";
import { MessageCircle, ChevronRight, Star, Clock, Users, Zap, Shield, ArrowRight, Clapperboard } from "lucide-react";
import { PageLayout } from "@/components/Layout";
import { plans, articles, LINE_GATEWAY_PATH } from "@/lib/data";

function RankBadge({ rank }: { rank: number }) {
  const cls = rank === 1 ? "rank-1" : rank === 2 ? "rank-2" : "rank-3";
  return (
    <span className={`${cls} text-xs font-bold px-2 py-0.5 rounded-full inline-block`}>
      {rank}位
    </span>
  );
}

export default function Home() {
  const topPlans = plans.slice(0, 3);
  const topArticles = articles.slice(0, 3);

  return (
    <PageLayout>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden" style={{ minHeight: "520px" }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663417360493/HXRp3nYZJWbpernLJpyuSV/lgo-hero-WnLR4DcFFrWCL7AdbkNNTg.webp)`,
          }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, oklch(0.22 0.06 250 / 0.82) 0%, oklch(0.22 0.06 250 / 0.55) 60%, transparent 100%)" }} />
        <div className="relative container py-16 md:py-24">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4 border border-white/20">
              <Zap size={12} className="text-yellow-300" />
              LGOが1分で3プラン提案
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4" style={{ fontFamily: "Noto Sans JP, sans-serif", textShadow: "0 2px 12px rgba(0,0,0,0.3)" }}>
              めんどい合宿準備、<br />
              <span style={{ color: "oklch(0.85 0.15 210)" }}>LGOに1分で</span><br />
              丸投げ。
            </h1>
            <p className="text-white/85 text-sm md:text-base mb-8 leading-relaxed">
              サークル・ゼミの合宿幹事さん向け。<br />
              宿探し・見積もり・比較を全部LGOが代行。<br />
              成約特典で<strong className="text-white">思い出動画も完全無料</strong>。
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={LINE_GATEWAY_PATH}
                                className="btn-line text-base"
              >
                <MessageCircle size={18} />
                LINEで1分！無料診断
              </a>
              <Link
                href="/plans"
                className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-base font-bold px-6 py-3.5 rounded-full border border-white/30 hover:bg-white/25 transition-all no-underline"
              >
                プランを探す
                <ChevronRight size={16} />
              </Link>
            </div>
            <div className="flex items-center gap-4 mt-6">
              <div className="flex items-center gap-1 text-white/70 text-xs">
                <Users size={12} />
                <span>累計<strong className="text-white">500+</strong>名の幹事が利用</span>
              </div>
              <div className="flex items-center gap-1 text-white/70 text-xs">
                <Star size={12} className="text-yellow-300" fill="currentColor" />
                <span>満足度<strong className="text-white">4.8</strong>/5.0</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VALUE PROPS ===== */}
      <section className="py-12 bg-white border-b border-border">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Zap size={24} style={{ color: "oklch(0.72 0.15 210)" }} />,
                title: "LGOが1分で3択提案",
                desc: "人数・予算・エリアを入力するだけ。LGOが膨大な宿から最適な3プランを即座に提案します。",
              },
              {
                icon: <Shield size={24} style={{ color: "oklch(0.72 0.15 210)" }} />,
                title: "見積もり・調整を全代行",
                desc: "複数の宿への問い合わせ、空き状況確認、見積もり比較…幹事の面倒な作業を全部LGO旅チェックが代行。",
              },
              {
                icon: <Clapperboard size={24} style={{ color: "oklch(0.72 0.15 210)" }} />,
                title: "思い出動画が無料",
                desc: "LGO旅チェック経由で予約した団体に、プロ品質の旅行動画を自動生成。完全無料でプレゼント。",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-xl bg-[oklch(0.975_0.003_240)] border border-border">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1" style={{ color: "oklch(0.22 0.06 250)" }}>{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PLAN RANKING ===== */}
      <section className="py-14">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-black section-heading" style={{ color: "oklch(0.22 0.06 250)" }}>
                人気プランランキング
              </h2>
              <p className="text-sm text-muted-foreground mt-3">幹事さんに選ばれているプランTOP3</p>
            </div>
            <Link href="/plans" className="hidden sm:flex items-center gap-1 text-sm font-medium no-underline" style={{ color: "oklch(0.72 0.15 210)" }}>
              すべて見る <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topPlans.map((plan) => (
              <Link key={plan.id} href={`/plans/${plan.id}`} className="no-underline">
                <div className="bg-white rounded-2xl overflow-hidden border border-border card-hover shadow-sm">
                  <div className="relative h-48 overflow-hidden">
                    <img src={plan.image} alt={plan.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3">
                      <RankBadge rank={plan.rank} />
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                      {plan.prefecture}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {plan.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-[oklch(0.93_0.005_240)] text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-bold text-sm leading-snug mb-2" style={{ color: "oklch(0.22 0.06 250)" }}>
                      {plan.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs text-muted-foreground">1人あたり</span>
                        <div className="font-black text-lg" style={{ fontFamily: "Oswald, sans-serif", color: "oklch(0.22 0.06 250)" }}>
                          ¥{plan.priceFrom.toLocaleString()}<span className="text-xs font-normal text-muted-foreground">〜</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star size={12} className="text-yellow-400" fill="currentColor" />
                        <span className="font-bold text-foreground">{plan.reviewScore}</span>
                        <span>({plan.reviewCount})</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users size={12} />
                        {plan.capacity}
                      </div>
                      <span className="text-xs font-bold" style={{ color: "oklch(0.72 0.15 210)" }}>
                        詳細を見る →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center sm:hidden">
            <Link href="/plans" className="inline-flex items-center gap-1 text-sm font-bold no-underline" style={{ color: "oklch(0.72 0.15 210)" }}>
              すべてのプランを見る <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== PAIN CTA ===== */}
      <section className="py-14 bg-[oklch(0.22_0.06_250)]">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
              こんな悩み、ありませんか？
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                "予算内で良い宿が\n見つからない…",
                "複数の宿に\n問い合わせるのが面倒…",
                "みんなが楽しめる\nプランが思いつかない…",
              ].map((pain, i) => (
                <div key={i} className="bg-white/10 border border-white/20 rounded-xl p-4">
                  <p className="text-white text-sm font-medium whitespace-pre-line leading-relaxed">{pain}</p>
                </div>
              ))}
            </div>
            <p className="text-white/80 text-base mb-6">
              その悩み、<strong className="text-white">LGO旅チェックが全部解決します。</strong><br />
              LGOが1分で最適なプランを3つ提案。あとはLINEで相談するだけ。
            </p>
            <a
              href={LINE_GATEWAY_PATH}
                            className="btn-line text-base mx-auto"
            >
              <MessageCircle size={18} />
              LGOに1分で丸投げ！LINE無料診断
            </a>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-14 bg-white">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-10 section-heading mx-auto" style={{ color: "oklch(0.22 0.06 250)" }}>
            LGO旅チェックの使い方
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { step: "01", title: "LINEで相談", desc: "人数・予算・エリア・希望を送るだけ。1分で完了。" },
              { step: "02", title: "LGOが3プラン提案", desc: "LGOが膨大な宿から最適な3つのプランを即座に提案。" },
              { step: "03", title: "予約して完了", desc: "気に入ったプランを選べばLGO旅チェックが全部手配。特典の思い出動画も無料でもらえる。" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-black text-xl"
                  style={{ background: "oklch(0.72 0.15 210)", fontFamily: "Oswald, sans-serif" }}
                >
                  {item.step}
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute" style={{ marginTop: "-3rem", marginLeft: "calc(50% + 2rem)" }}>
                    <ArrowRight size={20} style={{ color: "oklch(0.72 0.15 210)" }} />
                  </div>
                )}
                <h3 className="font-bold text-base mb-2" style={{ color: "oklch(0.22 0.06 250)" }}>{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ARTICLES ===== */}
      <section className="py-14">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-black section-heading" style={{ color: "oklch(0.22 0.06 250)" }}>
                幹事さん必見！お役立ち記事
              </h2>
              <p className="text-sm text-muted-foreground mt-3">合宿準備の悩みを解決するコンテンツ</p>
            </div>
            <Link href="/articles" className="hidden sm:flex items-center gap-1 text-sm font-medium no-underline" style={{ color: "oklch(0.72 0.15 210)" }}>
              記事一覧 <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topArticles.map((article) => (
              <Link key={article.id} href={`/articles/${article.id}`} className="no-underline">
                <div className="bg-white rounded-2xl overflow-hidden border border-border card-hover shadow-sm h-full flex flex-col">
                  <div className="h-40 overflow-hidden">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "oklch(0.93_0.005_240)", color: "oklch(0.35 0.07 250)" }}>
                        {article.category}
                      </span>
                      {article.popular && (
                        <span className="text-xs px-2 py-0.5 rounded-full font-bold text-white" style={{ background: "oklch(0.72 0.15 210)" }}>
                          人気
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-sm leading-snug mb-2 flex-1" style={{ color: "oklch(0.22 0.06 250)" }}>
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-auto pt-3 border-t border-border">
                      <span className="flex items-center gap-1"><Clock size={11} />{article.readTime}分で読める</span>
                      <span>{article.publishedAt}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-16 bg-white">
        <div className="container text-center">
          <div className="max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: "oklch(0.72 0.15 210)" }}>
              <MessageCircle size={28} className="text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black mb-4" style={{ color: "oklch(0.22 0.06 250)" }}>
              さあ、最高の合宿を<br />計画しよう。
            </h2>
            <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
              LINEを開いて、人数・予算・エリアを送るだけ。<br />
              LGOが1分で最適なプランを3つ提案します。<br />
              <strong className="text-foreground">完全無料・成約特典で思い出動画もプレゼント。</strong>
            </p>
            <a
              href={LINE_GATEWAY_PATH}
                            className="btn-line text-base mx-auto"
            >
              <MessageCircle size={18} />
              LGOに1分で丸投げ！LINE無料診断
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
