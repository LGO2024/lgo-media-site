export type Plan = {
  id: string
  title: string
  image: string
  description: string
  price: string
  url: string
  budget: number
  purpose: string[]
  dest: string
  days: string[]
}

export const plans: Plan[] = [
  {
    id: "p001",
    title: "北海道 海鮮グルメと絶景ドライブ",
    image: "https://images.unsplash.com/photo-1596714041797-28f09bc5392d?auto=format&fit=crop&q=80&w=600&h=400",
    description: "札幌市内の市場で新鮮な海鮮丼を堪能し、富良野・美瑛の広大な自然を巡る王道グルメプランです。",
    price: "49,800円〜",
    url: "https://example.com/tour/hokkaido_gourmet",
    budget: 50000,
    purpose: ["gourmet"],
    dest: "北海道",
    days: ["2泊3日", "3泊4日"],
  },
  {
    id: "p002",
    title: "沖縄マリンアクティビティ満喫3日間",
    image: "https://images.unsplash.com/photo-1506501139174-099022df5260?auto=format&fit=crop&q=80&w=600&h=400",
    description: "青の洞窟シュノーケリングやパラセーリングなど、沖縄の海を全身で楽しむアクティブな方向けのプラン。",
    price: "85,000円〜",
    url: "https://example.com/tour/okinawa_activity",
    budget: 100000,
    purpose: ["activity"],
    dest: "沖縄",
    days: ["2泊3日", "3泊4日"],
  },
  {
    id: "p003",
    title: "箱根 名湯めぐりと会席料理の宿",
    image: "https://images.unsplash.com/photo-1580977276076-ae4b8c219b8e?auto=format&fit=crop&q=80&w=600&h=400",
    description: "喧騒から離れた隠れ宿で、源泉掛け流しの露天風呂と季節の食材を使った極上の会席料理をご用意。",
    price: "120,000円〜",
    url: "https://example.com/tour/hakone_onsen",
    budget: 150000,
    purpose: ["onsen", "gourmet"],
    dest: "箱根",
    days: ["日帰り", "1泊2日"],
  },
  {
    id: "p004",
    title: "九州 黒川温泉 湯めぐり手形の旅",
    image: "https://images.unsplash.com/photo-1624253321171-1be53e12f5f4?auto=format&fit=crop&q=80&w=600&h=400",
    description: "趣のある温泉街を浴衣で散策。「入湯手形」を使って、森の中の露天風呂など様々な温泉を楽しめます。",
    price: "45,000円〜",
    url: "https://example.com/tour/kurokawa_onsen",
    budget: 50000,
    purpose: ["onsen"],
    dest: "九州（黒川温泉）",
    days: ["1泊2日", "2泊3日"],
  },
  {
    id: "p005",
    title: "長野 白馬 キャンプ＆ラフティング",
    image: "https://images.unsplash.com/photo-1542931287-023b922fa89b?auto=format&fit=crop&q=80&w=600&h=400",
    description: "大自然の中でグランピング型キャンプ。翌日は清流でのラフティング体験が付いた大満足のアウトドアプラン。",
    price: "38,000円〜",
    url: "https://example.com/tour/hakuba_activity",
    budget: 50000,
    purpose: ["activity"],
    dest: "長野",
    days: ["1泊2日", "2泊3日"],
  },
]

// 指定日数で行けるデスティネーション一覧
export function getDestsByDays(days: string): string[] {
  const dests = new Set<string>()
  plans.forEach(p => {
    if (p.days.includes(days)) dests.add(p.dest)
  })
  return Array.from(dests)
}

// メインのフィルタリング（日数・行き先・予算・目的）
export function filterPlans(
  days: string,
  dest: string,
  budget: number,
  purpose: string
): Plan[] {
  return plans
    .filter(p => {
      return (
        p.days.includes(days) &&
        p.dest === dest &&
        p.budget <= budget &&
        (purpose === "all" || p.purpose.includes(purpose))
      )
    })
    .slice(0, 3)
}

// 代替案: 同じ目的・予算で他の日数・行き先の組み合わせ
export type Alternative = {
  dest: string
  days: string
  plan: Plan
}

export function getAlternatives(
  currentDays: string,
  currentDest: string,
  budget: number,
  purpose: string
): Alternative[] {
  const results: Alternative[] = []
  const seen = new Set<string>()

  plans.forEach(p => {
    if (p.dest === currentDest && p.days.includes(currentDays)) return // 同じ組み合わせは除外
    if (p.budget > budget) return
    if (purpose !== "all" && !p.purpose.includes(purpose)) return

    // 各プランで対応している最短の日数を選んで提示
    for (const d of p.days) {
      const key = `${p.dest}-${d}`
      if (!seen.has(key)) {
        seen.add(key)
        results.push({ dest: p.dest, days: d, plan: p })
        break
      }
    }
  })

  return results.slice(0, 3)
}
