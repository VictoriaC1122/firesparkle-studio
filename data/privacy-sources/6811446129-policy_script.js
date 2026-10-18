const SUPPORT_EMAIL = "victoriacheng1122@gmail.com";
const SUPPORT_URL = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Perfect Pig Support")}`;

const COPY = {
  "zh-Hant": {
    pageTitle: "完美養豬｜隱私權與支援",
    metaDescription: "《完美養豬》官方隱私權政策、版權聲明與開發者聯絡資訊。",
    brandTitle: "完美養豬 Legal Center",
    languageLabel: "選擇語言",
    officialLabel: "Official legal & support",
    heroTitle: "讓每一次陪伴，都安心又透明。",
    heroLead: "這裡提供《完美養豬》的隱私權政策、版權聲明與官方聯絡方式。",
    currentDocumentLabel: "CURRENT DOCUMENT",
    documentSwitchLabel: "Document switch",
    switcherTitle: "同一個網址，查閱完整官方文件。",
    switcherNote: "適用於 App Store Privacy Policy 與 Support URL",
    contactTitle: "聯繫開發者",
    contactBody: `如有隱私、版權、購買或遊戲問題，請直接寄信至 ${SUPPORT_EMAIL}。`,
    contactAction: "寄信聯繫開發者",
    contactNote: "來信請勿附上完整付款資料、Apple ID 密碼或其他敏感資訊。",
    appName: "完美養豬",
    appMeta: ["平台：iPhone / iPad / Mac Catalyst", "類型：療癒養成 / 收藏遊戲", "語言：繁中 / 簡中 / English / 日本語"],
    footer: "© 2026 VictoriaC1122. All rights reserved.",
    tabs: { privacy: "隱私權政策", copyright: "版權聲明" },
    privacy: {
      englishTitle: "Privacy Policy",
      title: "隱私權政策",
      updated: "最後更新日期：2026 年 9 月 13 日",
      sections: [
        {
          title: "1. 適用範圍",
          paragraphs: ["本政策適用於《完美養豬》iPhone、iPad 與 Mac Catalyst App，以及本官方法律與支援網站。"],
        },
        {
          title: "2. App 內處理的資料",
          paragraphs: ["為了保存遊戲體驗，App 會在你的裝置上處理以下資料："],
          items: [
            "小豬名稱、性別與選填的體重設定。",
            "養成進度、互動紀錄、聊天紀錄、圖鑑收藏、任務與活動狀態。",
            "金幣、寶石、已解鎖內容及其他遊戲設定。",
            "通知授權狀態與本機提醒設定。",
            "若裝置已啟用 iCloud，永久解鎖項目的識別碼會透過 Apple iCloud Key-Value Storage 同步，以協助重新安裝或更換裝置後恢復內容。",
          ],
        },
        {
          title: "3. 資料使用與分享",
          paragraphs: ["上述遊戲資料用於恢復進度、顯示個人化內容及維持遊戲規則。App 目前不要求建立帳號，也不使用第三方廣告、跨 App 追蹤或分析 SDK；資料不會傳送到開發者伺服器或出售給第三方。若 iCloud 可用，App 僅透過 Apple 的服務同步永久解鎖識別碼。App 也會向 Apple 公開 HTTPS 端點發出不含帳號、聊天內容或遊戲檔案的輕量請求，以取得伺服器時間並防止裝置日期異常影響遊戲進度。"],
        },
        {
          title: "4. 通知",
          paragraphs: ["每日照顧提醒由 iOS 在裝置上排程。只有在你主動同意後才會啟用；App 不會取得遠端推播 token。你可以隨時在 App 或系統設定中關閉通知。"],
        },
        {
          title: "5. App 內購買",
          paragraphs: ["寶石商品透過 Apple App Store 與 StoreKit 處理。Apple 負責付款、退款與交易紀錄；開發者無法取得你的信用卡號、Apple ID 密碼或完整付款資料。App 僅使用 Apple 提供的商品與交易狀態來交付已購內容並避免重複發放。"],
        },
        {
          title: "6. 保存、刪除與安全性",
          paragraphs: ["遊戲進度與消耗型寶石餘額主要儲存在你的裝置上。刪除 App 會移除本機資料，且完整進度與未使用寶石可能無法復原；若 iCloud 可用，永久解鎖項目可能在重新安裝後恢復。Apple 保存的購買紀錄則依其政策管理。聯繫支援時，請勿在信件中附上完整付款資訊、Apple ID 密碼或其他敏感資料。"],
        },
        {
          title: "7. 網站與第三方服務",
          paragraphs: ["本網站由 GitHub Pages 託管，並使用 Google Fonts。造訪網站時，服務供應商可能依其政策處理 IP 位址、瀏覽器類型與基本連線紀錄。使用第三方服務時，將適用該服務的隱私政策。"],
        },
        {
          title: "8. 兒童、政策更新與聯絡",
          paragraphs: ["App 不會刻意蒐集兒童的個人資料。未成年人應由家長或監護人管理裝置與內購權限。本政策若有重大變更，會更新本頁日期與內容；如有問題，請使用本頁的開發者支援入口。"],
        },
      ],
    },
    copyright: {
      englishTitle: "Copyright Notice",
      title: "版權聲明",
      updated: "最後更新日期：2026 年 9 月 13 日",
      sections: [
        {
          title: "1. 著作權歸屬",
          paragraphs: ["《完美養豬》的角色設定、遊戲內容、介面、文字、插圖、圖示、動畫、程式碼及相關素材，除另有標示外，均由 VictoriaC1122 或合法授權人保留權利。"],
        },
        {
          title: "2. 允許的個人使用",
          paragraphs: ["玩家可以為個人、非商業用途分享自己的遊戲截圖或遊玩心得，並應避免暗示該內容為官方發布或合作內容。"],
        },
        {
          title: "3. 使用限制",
          items: ["不得未經授權重製、販售、散布、改作或公開提供遊戲素材。", "不得擷取角色、圖示或介面資源製作商業商品、其他 App 或生成式資料集。", "不得冒用官方名稱、帳號、商標或合作關係。"],
        },
        {
          title: "4. 第三方權利",
          paragraphs: ["Apple、App Store、iPhone、iPad、Mac、SF Symbols 及其他第三方名稱與素材，權利屬各自權利人，並依其條款使用。"],
        },
        {
          title: "5. 權利通報",
          paragraphs: ["若你認為 App 或網站內容侵害你的權利，請透過支援入口提供權利人資訊、具體內容位置、權利依據與可聯絡方式，我們會在合理範圍內審查。"],
        },
      ],
    },
  },

  "zh-Hans": {
    pageTitle: "完美养猪｜隐私与支持",
    metaDescription: "《完美养猪》官方隐私政策、版权声明与开发者联系方式。",
    brandTitle: "完美养猪 Legal Center",
    languageLabel: "选择语言",
    officialLabel: "Official legal & support",
    heroTitle: "让每一次陪伴，都安心又透明。",
    heroLead: "这里提供《完美养猪》的隐私政策、版权声明与官方联系方式。",
    currentDocumentLabel: "CURRENT DOCUMENT",
    documentSwitchLabel: "Document switch",
    switcherTitle: "同一个网址，查阅完整官方文件。",
    switcherNote: "适用于 App Store Privacy Policy 与 Support URL",
    contactTitle: "联系开发者",
    contactBody: `如有隐私、版权、购买或游戏问题，请直接发送邮件至 ${SUPPORT_EMAIL}。`,
    contactAction: "发送邮件联系开发者",
    contactNote: "邮件中请勿附上完整付款资料、Apple ID 密码或其他敏感信息。",
    appName: "完美养猪",
    appMeta: ["平台：iPhone / iPad / Mac Catalyst", "类型：治愈养成 / 收藏游戏", "语言：繁中 / 简中 / English / 日本語"],
    footer: "© 2026 VictoriaC1122. All rights reserved.",
    tabs: { privacy: "隐私政策", copyright: "版权声明" },
    privacy: {
      englishTitle: "Privacy Policy",
      title: "隐私政策",
      updated: "最后更新日期：2026 年 9 月 13 日",
      sections: [
        { title: "1. 适用范围", paragraphs: ["本政策适用于《完美养猪》iPhone、iPad 与 Mac Catalyst App，以及本官方法律与支持网站。"] },
        {
          title: "2. App 内处理的数据",
          paragraphs: ["为了保存游戏体验，App 会在你的设备上处理以下数据："],
          items: ["小猪名称、性别与选填的体重设置。", "养成进度、互动记录、聊天记录、图鉴收藏、任务与活动状态。", "金币、宝石、已解锁内容及其他游戏设置。", "通知授权状态与本地提醒设置。", "若设备已启用 iCloud，永久解锁项目的标识符会通过 Apple iCloud Key-Value Storage 同步，以帮助在重新安装或更换设备后恢复内容。"],
        },
        { title: "3. 数据使用与分享", paragraphs: ["上述游戏数据用于恢复进度、显示个性化内容及维持游戏规则。App 目前不要求创建账户，也不使用第三方广告、跨 App 跟踪或分析 SDK；数据不会传送到开发者服务器或出售给第三方。若 iCloud 可用，App 仅通过 Apple 的服务同步永久解锁标识符。App 也会向 Apple 的公开 HTTPS 端点发送不含账户、聊天内容或游戏存档的轻量请求，以取得服务器时间并防止设备日期异常影响游戏进度。"] },
        { title: "4. 通知", paragraphs: ["每日照顾提醒由 iOS 在设备上排程。只有在你主动同意后才会启用；App 不会取得远程推送 token。你可以随时在 App 或系统设置中关闭通知。"] },
        { title: "5. App 内购买", paragraphs: ["宝石商品通过 Apple App Store 与 StoreKit 处理。Apple 负责付款、退款与交易记录；开发者无法取得你的信用卡号、Apple ID 密码或完整付款资料。App 仅使用 Apple 提供的商品与交易状态来交付已购内容并避免重复发放。"] },
        { title: "6. 保存、删除与安全性", paragraphs: ["游戏进度与消耗型宝石余额主要保存在你的设备上。删除 App 会移除本地数据，且完整进度与未使用宝石可能无法恢复；若 iCloud 可用，永久解锁项目可能在重新安装后恢复。Apple 保存的购买记录则依其政策管理。联系支持时，请勿在邮件中附上完整付款信息、Apple ID 密码或其他敏感数据。"] },
        { title: "7. 网站与第三方服务", paragraphs: ["本网站由 GitHub Pages 托管，并使用 Google Fonts。访问网站时，服务提供商可能依其政策处理 IP 地址、浏览器类型与基本连接记录。使用第三方服务时，将适用该服务的隐私政策。"] },
        { title: "8. 儿童、政策更新与联系", paragraphs: ["App 不会有意收集儿童的个人数据。未成年人应由家长或监护人管理设备与内购权限。本政策若有重大变更，会更新本页日期与内容；如有问题，请使用本页的开发者支持入口。"] },
      ],
    },
    copyright: {
      englishTitle: "Copyright Notice",
      title: "版权声明",
      updated: "最后更新日期：2026 年 9 月 13 日",
      sections: [
        { title: "1. 著作权归属", paragraphs: ["《完美养猪》的角色设定、游戏内容、界面、文字、插图、图标、动画、代码及相关素材，除另有标示外，均由 VictoriaC1122 或合法授权人保留权利。"] },
        { title: "2. 允许的个人使用", paragraphs: ["玩家可以为个人、非商业用途分享自己的游戏截图或游玩心得，并应避免暗示该内容为官方发布或合作内容。"] },
        { title: "3. 使用限制", items: ["不得未经授权复制、销售、传播、改作或公开提供游戏素材。", "不得提取角色、图标或界面资源制作商业商品、其他 App 或生成式数据集。", "不得冒用官方名称、账户、商标或合作关系。"] },
        { title: "4. 第三方权利", paragraphs: ["Apple、App Store、iPhone、iPad、Mac、SF Symbols 及其他第三方名称与素材，权利属于各自权利人，并依其条款使用。"] },
        { title: "5. 权利通知", paragraphs: ["若你认为 App 或网站内容侵害你的权利，请通过支持入口提供权利人信息、具体内容位置、权利依据与联系方式，我们会在合理范围内审查。"] },
      ],
    },
  },

  en: {
    pageTitle: "Perfect Pig | Privacy & Support",
    metaDescription: "Official privacy policy, copyright notice, and developer support for Perfect Pig.",
    brandTitle: "Perfect Pig Legal Center",
    languageLabel: "Choose language",
    officialLabel: "Official legal & support",
    heroTitle: "A cozy companion, with privacy made clear.",
    heroLead: "Find the official Privacy Policy, Copyright Notice, and developer support for Perfect Pig.",
    currentDocumentLabel: "CURRENT DOCUMENT",
    documentSwitchLabel: "Document switch",
    switcherTitle: "One official home for every important detail.",
    switcherNote: "For the App Store Privacy Policy and Support URL",
    contactTitle: "Contact the Developer",
    contactBody: `For privacy, copyright, purchase, or gameplay questions, email us at ${SUPPORT_EMAIL}.`,
    contactAction: "Email the Developer",
    contactNote: "Do not include complete payment details, your Apple ID password, or other sensitive information in your email.",
    appName: "Perfect Pig",
    appMeta: ["Platforms: iPhone / iPad / Mac Catalyst", "Genre: Cozy pet raising / Collection", "Languages: Traditional Chinese / Simplified Chinese / English / Japanese"],
    footer: "© 2026 VictoriaC1122. All rights reserved.",
    tabs: { privacy: "Privacy Policy", copyright: "Copyright Notice" },
    privacy: {
      englishTitle: "Privacy Policy",
      title: "Privacy Policy",
      updated: "Last updated: September 13, 2026",
      sections: [
        { title: "1. Scope", paragraphs: ["This policy applies to the Perfect Pig app for iPhone, iPad, and Mac Catalyst, as well as this official legal and support website."] },
        {
          title: "2. Data Processed in the App",
          paragraphs: ["To preserve your game experience, the app processes the following data on your device:"],
          items: ["Your pig's name, gender, and optional weight setting.", "Growth progress, interactions, chat history, card collection, tasks, and event status.", "Coins, gems, unlocked content, and other game settings.", "Notification authorization status and local reminder settings.", "When iCloud is available, identifiers for permanent unlocks are synced through Apple iCloud Key-Value Storage to help restore that content after reinstalling the app or changing devices."],
        },
        { title: "3. How Data Is Used and Shared", paragraphs: ["This game data restores progress, displays personalized content, and enforces game rules. The app currently requires no account and uses no third-party advertising, cross-app tracking, or analytics SDKs. Data is not sent to a developer server or sold to third parties. When iCloud is available, the app uses Apple's service only to sync permanent-unlock identifiers. The app also makes a lightweight request to a public Apple HTTPS endpoint to obtain server time and prevent device-date changes from affecting progress; no account data, chat content, or save file is included."] },
        { title: "4. Notifications", paragraphs: ["Daily care reminders are scheduled locally by iOS and are enabled only after you choose to allow them. The app does not obtain a remote push token. You can turn notifications off at any time in the app or in system settings."] },
        { title: "5. In-App Purchases", paragraphs: ["Gem products are processed through the Apple App Store and StoreKit. Apple handles payment, refunds, and transaction records. The developer cannot access your card number, Apple ID password, or complete payment details. The app uses only the product and transaction status supplied by Apple to deliver purchases and prevent duplicate grants."] },
        { title: "6. Retention, Deletion, and Security", paragraphs: ["Game progress and consumable gem balances are stored primarily on your device. Deleting the app removes local data, so full progress and unused gems may not be recoverable. When iCloud is available, permanent unlocks may be restored after reinstallation. Purchase records held by Apple are managed under Apple's policies. When contacting support, never include complete payment information, your Apple ID password, or other sensitive data in your email."] },
        { title: "7. Website and Third-Party Services", paragraphs: ["This website is hosted by GitHub Pages and uses Google Fonts. When you visit, those providers may process your IP address, browser type, and basic connection logs under their own policies. Third-party services are governed by their respective privacy policies."] },
        { title: "8. Children, Policy Changes, and Contact", paragraphs: ["The app does not knowingly collect children's personal data. A parent or guardian should manage device and purchase permissions for minors. Material changes will be reflected in this page and its update date. Contact us through the developer support link on this page with any questions."] },
      ],
    },
    copyright: {
      englishTitle: "Copyright Notice",
      title: "Copyright Notice",
      updated: "Last updated: September 13, 2026",
      sections: [
        { title: "1. Ownership", paragraphs: ["Unless otherwise stated, the characters, gameplay content, interface, text, illustrations, icons, animation, code, and related materials in Perfect Pig are owned or lawfully licensed by VictoriaC1122."] },
        { title: "2. Permitted Personal Use", paragraphs: ["Players may share their own gameplay screenshots and experiences for personal, non-commercial purposes, provided the post does not imply that it is an official release or partnership."] },
        { title: "3. Restrictions", items: ["Do not reproduce, sell, distribute, adapt, or publicly provide game assets without permission.", "Do not extract characters, icons, or interface assets for merchandise, another app, or a generative dataset.", "Do not impersonate the official app, accounts, trademarks, or a partnership."] },
        { title: "4. Third-Party Rights", paragraphs: ["Apple, App Store, iPhone, iPad, Mac, SF Symbols, and other third-party names and materials remain the property of their respective owners and are used under their applicable terms."] },
        { title: "5. Rights Notices", paragraphs: ["If you believe content in the app or this website infringes your rights, use the support link to provide the rights holder's information, the exact location of the content, the basis of the claim, and a way to contact you. We will review complete notices within a reasonable scope."] },
      ],
    },
  },

  ja: {
    pageTitle: "パーフェクトピッグ｜プライバシーとサポート",
    metaDescription: "『パーフェクトピッグ』の公式プライバシーポリシー、著作権表示、開発者サポート。",
    brandTitle: "パーフェクトピッグ Legal Center",
    languageLabel: "言語を選択",
    officialLabel: "Official legal & support",
    heroTitle: "安心できる毎日を、こぶたと一緒に。",
    heroLead: "『パーフェクトピッグ』のプライバシーポリシー、著作権表示、公式お問い合わせ窓口をご案内します。",
    currentDocumentLabel: "CURRENT DOCUMENT",
    documentSwitchLabel: "Document switch",
    switcherTitle: "大切な情報を、ひとつの公式ページに。",
    switcherNote: "App Store の Privacy Policy / Support URL に対応",
    contactTitle: "開発者へのお問い合わせ",
    contactBody: `プライバシー、著作権、購入、ゲームに関するご質問は、${SUPPORT_EMAIL} までメールでお問い合わせください。`,
    contactAction: "開発者にメールする",
    contactNote: "メールには、完全な支払い情報、Apple ID のパスワード、その他の機密情報を記載しないでください。",
    appName: "パーフェクトピッグ",
    appMeta: ["対応：iPhone / iPad / Mac Catalyst", "ジャンル：癒やし育成 / コレクション", "言語：繁体字中国語 / 簡体字中国語 / 英語 / 日本語"],
    footer: "© 2026 VictoriaC1122. All rights reserved.",
    tabs: { privacy: "プライバシーポリシー", copyright: "著作権表示" },
    privacy: {
      englishTitle: "Privacy Policy",
      title: "プライバシーポリシー",
      updated: "最終更新日：2026年9月13日",
      sections: [
        { title: "1. 適用範囲", paragraphs: ["本ポリシーは、iPhone、iPad、Mac Catalyst 向けアプリ『パーフェクトピッグ』および本公式リーガル・サポートサイトに適用されます。"] },
        {
          title: "2. アプリ内で処理するデータ",
          paragraphs: ["ゲーム体験を保存するため、次のデータをお使いの端末内で処理します。"],
          items: ["こぶたの名前、性別、任意で設定する体重。", "育成状況、ふれあい、チャット履歴、カードコレクション、ミッション、イベント状況。", "コイン、ジェム、解放済みコンテンツ、その他のゲーム設定。", "通知の許可状況と端末内のリマインダー設定。", "iCloud が利用可能な場合、再インストールや機種変更後の復元を助けるため、永久解放項目の識別子を Apple iCloud Key-Value Storage で同期します。"],
        },
        { title: "3. 利用目的と共有", paragraphs: ["これらのゲームデータは、進行状況の復元、内容のパーソナライズ、ゲームルールの維持に利用します。現在、アカウント登録は不要です。第三者広告、アプリをまたぐトラッキング、解析 SDK は使用しておらず、データを開発者のサーバーへ送信したり、第三者へ販売したりすることはありません。iCloud が利用可能な場合は、Apple のサービスを通じて永久解放識別子のみを同期します。また、端末の日付変更による進行への影響を防ぐため、Apple の公開 HTTPS エンドポイントへ軽量な時刻確認を行います。この通信にアカウント情報、チャット内容、セーブデータは含まれません。"] },
        { title: "4. 通知", paragraphs: ["毎日のお世話リマインダーは iOS が端末内で設定し、お客様が許可した場合にのみ有効になります。本アプリはリモートプッシュ用トークンを取得しません。通知はアプリまたはシステム設定からいつでも無効にできます。"] },
        { title: "5. アプリ内課金", paragraphs: ["ジェム商品の購入は Apple App Store と StoreKit を通じて処理されます。支払い、返金、取引履歴は Apple が管理し、開発者がお客様のカード番号、Apple ID のパスワード、完全な支払い情報を取得することはありません。本アプリは、購入内容の付与と重複付与の防止に必要な商品・取引状態のみを利用します。"] },
        { title: "6. 保存、削除、安全性", paragraphs: ["ゲームの進行状況と消費型ジェム残高は主に端末内に保存されます。アプリを削除するとローカルデータも削除され、完全な進行状況と未使用ジェムは復元できない場合があります。iCloud が利用可能な場合、永久解放項目は再インストール後に復元されることがあります。Apple が保持する購入履歴は Apple のポリシーに従って管理されます。サポートへのメールには、完全な支払い情報、Apple ID のパスワード、その他の機密情報を記載しないでください。"] },
        { title: "7. ウェブサイトと外部サービス", paragraphs: ["本サイトは GitHub Pages でホストされ、Google Fonts を利用しています。アクセス時に、各事業者がそれぞれのポリシーに基づき、IP アドレス、ブラウザの種類、基本的な接続ログを処理する場合があります。外部サービスには、それぞれのプライバシーポリシーが適用されます。"] },
        { title: "8. お子様、改定、お問い合わせ", paragraphs: ["本アプリは、お子様の個人データを意図的に収集しません。未成年者が利用する場合、保護者が端末と購入権限を管理してください。重要な変更がある場合は、本ページの内容と更新日を変更します。ご質問は本ページの開発者サポート窓口からお寄せください。"] },
      ],
    },
    copyright: {
      englishTitle: "Copyright Notice",
      title: "著作権表示",
      updated: "最終更新日：2026年9月13日",
      sections: [
        { title: "1. 権利の帰属", paragraphs: ["別途記載がある場合を除き、『パーフェクトピッグ』のキャラクター設定、ゲーム内容、インターフェース、文章、イラスト、アイコン、アニメーション、コードおよび関連素材の権利は、VictoriaC1122 または正当な権利許諾者に帰属します。"] },
        { title: "2. 個人利用について", paragraphs: ["プレイヤーは、個人的かつ非商用の範囲で、ご自身のゲーム画面やプレイ体験を共有できます。ただし、公式発表や公式提携であると誤認させる表現は避けてください。"] },
        { title: "3. 禁止事項", items: ["許可なくゲーム素材を複製、販売、配布、改変、公開すること。", "キャラクター、アイコン、UI 素材を抽出し、商品、別のアプリ、生成 AI 用データセットなどに利用すること。", "公式名称、アカウント、商標、提携関係を詐称すること。"] },
        { title: "4. 第三者の権利", paragraphs: ["Apple、App Store、iPhone、iPad、Mac、SF Symbols、その他の第三者の名称および素材は、各権利者に帰属し、それぞれの条件に従って使用されています。"] },
        { title: "5. 権利侵害のご連絡", paragraphs: ["アプリまたは本サイトの内容が権利を侵害していると思われる場合は、サポート窓口から、権利者情報、該当箇所、申立ての根拠、ご連絡先をお知らせください。必要な情報がそろったご連絡を合理的な範囲で確認します。"] },
      ],
    },
  },
};

const segments = [...document.querySelectorAll(".segment")];
const languageSelect = document.getElementById("languageSelect");
const currentDocLabel = document.getElementById("currentDocLabel");
const documentEnglishTitle = document.getElementById("documentEnglishTitle");
const documentTitle = document.getElementById("documentTitle");
const lastUpdated = document.getElementById("lastUpdated");
const documentSections = document.getElementById("documentSections");
const appMetaList = document.getElementById("appMetaList");

function normalizedLanguage(value) {
  if (COPY[value]) return value;
  const candidate = (value || "").toLowerCase();
  if (candidate.startsWith("zh-cn") || candidate.startsWith("zh-sg") || candidate.includes("hans")) return "zh-Hans";
  if (candidate.startsWith("zh")) return "zh-Hant";
  if (candidate.startsWith("ja")) return "ja";
  if (candidate.startsWith("en")) return "en";
  return "zh-Hant";
}

const query = new URLSearchParams(window.location.search);
let activeLanguage = normalizedLanguage(query.get("lang") || navigator.language);
let activeDocument = query.get("doc") === "copyright" ? "copyright" : "privacy";

function makeElement(tag, text) {
  const element = document.createElement(tag);
  element.textContent = text;
  return element;
}

function renderSections(sections) {
  const fragment = document.createDocumentFragment();
  sections.forEach((section) => {
    const container = document.createElement("section");
    container.className = "legal-section";
    container.append(makeElement("h3", section.title));

    (section.paragraphs || []).forEach((paragraph) => {
      container.append(makeElement("p", paragraph));
    });

    if (section.items) {
      const list = document.createElement("ul");
      section.items.forEach((item) => list.append(makeElement("li", item)));
      container.append(list);
    }
    fragment.append(container);
  });
  documentSections.replaceChildren(fragment);
}

function updateURL() {
  const url = new URL(window.location.href);
  url.searchParams.set("lang", activeLanguage);
  url.searchParams.set("doc", activeDocument);
  history.replaceState({ lang: activeLanguage, doc: activeDocument }, "", url);
}

function render() {
  const locale = COPY[activeLanguage];
  const documentCopy = locale[activeDocument];

  document.documentElement.lang = activeLanguage;
  document.title = locale.pageTitle;
  document.querySelector('meta[name="description"]').setAttribute("content", locale.metaDescription);
  languageSelect.value = activeLanguage;

  document.querySelectorAll("[data-copy]").forEach((element) => {
    const value = locale[element.dataset.copy];
    if (typeof value === "string") element.textContent = value;
  });

  segments.forEach((button) => {
    const key = button.dataset.panel;
    const isActive = key === activeDocument;
    button.textContent = locale.tabs[key];
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  currentDocLabel.textContent = locale.tabs[activeDocument];
  documentEnglishTitle.textContent = documentCopy.englishTitle;
  documentTitle.textContent = documentCopy.title;
  lastUpdated.textContent = documentCopy.updated;
  appMetaList.replaceChildren(...locale.appMeta.map((item) => makeElement("li", item)));
  renderSections(documentCopy.sections);
  updateURL();
}

segments.forEach((button) => {
  button.addEventListener("click", () => {
    activeDocument = button.dataset.panel;
    render();
    document.getElementById("legalPanel").focus({ preventScroll: true });
  });
});

languageSelect.addEventListener("change", (event) => {
  activeLanguage = normalizedLanguage(event.target.value);
  render();
});

document.querySelector(".primary-link").href = SUPPORT_URL;
render();
