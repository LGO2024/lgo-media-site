// LGO 合宿チェッカー — LINEリッチメニュー用スタンドアロンページ
import { useState } from "react"
import { filterPlans, type Plan } from "@/lib/check-plans"

const steps = [
  {
    key: "people" as const,
    label: "参加人数を教えてください",
    options: ["〜10名", "11〜30名", "31〜50名", "51名〜"],
  },
  {
    key: "area" as const,
    label: "希望エリアはどこですか？",
    options: ["関東（箱根・伊豆など）", "関西（京都・大阪）", "九州・沖縄", "その他"],
  },
  {
    key: "purpose" as const,
    label: "旅行の目的は何ですか？",
    options: ["スポーツ合宿", "ゼミ合宿", "サークル旅行", "卒業旅行"],
  },
  {
    key: "budget" as const,
    label: "1人あたりの予算は？",
    options: ["〜1万円/人", "1〜2万円/人", "2〜3万円/人", "3万円〜/人"],
  },
]

type Answers = { people: string; area: string; purpose: string; budget: string }

function BookingButton({ plan }: { plan: Plan }) {
  const [copied, setCopied] = useState(false)

  if (plan.booking.type === "url") {
    return (
      <a
        href={plan.booking.value}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center font-bold text-white text-sm py-3 rounded-xl mt-3"
        style={{ background: "#1B6FE4" }}
      >
        予約ページへ →
      </a>
    )
  }

  if (plan.booking.type === "tel") {
    return (
      <a
        href={`tel:${plan.booking.value}`}
        className="block w-full text-center font-bold text-white text-sm py-3 rounded-xl mt-3"
        style={{ background: "#22c55e" }}
      >
        📞 {plan.booking.value} に電話する
      </a>
    )
  }

  // type === "text"
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(plan.booking.value).catch(() => {})
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }}
      className="block w-full text-center font-bold text-sm py-3 rounded-xl mt-3"
      style={{ background: "#f3f4f6", color: "#374151" }}
    >
      {copied ? "✅ コピーしました" : `💬 ${plan.booking.value}`}
    </button>
  )
}

export default function CheckPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Partial<Answers>>({})
  const [showResult, setShowResult] = useState(false)

  const handleSelect = (option: string) => {
    const key = steps[step].key
    const newAnswers = { ...answers, [key]: option }
    setAnswers(newAnswers)

    if (step < steps.length - 1) {
      setTimeout(() => setStep(step + 1), 200)
    } else {
      setTimeout(() => setShowResult(true), 200)
    }
  }

  const handleReset = () => {
    setStep(0)
    setAnswers({})
    setShowResult(false)
  }

  const results = showResult ? filterPlans(answers as Answers) : []

  return (
    <div className="min-h-screen" style={{ background: "#f8fafc" }}>
      <div className="max-w-md mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white text-xs font-bold mb-3"
            style={{ background: "#1B6FE4" }}
          >
            <span style={{ fontFamily: "Oswald, sans-serif" }}>LGO</span>
            <span>合宿チェッカー</span>
          </div>
          <h1 className="font-black text-xl" style={{ color: "#1a1a1a" }}>
            あなたにぴったりの<br />合宿プランを探そう
          </h1>
        </div>

        {!showResult ? (
          <div
            className="rounded-2xl p-6"
            style={{ background: "#fff", boxShadow: "0 4px 24px rgba(27,111,228,0.10)" }}
          >
            {/* Progress */}
            <div className="mb-5">
              <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                <span>質問 {step + 1} / {steps.length}</span>
                <span>{Math.round((step / steps.length) * 100)}%</span>
              </div>
              <div className="h-1.5 rounded-full" style={{ background: "#EEF8FF" }}>
                <div
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: `${(step / steps.length) * 100}%`,
                    background: "linear-gradient(90deg, #1B6FE4, #06C755)",
                  }}
                />
              </div>
            </div>

            <p className="font-black text-base mb-4 text-center" style={{ color: "#1a1a1a" }}>
              Q{step + 1}. {steps[step].label}
            </p>

            <div className="grid grid-cols-2 gap-2.5">
              {steps[step].options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className="p-3.5 rounded-xl font-bold text-sm text-center transition-all active:scale-95"
                  style={{
                    background: "#EEF8FF",
                    color: "#1B6FE4",
                    border: "2px solid #d0e8ff",
                  }}
                >
                  {option}
                </button>
              ))}
            </div>

            {Object.keys(answers).length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {steps.slice(0, step).map((s, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: "#F0FFF4", color: "#22c55e", border: "1px solid #bbf7d0" }}
                  >
                    ✓ {(answers as Record<string, string>)[s.key]}
                  </span>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="text-center mb-4">
              <p className="font-black text-lg" style={{ color: "#1a1a1a" }}>
                🎉 {results.length}件のプランが見つかりました！
              </p>
              <p className="text-xs text-gray-500 mt-1">気になるプランの予約ボタンを押してください</p>
            </div>

            {/* 選択内容サマリー */}
            <div
              className="rounded-xl p-3 mb-4 grid grid-cols-2 gap-1.5"
              style={{ background: "#EEF8FF" }}
            >
              {steps.map((s) => (
                <div key={s.key} className="text-xs">
                  <span className="text-gray-400">{s.label.slice(0, 7)}…</span>
                  <br />
                  <span className="font-bold" style={{ color: "#1B6FE4" }}>
                    {(answers as Record<string, string>)[s.key]}
                  </span>
                </div>
              ))}
            </div>

            {/* プランカード */}
            <div className="space-y-3">
              {results.map((plan) => (
                <div
                  key={plan.id}
                  className="rounded-2xl p-4"
                  style={{ background: "#fff", boxShadow: "0 2px 16px rgba(0,0,0,0.07)", border: "1px solid #e5e7eb" }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-xs font-black px-2.5 py-0.5 rounded-full text-white"
                      style={{ background: plan.badgeColor }}
                    >
                      {plan.badge}
                    </span>
                    <span className="text-xs text-gray-400">{plan.area}</span>
                  </div>
                  <p className="font-bold text-sm mb-1" style={{ color: "#1a1a1a" }}>{plan.name}</p>
                  <p className="text-xs text-gray-500 leading-relaxed mb-2">{plan.description}</p>
                  <div className="flex flex-wrap gap-1 mb-1">
                    {plan.features.map((f) => (
                      <span
                        key={f}
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: "#EEF8FF", color: "#1B6FE4" }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400">目安: {plan.price}</p>
                  <BookingButton plan={plan} />
                </div>
              ))}
            </div>

            <button
              onClick={handleReset}
              className="mt-5 w-full text-sm text-gray-400 py-2"
            >
              やり直す
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
