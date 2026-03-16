// LGO旅チェック LINE Gateway Page
// Design: Japanese Editorial × Digital-Native
// Purpose: absorb LINE link failures by offering multiple recovery paths.

import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { ExternalLink, MessageCircle, RefreshCw, Smartphone, QrCode, ChevronLeft } from "lucide-react";
import { LINE_FALLBACK_URL, LINE_URL } from "@/lib/data";

export default function LineGateway() {
  const [countdown, setCountdown] = useState(4);

  const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
  const isMobile = /iPhone|Android.+Mobile|Mobile/.test(ua);

  const primaryUrl = useMemo(() => (isMobile ? LINE_URL : LINE_FALLBACK_URL), [isMobile]);

  useEffect(() => {
    const tick = window.setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          window.clearInterval(tick);
          window.location.href = primaryUrl;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(tick);
  }, [primaryUrl]);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,oklch(0.98_0.01_210),white)] text-foreground">
      <div className="container max-w-5xl py-6 md:py-10">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-[oklch(0.35_0.08_240)] no-underline hover:opacity-70">
          <ChevronLeft size={16} /> サイトに戻る
        </Link>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <section className="rounded-[2rem] bg-white shadow-[0_24px_70px_rgba(11,36,61,0.10)] border border-white/70 p-6 md:p-10">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold text-white" style={{ background: "oklch(0.72 0.15 210)" }}>
              <MessageCircle size={14} /> LGO旅チェック LINE案内
            </div>
            <h1 className="mt-5 text-3xl md:text-5xl font-black tracking-tight text-[oklch(0.22_0.06_250)]" style={{ fontFamily: "Oswald, Noto Sans JP, sans-serif" }}>
              LINE追加でエラーが出る場合でも、
              <br />
              ここから進めます。
            </h1>
            <p className="mt-5 text-base md:text-lg leading-8 text-[oklch(0.40_0.03_240)]">
              お使いのブラウザやアプリ内表示では、LINEの友だち追加リンクがそのまま開かないことがあります。
              このページでは、通常遷移に加えて、別形式のリンクとQR案内を用意しています。
            </p>

            <div className="mt-8 rounded-[1.5rem] border border-[oklch(0.90_0.01_210)] bg-[oklch(0.98_0.01_210)] p-5 md:p-6">
              <p className="text-sm font-bold text-[oklch(0.22_0.06_250)]">自動でLINEへ移動します</p>
              <p className="mt-2 text-sm leading-7 text-[oklch(0.45_0.03_240)]">
                {countdown > 0
                  ? `${countdown}秒後に最適なリンク形式でLINEを開きます。うまく開かない場合は下のボタンをお使いください。`
                  : "自動遷移を開始しました。ページが切り替わらない場合は下のボタンを押してください。"}
              </p>
            </div>

            <div className="mt-6 grid gap-3">
              <a
                href={primaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-4 text-base font-bold text-white no-underline transition hover:opacity-90"
                style={{ background: "oklch(0.72 0.15 210)", boxShadow: "0 14px 36px oklch(0.72 0.15 210 / 0.28)" }}
              >
                <MessageCircle size={18} /> そのままLINEを開く
              </a>
              <a
                href={LINE_FALLBACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[oklch(0.85_0.02_210)] bg-white px-5 py-4 text-base font-bold text-[oklch(0.22_0.06_250)] no-underline transition hover:bg-[oklch(0.98_0.01_210)]"
              >
                <ExternalLink size={18} /> 別形式のLINEリンクを試す
              </a>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-transparent bg-[oklch(0.95_0.01_210)] px-5 py-4 text-base font-bold text-[oklch(0.22_0.06_250)] transition hover:bg-[oklch(0.92_0.02_210)]"
              >
                <RefreshCw size={18} /> もう一度試す
              </button>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[2rem] bg-[oklch(0.22_0.06_250)] text-white p-6 md:p-8 shadow-[0_18px_48px_rgba(11,36,61,0.22)]">
              <div className="flex items-center gap-2 text-sm font-bold text-white/85">
                <Smartphone size={16} /> うまく開かないときの順番
              </div>
              <div className="mt-5 space-y-4 text-sm leading-7 text-white/78">
                <p><strong className="text-white">1.</strong> まずは「そのままLINEを開く」を押してください。</p>
                <p><strong className="text-white">2.</strong> 開かない場合は「別形式のLINEリンク」をお試しください。</p>
                <p><strong className="text-white">3.</strong> アプリ内ブラウザで失敗する場合は、Safari / Chrome で開き直すと安定しやすいです。</p>
              </div>
            </div>

            <div className="rounded-[2rem] bg-white border border-[oklch(0.90_0.01_210)] p-6 md:p-8 shadow-[0_18px_48px_rgba(11,36,61,0.08)]">
              <div className="flex items-center gap-2 text-sm font-bold text-[oklch(0.22_0.06_250)]">
                <QrCode size={16} /> QRで追加したい場合
              </div>
              <p className="mt-4 text-sm leading-7 text-[oklch(0.45_0.03_240)]">
                PCで見ている場合は、スマホのLINEアプリから友だち追加画面を開き、公式アカウントのQRコードを読み取る方法も有効です。
                必要であれば次に、サイト内へLGO旅チェック専用のQR表示も追加できます。
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
