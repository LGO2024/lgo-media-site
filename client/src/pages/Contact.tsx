import { PageLayout } from "@/components/Layout";

export default function Contact() {
  return (
    <PageLayout>
      <div className="container py-12 max-w-2xl">
        <h1 className="text-2xl font-bold mb-8" style={{ fontFamily: "Noto Sans JP, sans-serif" }}>
          お問い合わせ
        </h1>

        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          ご不明な点・ご要望は以下のメールアドレスまでご連絡ください。
        </p>

        <p className="text-base font-medium mb-6">
          <a href="mailto:stuff@lgoofficial.com" className="text-primary hover:underline">
            stuff@lgoofficial.com
          </a>
        </p>

        <p className="text-xs text-muted-foreground mb-8">
          ※返信までに数日かかる場合があります。
        </p>

        <p className="text-sm text-muted-foreground">運営：LGO運営事務局</p>
      </div>
    </PageLayout>
  );
}
