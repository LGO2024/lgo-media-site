// ============================================================
// LGO 合宿チェッカー — プランデータ
// ============================================================
// 予約アクションは3種類:
//   { type: "url",  value: "https://..." }   → 外部URLへ遷移
//   { type: "tel",  value: "03-xxxx-xxxx" }  → 電話番号を表示
//   { type: "text", value: "〇〇までご連絡ください" } → テキスト表示
// ============================================================

export type BookingAction =
  | { type: "url"; value: string }
  | { type: "tel"; value: string }
  | { type: "text"; value: string }

export type Plan = {
  id: string
  badge: string
  badgeColor: string
  name: string
  area: string
  description: string
  price: string
  features: string[]
  // 絞り込み条件（複数マッチOK、空配列 = 全条件に対応）
  matchPeople: string[]
  matchArea: string[]
  matchPurpose: string[]
  matchBudget: string[]
  booking: BookingAction
}

// ============================================================
// ここにプランを追加していく（仮データ）
// ============================================================
export const plans: Plan[] = [
  {
    id: "plan-001",
    badge: "コスパ最強",
    badgeColor: "#22c55e",
    name: "箱根・湯の里 合宿プラン",
    area: "関東",
    description: "箱根の自然に囲まれた人気施設。食事・大浴場・会議室がすべて込みで、初めての幹事さんにも安心のフルサポート付き。",
    price: "1万円〜/人",
    features: ["食事2食付き", "大浴場あり", "会議室完備"],
    matchPeople: [],
    matchArea: ["関東（箱根・伊豆など）"],
    matchPurpose: [],
    matchBudget: ["1〜2万円/人", "2〜3万円/人"],
    booking: { type: "url", value: "https://example.com/hakone" }, // ← 実URLに差し替え
  },
  {
    id: "plan-002",
    badge: "施設充実",
    badgeColor: "#1B6FE4",
    name: "伊豆・スポーツ合宿センター",
    area: "関東",
    description: "グラウンド・体育館完備のスポーツ特化施設。大人数でも余裕の収容力で、スポーツ系サークルに絶大な人気。",
    price: "1万円〜/人",
    features: ["グラウンドあり", "体育館完備", "大人数OK"],
    matchPeople: ["31〜50名", "51名〜"],
    matchArea: ["関東（箱根・伊豆など）"],
    matchPurpose: ["スポーツ合宿"],
    matchBudget: [],
    booking: { type: "tel", value: "0557-xx-xxxx" }, // ← 実番号に差し替え
  },
  {
    id: "plan-003",
    badge: "駅チカ便利",
    badgeColor: "#F96C30",
    name: "京都・町家ゼミ合宿プラン",
    area: "関西",
    description: "京都駅から15分。歴史ある町家をリノベーションした和モダン施設。ゼミ・卒業旅行に人気のロケーション。",
    price: "2万円〜/人",
    features: ["駅から15分", "和モダン空間", "近隣観光地多数"],
    matchPeople: [],
    matchArea: ["関西（京都・大阪）"],
    matchPurpose: ["ゼミ合宿", "卒業旅行"],
    matchBudget: ["2〜3万円/人", "3万円〜/人"],
    booking: { type: "url", value: "https://example.com/kyoto" }, // ← 実URLに差し替え
  },
  {
    id: "plan-004",
    badge: "格安プラン",
    badgeColor: "#8b5cf6",
    name: "沖縄・マリンリゾート合宿",
    area: "九州・沖縄",
    description: "沖縄の青い海を満喫できるリゾート施設。マリンスポーツ・BBQ・観光まで全部まとめてLGOがコーディネート。",
    price: "2万円〜/人",
    features: ["海まで徒歩1分", "BBQ設備あり", "マリンOP充実"],
    matchPeople: [],
    matchArea: ["九州・沖縄"],
    matchPurpose: ["サークル旅行", "卒業旅行"],
    matchBudget: ["2〜3万円/人", "3万円〜/人"],
    booking: { type: "text", value: "LGOスタッフへLINEでご相談ください" }, // ← 要変更
  },
]

// ============================================================
// 絞り込みロジック（変更不要）
// ============================================================
export function filterPlans(answers: {
  people: string
  area: string
  purpose: string
  budget: string
}): Plan[] {
  const scored = plans.map((plan) => {
    let score = 0
    if (plan.matchPeople.length === 0 || plan.matchPeople.includes(answers.people)) score++
    if (plan.matchArea.length === 0 || plan.matchArea.includes(answers.area)) score++
    if (plan.matchPurpose.length === 0 || plan.matchPurpose.includes(answers.purpose)) score++
    if (plan.matchBudget.length === 0 || plan.matchBudget.includes(answers.budget)) score++
    return { plan, score }
  })

  const sorted = scored.sort((a, b) => b.score - a.score)
  return sorted.slice(0, 3).map((s) => s.plan)
}
