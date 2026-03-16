// LGO 記事詳細ページ
// Design: Japanese Editorial × Digital-Native
// Key UX: 記事途中・読了後の複数LINE誘導（モゲチェック型UX③）

import { useParams, Link } from "wouter";
import { Clock, ChevronRight, MessageCircle, CheckCircle, TrendingUp, ArrowRight } from "lucide-react";
import { PageLayout } from "@/components/Layout";
import { articles, LINE_URL } from "@/lib/data";

// 記事コンテンツ（ダミーリッチコンテンツ）
const articleContents: Record<string, { intro: string; sections: { heading: string; body: string; hasCta?: boolean }[] }> = {
  "kanjicho-todo": {
    intro: "合宿の幹事に初めてなった方、おめでとうございます！そして…お疲れ様です。「何から始めればいいの？」「失敗したらどうしよう…」そんな不安を抱えている方のために、準備開始から当日まで、やることを時系列で完全網羅しました。",
    sections: [
      {
        heading: "【3ヶ月前】まずやること：日程と人数の確定",
        body: "合宿準備で一番大切なのは、日程と参加人数を早めに確定させることです。日程が決まらないと宿の予約ができず、人数が固まらないと予算計算もできません。まずはグループLINEやアンケートツールを使って、参加可能な日程を集めましょう。\n\n目安として、合宿の2〜3ヶ月前には日程と人数の目安を固めておくと、人気の宿を確保しやすくなります。",
      },
      {
        heading: "【2ヶ月前】宿の選定と見積もり依頼",
        body: "日程と人数が決まったら、次は宿探しです。これが幹事にとって最も時間がかかる作業です。\n\n複数の宿に問い合わせ、空き状況を確認し、見積もりを取り、比較する…この作業だけで数時間かかることも珍しくありません。予算・エリア・設備の条件を整理してから探し始めると効率的です。",
        hasCta: true,
      },
      {
        heading: "【1ヶ月前】参加費の集金と旅程の作成",
        body: "宿が決まったら、参加費の集金と旅程の作成を進めましょう。集金はPayPayやLINE Payなどのキャッシュレス決済を使うと管理が楽になります。旅程は交通手段・集合場所・タイムスケジュールを明記し、参加者全員に共有しましょう。",
      },
      {
        heading: "【1週間前〜当日】最終確認と当日の進行",
        body: "出発1週間前には参加者への最終案内を送り、持ち物リストを共有しましょう。当日は幹事が率先して動き、参加者が楽しめる雰囲気を作ることが大切です。写真や動画をたくさん撮っておくと、後から思い出を振り返れます。",
      },
    ],
  },
  "budget-guide": {
    intro: "「合宿の予算、どのくらいかかるの？」これは幹事が最初に直面する疑問です。予算が決まらないと宿も決められません。今回は、大学生の合宿・サークル旅行の費用相場と、賢く節約する方法を解説します。",
    sections: [
      {
        heading: "大学生の合宿費用の相場",
        body: "大学生の合宿旅行の費用は、1人あたり平均で約27,800円（1泊2日の場合）というデータがあります。内訳は宿泊費・交通費が約22,700円、食費が約5,000円が目安です。\n\nただし、エリアや宿のグレード、人数によって大きく変わります。関東近郊の温泉宿なら1万円台から、沖縄や遠方なら3万円以上になることもあります。",
      },
      {
        heading: "費用を抑える5つの方法",
        body: "①人数を増やす：宿の多くは人数が多いほど1人あたりの単価が下がります。\n②平日・オフシーズンを狙う：土日祝より平日、夏休みより春・秋の方が安くなることが多いです。\n③食事プランを選ぶ：素泊まりより食事付きの方が、外食するより結果的に安くなるケースも。\n④交通費を節約：新幹線より高速バス、レンタカーを複数人でシェアするなど。\n⑤AIマッチングを活用：複数の宿を比較して最安値を見つける手間をAIに任せる。",
        hasCta: true,
      },
      {
        heading: "予算設定の考え方",
        body: "まず参加者に「いくらまでなら出せるか」をアンケートで聞きましょう。多数決で決めると不満が出にくいです。予算が決まったら、交通費・宿泊費・食費・アクティビティ費に分けて配分を考えます。予備費として1人あたり1,000〜2,000円を確保しておくと安心です。",
      },
    ],
  },
  "ai-yado-search": {
    intro: "「宿に問い合わせたのに返信が来ない」「見積もりを比較しようとしたら3時間かかった」…合宿の宿探しは、幹事にとって最も消耗する作業の一つです。でも、AIを使えばこの悩みが劇的に解決できます。",
    sections: [
      {
        heading: "なぜ宿探しはこんなに大変なのか",
        body: "合宿の宿探しが大変な理由は、「条件が複雑」だからです。人数・日程・予算・エリア・設備…これらの条件を全て満たす宿を一般の宿泊サイトで探すのは非常に手間がかかります。さらに、団体向けの特別プランは通常のサイトには掲載されていないことも多く、直接問い合わせが必要になります。",
      },
      {
        heading: "AIマッチングで何が変わるか",
        body: "AIマッチングサービスを使うと、条件を入力するだけで最適な宿を自動で提案してくれます。複数の宿への問い合わせ、空き状況の確認、見積もりの取得…これらを全てAIが代行してくれるため、幹事の作業時間が大幅に削減されます。",
        hasCta: true,
      },
      {
        heading: "LGO旅チェックのAI診断の使い方",
        body: "LGOのLINE無料診断は、人数・予算・エリア・希望（温泉、BBQ、アクティビティなど）をLINEで送るだけで、AIが最適な3プランを1分で提案します。その後の見積もり取得・空き状況確認・予約手続きも全てLGO旅チェックが代行するため、幹事の手間がほぼゼロになります。",
      },
    ],
  },
  "zemi-gasshuku": {
    intro: "ゼミ合宿は、サークル旅行とは違う特有のニーズがあります。勉強・発表・議論ができる環境と、メンバーの親睦を深めるための場所が両立していることが重要です。失敗しない宿選びのポイントを7つ解説します。",
    sections: [
      {
        heading: "ポイント①〜③：設備・環境編",
        body: "①会議室・プロジェクター：発表やディスカッションに使える会議室があるかを確認。プロジェクターやスクリーンの有無も重要です。\n②Wi-Fi環境：資料のダウンロードや調べ物に使えるWi-Fiが必要です。速度も確認しましょう。\n③防音：夜遅くまで議論することもあるため、周囲への騒音に配慮した環境が望ましいです。",
      },
      {
        heading: "ポイント④〜⑦：立地・食事・コスト編",
        body: "④アクセス：電車やバスでのアクセスが良い場所を選ぶと、参加者の負担が減ります。\n⑤食事プラン：3食付きのプランがあると、食事の手配が不要で幹事の負担が減ります。\n⑥コスト：ゼミ合宿は参加必須のことも多いため、参加者の経済的負担を考慮した予算設定が大切です。\n⑦オフタイムの充実：勉強だけでなく、温泉やアクティビティなどリフレッシュできる要素があると参加者の満足度が上がります。",
        hasCta: true,
      },
    ],
  },
  "best-kanjicho": {
    intro: "「あの合宿、最高だったな」と参加者全員に言ってもらえる幹事になるには、何が必要でしょうか？企画力？コミュニケーション力？実は、最も重要なのは「準備の徹底」と「参加者への配慮」です。",
    sections: [
      {
        heading: "最高の幹事の共通点",
        body: "参加者から高評価を得る幹事には、いくつかの共通点があります。まず、準備が早く、情報共有が丁寧です。参加者が「何をすればいいか」「何を持っていけばいいか」を迷わないよう、明確な案内を出します。次に、参加者の多様なニーズに配慮しています。全員が楽しめるプログラムを考え、誰も置いてけぼりにしません。",
      },
      {
        heading: "準備フェーズのチェックリスト",
        body: "□ 日程・人数の確定（3ヶ月前）\n□ 予算の設定とアンケート（2.5ヶ月前）\n□ 宿の選定と予約（2ヶ月前）\n□ 旅程の作成（1.5ヶ月前）\n□ 参加費の集金（1ヶ月前）\n□ 持ち物リストの共有（2週間前）\n□ 最終案内の送付（1週間前）",
        hasCta: true,
      },
      {
        heading: "当日の進行のコツ",
        body: "当日は、幹事自身が一番楽しんでいる姿を見せることが大切です。幹事が楽しそうにしていると、参加者も自然と楽しくなります。また、予定通りに進まないことも想定して、フレキシブルに対応できる心構えを持っておきましょう。最後に、参加者への感謝の言葉を忘れずに。",
      },
    ],
  },
};

function InlineCTA() {
  return (
    <div className="my-6 rounded-xl p-4 border-l-4 flex flex-col sm:flex-row items-start sm:items-center gap-4" style={{ borderColor: "oklch(0.72 0.15 210)", background: "oklch(0.97 0.02 210)" }}>
      <div className="flex-1">
        <p className="font-bold text-sm mb-1" style={{ color: "oklch(0.22 0.06 250)" }}>
          宿探しの手間、AIに丸投げしませんか？
        </p>
        <p className="text-xs text-muted-foreground">LINEで条件を送るだけ。AIが1分で最適な3プランを提案します。</p>
      </div>
      <a
        href={LINE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 flex items-center gap-2 text-xs font-bold text-white px-4 py-2 rounded-full"
        style={{ background: "oklch(0.72 0.15 210)" }}
      >
        <MessageCircle size={13} />
        LINE無料診断
        <ArrowRight size={12} />
      </a>
    </div>
  );
}

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const article = articles.find((a) => a.id === id);
  const content = articleContents[id || ""] || null;

  if (!article) {
    return (
      <PageLayout>
        <div className="container py-20 text-center">
          <p className="text-muted-foreground mb-4">記事が見つかりませんでした。</p>
          <Link href="/articles" className="btn-line text-sm no-underline inline-flex">記事一覧へ戻る</Link>
        </div>
      </PageLayout>
    );
  }

  const relatedArticles = articles.filter((a) => a.id !== article.id && a.category === article.category).slice(0, 3);

  return (
    <PageLayout>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-border">
        <div className="container py-3">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Link href="/" className="no-underline hover:text-foreground">トップ</Link>
            <ChevronRight size={12} />
            <Link href="/articles" className="no-underline hover:text-foreground">お役立ち記事</Link>
            <ChevronRight size={12} />
            <span className="text-foreground truncate max-w-[200px]">{article.title}</span>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Article Main */}
          <article className="lg:col-span-2">
            {/* Category & Meta */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "oklch(0.93_0.005_240)", color: "oklch(0.35 0.07 250)" }}>
                {article.category}
              </span>
              {article.popular && (
                <span className="text-xs px-2 py-0.5 rounded-full font-bold text-white flex items-center gap-1" style={{ background: "oklch(0.72 0.15 210)" }}>
                  <TrendingUp size={10} />人気
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-xl md:text-2xl font-black leading-snug mb-4" style={{ color: "oklch(0.22 0.06 250)" }}>
              {article.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6 pb-4 border-b border-border">
              <span className="flex items-center gap-1"><Clock size={11} />{article.readTime}分で読める</span>
              <span>{article.publishedAt}</span>
            </div>

            {/* Hero Image */}
            <div className="rounded-2xl overflow-hidden h-52 md:h-64 mb-6">
              <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
            </div>

            {/* 導入文 + 最初のCTA */}
            {content && (
              <>
                <div className="bg-[oklch(0.975_0.003_240)] rounded-xl p-4 mb-6 border-l-4" style={{ borderColor: "oklch(0.72 0.15 210)" }}>
                  <p className="text-sm leading-relaxed text-foreground">{content.intro}</p>
                </div>

                {/* 導入後の最初のCTA */}
                <div className="bg-white rounded-xl p-4 border border-border mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <p className="text-xs text-muted-foreground">
                    💡 <strong className="text-foreground">時間がない方へ：</strong>宿探しをAIに丸投げすることもできます
                  </p>
                  <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="shrink-0 flex items-center gap-1.5 text-xs font-bold no-underline" style={{ color: "oklch(0.72 0.15 210)" }}>
                    LGO旅チェック無料診断を試す <ArrowRight size={12} />
                  </a>
                </div>

                {/* 本文セクション */}
                <div className="prose prose-sm max-w-none space-y-6">
                  {content.sections.map((section, i) => (
                    <div key={i}>
                      <h2 className="text-base font-black mb-3 pb-2 border-b-2" style={{ color: "oklch(0.22 0.06 250)", borderColor: "oklch(0.72 0.15 210)" }}>
                        {section.heading}
                      </h2>
                      <p className="text-sm leading-relaxed text-foreground whitespace-pre-line">{section.body}</p>
                      {section.hasCta && <InlineCTA />}
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* まとめ */}
            <div className="mt-8 bg-[oklch(0.975_0.003_240)] rounded-2xl p-5 border border-border">
              <h2 className="font-black text-base mb-3" style={{ color: "oklch(0.22 0.06 250)" }}>まとめ</h2>
              <ul className="space-y-2">
                {[
                  "早めの準備が成功の鍵",
                  "宿探しはAIに任せると効率的",
                  "参加者への丁寧な情報共有を忘れずに",
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle size={14} className="shrink-0 mt-0.5" style={{ color: "oklch(0.72 0.15 210)" }} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ===== 記事読了後のクロージングCTA ===== */}
            <div className="mt-8 rounded-2xl p-6 text-white text-center" style={{ background: "oklch(0.22 0.06 250)" }}>
              <MessageCircle size={32} className="mx-auto mb-3" style={{ color: "oklch(0.85 0.15 210)" }} />
              <h3 className="font-black text-lg mb-2">
                合宿準備の悩み、解決しましたか？
              </h3>
              <p className="text-white/70 text-sm mb-5 leading-relaxed">
                一番大変な「宿探し」はLGO旅チェックに任せましょう。<br />
                AIが1分で最適な3プランを提案。<br />
                <strong className="text-white">成約特典で思い出AI動画も完全無料。</strong>
              </p>
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-line text-base mx-auto"
              >
                <MessageCircle size={18} />
                AIに1分で丸投げ！LINE無料診断はこちら
              </a>
            </div>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="mt-8">
                <h3 className="font-bold text-base mb-4 section-heading" style={{ color: "oklch(0.22 0.06 250)" }}>
                  関連記事
                </h3>
                <div className="mt-4 space-y-3">
                  {relatedArticles.map((ra) => (
                    <Link key={ra.id} href={`/articles/${ra.id}`} className="no-underline">
                      <div className="flex gap-3 bg-white rounded-xl p-3 border border-border card-hover">
                        <img src={ra.image} alt={ra.title} className="w-20 h-14 object-cover rounded-lg shrink-0" />
                        <div>
                          <p className="text-xs font-bold leading-snug" style={{ color: "oklch(0.22 0.06 250)" }}>{ra.title}</p>
                          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <Clock size={10} />{ra.readTime}分
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-4">
              {/* Sticky CTA */}
              <div className="rounded-2xl p-5 text-white" style={{ background: "oklch(0.22 0.06 250)" }}>
                <h3 className="font-bold text-sm mb-2">宿探し、AIに任せませんか？</h3>
                <p className="text-xs text-white/70 mb-4 leading-relaxed">
                  人数・予算・エリアをLINEで送るだけ。AIが1分で最適な3プランを提案します。
                </p>
                <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-sm font-bold text-white py-2.5 px-4 rounded-full w-full" style={{ background: "oklch(0.72 0.15 210)" }}>
                  <MessageCircle size={15} />
                  LINE無料診断
                </a>
                <div className="mt-3 space-y-1.5 text-xs text-white/60">
                  <div className="flex items-center gap-1.5"><CheckCircle size={11} />完全無料</div>
                  <div className="flex items-center gap-1.5"><CheckCircle size={11} />AIが1分で回答</div>
                  <div className="flex items-center gap-1.5"><CheckCircle size={11} />思い出AI動画が無料</div>
                </div>
              </div>

              {/* Popular Articles */}
              <div className="bg-white rounded-2xl border border-border p-5">
                <h3 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color: "oklch(0.22 0.06 250)" }}>
                  <TrendingUp size={14} style={{ color: "oklch(0.72 0.15 210)" }} />
                  人気記事
                </h3>
                <div className="space-y-3">
                  {articles.filter((a) => a.popular && a.id !== article.id).slice(0, 3).map((pa, i) => (
                    <Link key={pa.id} href={`/articles/${pa.id}`} className="no-underline">
                      <div className="flex gap-2 hover:bg-[oklch(0.975_0.003_240)] rounded-lg p-1.5 transition-colors">
                        <span className="font-black text-xl shrink-0 w-5 text-center" style={{ fontFamily: "Oswald, sans-serif", color: "oklch(0.88 0.006 240)" }}>
                          {i + 1}
                        </span>
                        <p className="text-xs font-medium leading-snug" style={{ color: "oklch(0.22 0.06 250)" }}>{pa.title}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
