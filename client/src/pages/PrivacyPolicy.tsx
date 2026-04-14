import { PageLayout } from "@/components/Layout";

export default function PrivacyPolicy() {
  return (
    <PageLayout>
      <div className="container py-12 max-w-2xl">
        <h1 className="text-2xl font-bold mb-8" style={{ fontFamily: "Noto Sans JP, sans-serif" }}>
          プライバシーポリシー
        </h1>

        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          LGO運営事務局（以下「当事務局」）は、ユーザーの個人情報の取り扱いについて、以下の通りプライバシーポリシーを定めます。
        </p>

        <section className="mb-8">
          <h2 className="text-base font-bold mb-3">収集する情報</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-2">
            当サービスでは、LINEアンケートへの回答時に以下の情報を収集します。
          </p>
          <ul className="text-sm text-muted-foreground space-y-1 pl-4">
            <li>・日程・予算・希望条件等のアンケート回答内容</li>
            <li>・LINEのユーザーID（プラン提案の返信に使用）</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-base font-bold mb-3">利用目的</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            収集した情報は、合宿・旅行プランの生成および提案のみに使用します。
            第三者への販売・提供は行いません。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-base font-bold mb-3">第三者提供</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            法令に基づく場合を除き、ユーザーの同意なく第三者に個人情報を提供することはありません。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-base font-bold mb-3">Cookieの使用</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            当サイトでは、アクセス解析のためCookieを使用する場合があります。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-base font-bold mb-3">お問い合わせ</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <a href="mailto:stuff@lgoofficial.com" className="text-primary hover:underline">
              stuff@lgoofficial.com
            </a>
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-base font-bold mb-3">運営者</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">LGO運営事務局</p>
        </section>

        <p className="text-xs text-muted-foreground">制定日：2026年4月</p>
      </div>
    </PageLayout>
  );
}
