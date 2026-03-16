// LGO サイト共通データ定義
// Design: Japanese Editorial × Digital-Native

export const LINE_URL = "https://lin.ee/Y6CJmpm";
export const LINE_FALLBACK_URL = "https://line.me/R/ti/p/@006knvig";
export const LINE_GATEWAY_PATH = "/line";

export interface Plan {
  id: string;
  rank: number;
  title: string;
  area: string;
  prefecture: string;
  category: string[];
  priceFrom: number;
  nights: number;
  capacity: string;
  image: string;
  tags: string[];
  description: string;
  highlights: string[];
  access: string;
  facilities: string[];
  reviewCount: number;
  reviewScore: number;
  testimonial: { name: string; text: string };
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
  publishedAt: string;
  image: string;
  popular?: boolean;
}

export const plans: Plan[] = [
  {
    id: "izu-onsen-bbq",
    rank: 1,
    title: "【温泉×BBQ】伊豆の貸切山荘プラン",
    area: "関東",
    prefecture: "静岡・伊豆",
    category: ["温泉", "BBQ", "サークル向け"],
    priceFrom: 12000,
    nights: 1,
    capacity: "10〜50名",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663417360493/HXRp3nYZJWbpernLJpyuSV/lgo-plan-bbq-C83gpiKqqxKVg6g4TWaYmg.webp",
    tags: ["温泉", "BBQ", "貸切", "山荘"],
    description: "源泉掛け流しの温泉と、山の空気の中で楽しむ本格BBQが魅力の人気プラン。サークルの合宿に最適な貸切スペースが充実しています。",
    highlights: [
      "源泉掛け流し温泉が24時間利用可能",
      "持ち込みOKの広々BBQデッキ完備",
      "最寄駅から無料送迎バスあり",
      "大広間での宴会・レクリエーション対応",
    ],
    access: "東京駅から新幹線＋在来線で約90分",
    facilities: ["温泉", "BBQ設備", "大広間", "カラオケ", "Wi-Fi", "駐車場"],
    reviewCount: 142,
    reviewScore: 4.7,
    testimonial: {
      name: "〇〇大学 テニスサークル幹事 田中さん",
      text: "LGO旅チェックに相談したら、予算内でこんなに良い宿を見つけてくれるとは思いませんでした。来年も絶対使います！",
    },
  },
  {
    id: "nikko-nature",
    rank: 2,
    title: "【自然×アクティビティ】日光ゼミ合宿プラン",
    area: "関東",
    prefecture: "栃木・日光",
    category: ["自然", "アクティビティ", "ゼミ向け"],
    priceFrom: 9800,
    nights: 2,
    capacity: "20〜80名",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    tags: ["自然", "ハイキング", "ゼミ", "2泊3日"],
    description: "日光の大自然に囲まれた研修施設。集中できる会議室と、オフタイムのアクティビティを両立できるゼミ合宿の定番スポットです。",
    highlights: [
      "プロジェクター完備の会議室が複数",
      "ハイキング・カヤックなどアクティビティ豊富",
      "3食付きプランで幹事の手間ゼロ",
      "最大80名まで収容可能",
    ],
    access: "新宿から特急で約2時間",
    facilities: ["会議室", "プロジェクター", "食堂", "Wi-Fi", "体育館", "グラウンド"],
    reviewCount: 98,
    reviewScore: 4.5,
    testimonial: {
      name: "〇〇大学 経済学部ゼミ 鈴木さん",
      text: "ゼミ合宿に最適な環境でした。勉強もできて、夜は温泉でリフレッシュ。最高の思い出になりました。",
    },
  },
  {
    id: "okinawa-beach",
    rank: 3,
    title: "【沖縄×ビーチ】サークル旅行最強プラン",
    area: "九州・沖縄",
    prefecture: "沖縄",
    category: ["ビーチ", "リゾート", "サークル向け"],
    priceFrom: 28000,
    nights: 2,
    capacity: "10〜30名",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663417360493/HXRp3nYZJWbpernLJpyuSV/lgo-plan-beach-KVBsznH9EyG3hafD93xx8z.webp",
    tags: ["沖縄", "ビーチ", "リゾート", "マリンスポーツ"],
    description: "透き通る海と白い砂浜が広がる沖縄リゾートプラン。シュノーケリングやSUPなどマリンスポーツも充実。一生の思い出になる旅行を。",
    highlights: [
      "プライベートビーチ付きリゾートホテル",
      "シュノーケリング・SUP体験込み",
      "那覇空港から送迎バスあり",
      "夕食はビーチBBQ",
    ],
    access: "那覇空港から送迎バスで約60分",
    facilities: ["プライベートビーチ", "プール", "レストラン", "マリンスポーツ設備", "Wi-Fi"],
    reviewCount: 67,
    reviewScore: 4.9,
    testimonial: {
      name: "〇〇大学 バスケサークル 山田さん",
      text: "沖縄旅行なんて予算的に無理だと思ってたけど、LGO旅チェックのおかげで実現できました！みんな大喜びでした。",
    },
  },
  {
    id: "hakone-luxury",
    rank: 4,
    title: "【箱根×旅館】少人数グループ贅沢プラン",
    area: "関東",
    prefecture: "神奈川・箱根",
    category: ["温泉", "旅館", "少人数向け"],
    priceFrom: 18000,
    nights: 1,
    capacity: "5〜20名",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663417360493/HXRp3nYZJWbpernLJpyuSV/lgo-plan-onsen-4Ma8KqUbgEyjN79bm3yMUB.webp",
    tags: ["箱根", "旅館", "温泉", "少人数"],
    description: "富士山を望む絶景の箱根旅館。少人数のグループ旅行に最適な、ちょっと贅沢な旅を演出します。",
    highlights: [
      "富士山ビューの露天風呂",
      "会席料理フルコース付き",
      "新宿からロマンスカーで約90分",
      "少人数でも貸切対応可",
    ],
    access: "新宿からロマンスカーで約90分",
    facilities: ["露天風呂", "大浴場", "レストラン", "ラウンジ", "Wi-Fi"],
    reviewCount: 54,
    reviewScore: 4.8,
    testimonial: {
      name: "〇〇大学 ゼミ OB会 佐藤さん",
      text: "卒業旅行に使いました。最高の思い出になりました。LGO旅チェックのAI提案がなければ見つけられなかった宿です。",
    },
  },
  {
    id: "kyoto-culture",
    rank: 5,
    title: "【京都×文化体験】ゼミ・研究室合宿プラン",
    area: "関西",
    prefecture: "京都",
    category: ["文化", "研修", "ゼミ向け"],
    priceFrom: 14000,
    nights: 2,
    capacity: "15〜60名",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
    tags: ["京都", "文化体験", "研修", "ゼミ"],
    description: "古都京都で文化と学びを融合させた合宿プラン。茶道・座禅体験から研究発表まで、充実した合宿を実現します。",
    highlights: [
      "茶道・座禅体験オプション付き",
      "研究発表対応の会議設備完備",
      "京都の老舗旅館に宿泊",
      "観光スポットへのアクセス抜群",
    ],
    access: "京都駅から送迎バスで約20分",
    facilities: ["会議室", "プロジェクター", "大浴場", "食堂", "Wi-Fi", "駐車場"],
    reviewCount: 89,
    reviewScore: 4.6,
    testimonial: {
      name: "〇〇大学 文学部ゼミ 伊藤さん",
      text: "京都の雰囲気の中でゼミ合宿ができて、研究のモチベーションが上がりました。",
    },
  },
];

export const articles: Article[] = [
  {
    id: "kanjicho-todo",
    title: "【幹事初心者必見】合宿の準備、何から始める？やることリスト完全版",
    excerpt: "合宿の幹事に初めてなった方向けに、準備開始から当日まで、やることを時系列で完全網羅。これを見れば迷わない！",
    category: "幹事ガイド",
    readTime: 8,
    publishedAt: "2026-03-01",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663417360493/HXRp3nYZJWbpernLJpyuSV/lgo-article-hero-KECx4x4jKJ2HZ4vkKuK8gC.webp",
    popular: true,
  },
  {
    id: "budget-guide",
    title: "【保存版】大学生の合宿・サークル旅行の予算相場は？費用内訳と節約術",
    excerpt: "1人あたりいくらかかる？交通費・宿泊費・食費の内訳と、予算を抑えるための具体的な5つの方法を解説。",
    category: "費用・予算",
    readTime: 6,
    publishedAt: "2026-02-20",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    popular: true,
  },
  {
    id: "ai-yado-search",
    title: "もう見積もりで消耗しない。合宿の宿探しをAIで劇的に効率化する方法",
    excerpt: "複数の宿に問い合わせ、返信を待ち、比較する…その手間、全部AIに任せてみませんか？最新のAI活用術を紹介。",
    category: "AI活用",
    readTime: 5,
    publishedAt: "2026-02-15",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
  },
  {
    id: "zemi-gasshuku",
    title: "【ゼミ合宿向け】集中できる環境が大事！宿選びのポイント7選",
    excerpt: "発表練習、ディスカッション、懇親会…ゼミ合宿に必要な設備と環境を徹底解説。失敗しない宿選びの基準とは。",
    category: "ゼミ向け",
    readTime: 7,
    publishedAt: "2026-02-10",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
  },
  {
    id: "best-kanjicho",
    title: "「あの合宿、最高だったな」と言われる幹事になるための全手順",
    excerpt: "企画から当日の進行まで、参加者全員に喜ばれる合宿を作るための幹事の心得とチェックリストを公開。",
    category: "幹事ガイド",
    readTime: 10,
    publishedAt: "2026-01-28",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    popular: true,
  },
];
