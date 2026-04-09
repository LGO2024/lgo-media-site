import { useCallback, useEffect, useRef, useState } from "react"
import liff from "@line/liff"
import {
  filterPlans,
  getAlternatives,
  getDestsByDays,
  type Alternative,
  type Plan,
} from "@/lib/chat-plans"

const LIFF_ID = "2009758757-rzcHsN39"
const LINE_ADD_URL = "https://lin.ee/X3UQbkT"

type Step = "days" | "dest" | "people" | "budget" | "purpose" | "result" | "done"

type Option = { label: string; value: string | number }

type ChatMessage = {
  id: string
  text: string
  isUser: boolean
  step?: Step
  options?: Option[]
  plans?: Plan[]
  alternatives?: Alternative[]
}

const DAYS_OPTIONS: Option[] = [
  { label: "日帰り", value: "日帰り" },
  { label: "1泊2日", value: "1泊2日" },
  { label: "2泊3日", value: "2泊3日" },
  { label: "3泊4日", value: "3泊4日" },
]

const PEOPLE_OPTIONS: Option[] = [
  { label: "1人", value: 1 },
  { label: "2人", value: 2 },
  { label: "3〜4人", value: 4 },
  { label: "5人以上", value: 5 },
]

const BUDGET_OPTIONS: Option[] = [
  { label: "5万円以下", value: 50000 },
  { label: "10万円以下", value: 100000 },
  { label: "15万円以下", value: 150000 },
  { label: "こだわらない", value: 9999999 },
]

const PURPOSE_OPTIONS: Option[] = [
  { label: "温泉", value: "onsen" },
  { label: "グルメ", value: "gourmet" },
  { label: "アクティビティ", value: "activity" },
  { label: "おまかせ", value: "all" },
]

// プランカード
function PlanCard({ plan, blurred }: { plan: Plan; blurred: boolean }) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "#fff",
        boxShadow: "0 2px 16px rgba(0,0,0,0.10)",
        filter: blurred ? "blur(4px)" : "none",
        pointerEvents: blurred ? "none" : "auto",
        userSelect: blurred ? "none" : "auto",
      }}
    >
      <img src={plan.image} alt={plan.title} className="w-full object-cover" style={{ height: 160 }} />
      <div className="p-3">
        <p className="font-bold text-sm mb-1" style={{ color: "#1a1a1a" }}>{plan.title}</p>
        <p className="text-xs text-gray-500 leading-relaxed mb-2">{plan.description}</p>
        <p className="text-xs font-bold mb-2" style={{ color: "#1B6FE4" }}>{plan.price}</p>
        <a
          href={plan.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center font-bold text-white text-xs py-2.5 rounded-xl"
          style={{ background: "#1B6FE4" }}
        >
          詳細を見る →
        </a>
      </div>
    </div>
  )
}

// プラン一覧（友だち判定あり）
function PlanResults({
  plans,
  alternatives,
  isFriend,
}: {
  plans: Plan[]
  alternatives: Alternative[]
  isFriend: boolean
}) {
  const visiblePlans = isFriend ? plans : plans.slice(0, 1)
  const hiddenPlans = isFriend ? [] : plans.slice(1)

  return (
    <div className="space-y-3 mt-2">
      {visiblePlans.map(plan => (
        <PlanCard key={plan.id} plan={plan} blurred={false} />
      ))}

      {hiddenPlans.length > 0 && (
        <div className="relative">
          {hiddenPlans.map(plan => (
            <div key={plan.id} className="mb-3">
              <PlanCard plan={plan} blurred={true} />
            </div>
          ))}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl"
            style={{ background: "rgba(255,255,255,0.75)" }}
          >
            <p className="font-black text-sm mb-3 text-center px-4" style={{ color: "#1a1a1a" }}>
              残り{hiddenPlans.length}件のプランを見るには<br />LINE友だち追加が必要です
            </p>
            <a
              href={LINE_ADD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-bold text-white text-sm px-5 py-3 rounded-xl"
              style={{ background: "#06C755" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C6.477 2 2 6.145 2 11.243c0 3.06 1.617 5.772 4.145 7.536V22l3.769-2.073A11.3 11.3 0 0 0 12 20.486c5.523 0 10-4.145 10-9.243C22 6.145 17.523 2 12 2z" />
              </svg>
              友だち追加して全部見る
            </a>
          </div>
        </div>
      )}

      {/* 代替案セクション */}
      {alternatives.length > 0 && (
        <div
          className="rounded-2xl p-4 mt-2"
          style={{ background: "#EEF8FF", border: "1.5px solid #d0e8ff" }}
        >
          <p className="font-black text-sm mb-3" style={{ color: "#1B6FE4" }}>
            💡 日数を変えるとこんな場所も行けます
          </p>
          <div className="space-y-2">
            {alternatives.map((alt, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-xl px-3 py-2.5"
                style={{ background: "#fff" }}
              >
                <div>
                  <p className="font-bold text-sm" style={{ color: "#1a1a1a" }}>{alt.dest}</p>
                  <p className="text-xs text-gray-400">{alt.days} / {alt.plan.price}</p>
                </div>
                <a
                  href={alt.plan.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold px-3 py-1.5 rounded-lg"
                  style={{ background: "#1B6FE4", color: "#fff" }}
                >
                  見る →
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// メッセージバブル
function MessageBubble({
  msg,
  isActive,
  isFriend,
  onOption,
}: {
  msg: ChatMessage
  isActive: boolean
  isFriend: boolean
  onOption: (step: Step, label: string, value: string | number) => void
}) {
  return (
    <div className={`flex ${msg.isUser ? "justify-end" : "justify-start"} gap-2`}>
      {!msg.isUser && (
        <div
          className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-black mt-1"
          style={{ background: "#1B6FE4", fontFamily: "Oswald, sans-serif" }}
        >
          LGO
        </div>
      )}
      <div className="max-w-[80%]">
        <div
          className="px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
          style={
            msg.isUser
              ? { background: "#1B6FE4", color: "#fff", borderBottomRightRadius: 4 }
              : { background: "#fff", color: "#1a1a1a", borderBottomLeftRadius: 4, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }
          }
        >
          {msg.text}
        </div>

        {msg.options && (
          <div className="flex flex-wrap gap-2 mt-2">
            {msg.options.map(opt => (
              <button
                key={opt.label}
                disabled={!isActive}
                onClick={() => msg.step && onOption(msg.step, opt.label, opt.value)}
                className="px-3 py-1.5 rounded-full text-xs font-bold transition-all"
                style={
                  isActive
                    ? { background: "#EEF8FF", color: "#1B6FE4", border: "1.5px solid #1B6FE4", cursor: "pointer" }
                    : { background: "#f3f4f6", color: "#9ca3af", border: "1.5px solid #e5e7eb", cursor: "default" }
                }
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {msg.plans && (
          <PlanResults
            plans={msg.plans}
            alternatives={msg.alternatives ?? []}
            isFriend={isFriend}
          />
        )}
      </div>
    </div>
  )
}

export default function ChatPage() {
  const [liffStatus, setLiffStatus] = useState<"loading" | "ready">("loading")
  const [isFriend, setIsFriend] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [currentStep, setCurrentStep] = useState<Step>("days")
  const [answers, setAnswers] = useState<Record<string, string | number>>({})
  const bottomRef = useRef<HTMLDivElement>(null)
  const msgIdRef = useRef(0)

  const addMessage = useCallback((msg: Omit<ChatMessage, "id">) => {
    const id = String(++msgIdRef.current)
    setMessages(prev => [...prev, { id, ...msg }])
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // LIFF初期化
  useEffect(() => {
    liff
      .init({ liffId: LIFF_ID })
      .then(async () => {
        let friend = false
        if (liff.isLoggedIn()) {
          try {
            const result = await liff.getFriendship()
            friend = result.friendFlag
          } catch {
            friend = false
          }
        } else if (liff.isInClient()) {
          liff.login()
          return
        }
        setIsFriend(friend)
        setLiffStatus("ready")
      })
      .catch(() => {
        setLiffStatus("ready")
      })
  }, [])

  // チャット開始
  useEffect(() => {
    if (liffStatus !== "ready") return
    const t1 = setTimeout(() => {
      addMessage({ text: "こんにちは！旅行の条件を教えていただければ、おすすめのプランを提案します！", isUser: false })
    }, 300)
    const t2 = setTimeout(() => {
      addMessage({ text: "まず、旅行の日数を教えてください。", isUser: false, step: "days", options: DAYS_OPTIONS })
    }, 900)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [liffStatus, addMessage])

  const handleOption = useCallback(
    (step: Step, label: string, value: string | number) => {
      addMessage({ text: label, isUser: true })
      const newAnswers = { ...answers, [step]: value }
      setAnswers(newAnswers)

      if (step === "days") {
        const dests = getDestsByDays(value as string)
        setTimeout(() => {
          if (dests.length === 0) {
            addMessage({ text: "申し訳ありません。その日数で対応できるプランが見つかりませんでした。", isUser: false })
            setTimeout(() => {
              addMessage({ text: "別の日数を選んでみてください。", isUser: false, step: "days", options: DAYS_OPTIONS })
              setCurrentStep("days")
            }, 600)
          } else {
            const destOptions: Option[] = dests.map(d => ({ label: d, value: d }))
            setCurrentStep("dest")
            addMessage({ text: "その日数で行けるのはこちらです。行き先を選んでください！", isUser: false, step: "dest", options: destOptions })
          }
        }, 600)

      } else if (step === "dest") {
        setTimeout(() => {
          setCurrentStep("people")
          addMessage({ text: "何名でのご旅行ですか？", isUser: false, step: "people", options: PEOPLE_OPTIONS })
        }, 600)

      } else if (step === "people") {
        setTimeout(() => {
          setCurrentStep("budget")
          addMessage({ text: "一人当たりのご予算はどのくらいですか？", isUser: false, step: "budget", options: BUDGET_OPTIONS })
        }, 600)

      } else if (step === "budget") {
        setTimeout(() => {
          setCurrentStep("purpose")
          addMessage({ text: "旅行の主な目的を教えてください！", isUser: false, step: "purpose", options: PURPOSE_OPTIONS })
        }, 600)

      } else if (step === "purpose") {
        setCurrentStep("result")
        setTimeout(() => {
          addMessage({ text: "条件に合うプランを探しています...", isUser: false })
        }, 600)
        setTimeout(() => {
          const days = newAnswers.days as string
          const dest = newAnswers.dest as string
          const budget = newAnswers.budget as number
          const purpose = value as string
          const matched = filterPlans(days, dest, budget, purpose)
          const alts = getAlternatives(days, dest, budget, purpose)

          if (matched.length > 0) {
            addMessage({ text: "おすすめのプランが見つかりました！", isUser: false, plans: matched, alternatives: alts })
          } else {
            addMessage({ text: "申し訳ありません。ご希望の条件に合うプランが見つかりませんでした。", isUser: false })
            if (alts.length > 0) {
              addMessage({ text: "ただ、条件を少し変えるとこんな選択肢があります。", isUser: false, plans: [], alternatives: alts })
            }
            setTimeout(() => {
              addMessage({ text: "もう一度試しますか？", isUser: false, step: "done", options: [{ label: "最初からやり直す", value: "restart" }] })
              setCurrentStep("done")
            }, 600)
          }
        }, 1600)

      } else if (step === "done" && value === "restart") {
        setMessages([])
        setAnswers({})
        setTimeout(() => {
          addMessage({ text: "もう一度日数を選んでください。", isUser: false, step: "days", options: DAYS_OPTIONS })
          setCurrentStep("days")
        }, 300)
      }
    },
    [answers, addMessage]
  )

  if (liffStatus === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#f0f4f8" }}>
        <div className="text-center">
          <div
            className="w-8 h-8 border-2 rounded-full animate-spin mx-auto mb-3"
            style={{ borderColor: "#1B6FE4", borderTopColor: "transparent" }}
          />
          <p className="text-sm text-gray-500">読み込み中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#f0f4f8" }}>
      {/* ヘッダー */}
      <header className="sticky top-0 z-10 px-4 py-3 flex items-center gap-3" style={{ background: "#1B6FE4" }}>
        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
          <span className="text-white text-xs font-black" style={{ fontFamily: "Oswald, sans-serif" }}>LGO</span>
        </div>
        <div>
          <p className="text-white font-bold text-sm">LGO旅行</p>
          <p className="text-white/70 text-xs">プラン相談</p>
        </div>
      </header>

      {/* メッセージエリア */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-8">
        {messages.map(msg => (
          <MessageBubble
            key={msg.id}
            msg={msg}
            isActive={msg.step === currentStep}
            isFriend={isFriend}
            onOption={handleOption}
          />
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
