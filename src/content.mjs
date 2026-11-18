// 花火工作室 FireSparkle.Studio — 網站文案與作品設定
// 改文案、作品分類、英文名稱或排序，都在這個檔案；改完執行 node scripts/build.mjs。

export const site = {
  url: 'https://firesparkle.com',
  nameZh: '花火工作室',
  nameEn: 'FireSparkle.Studio',
  email: 'firesparkle.studio@gmail.com',
  tagline: 'Small sparks, big ideas.',
  founded: 2026,
  // 全站與各 App 統一的版權標示（App Store Connect 的版權欄位只填「花火工作室 FireSparkle.Studio」，© 由 Apple 自動加上）
  copyright: '© 花火工作室 FireSparkle.Studio',
  // 社群帳號：Instagram 與 Threads 皆為 @firesparkle.studio
  social: {
    handle: 'firesparkle.studio',
    instagram: 'https://www.instagram.com/firesparkle.studio/',
    threads: 'https://www.threads.com/@firesparkle.studio',
  },
  steam: {
    slug: 'larry-cocktail',
    releasedOn: '2026-11-17',
    heroImage: '/assets/steam/larry-gameplay.d38919e4ad06.jpg',
    storeUrl: 'https://store.steampowered.com/app/5466570/',
    platforms: ['Windows', 'macOS', 'Linux'],
    demoSubject: '賴瑞的調酒研究室｜Steam 試玩碼申請 / Demo key request',
    demoBody: '花火工作室您好，\n我想索取《賴瑞的調酒研究室》Steam 試玩碼，謝謝！\n\nHello FireSparkle.Studio,\nI would like to request a Steam demo key for Larry’s Cocktail Lab. Thank you!',
  },
  // 網站隱私說明的更新日期（變更時需同步新增各語言的「Last updated …」文字，見 data/i18n/additions-*.json）
  updatedZh: '2026 年 10 月 23 日',
  updatedEn: 'October 23, 2026',
  // 各 App 隱私政策彙整日期的預設值（manifest 未指定 compiledZh/compiledEn 時使用）
  policyCompiledZh: '2026 年 10 月 18 日',
  policyCompiledEn: 'October 18, 2026',
};

// 作品排序（首頁、作品頁編號依此順序）
// 依 App Store Connect 的累積銷售數量由高到低排列（2026 年 10 月 23 日），新資料出來時請調整順序。
export const order = [
  'compound-calculator', 'easy-draw', 'larry-cocktail', 'crypto-dictionary', 'vitamins',
  'stock-simulator', 'pr-diary', 'time-manager', 'dream-journal', 'design-it',
  'coffee-chat', 'perfect-pig', 'milebutler', 'future-major-guide', 'semiconductors-illustrated',
  'paper-reading-desk', 'finatlas', 'luxury-guide', 'adhd-compass',
];

export const categoryEn = {
  全部: 'All', 學習與規劃: 'Learn & Plan', 日常工具: 'Everyday Tools', 生活記錄: 'Life Logs', 遊戲: 'Games', 創作工具: 'Creative Tools',
};

export const genreEn = {
  工具程式: 'Utilities', 財經: 'Finance', 生產力工具: 'Productivity', 教育: 'Education', 健康與健身: 'Health & Fitness',
  遊戲: 'Games', 家庭: 'Family', 模擬: 'Simulation', 圖像與設計: 'Graphics & Design', 生活風格: 'Lifestyle',
  參考: 'Reference', 旅遊: 'Travel', 商業: 'Business', 休閒: 'Casual',
};

// 每款 App：分類、中文簡稱、英文名稱與中英文簡介
// accent：作品主色〔淺色模式, 深色模式〕，取自各 App 的 AccentColor 或主題色；只用於作品頁、隱私頁與支援頁的細線和小標記，全站仍以古金色為主
export const apps = {
  'adhd-compass': {
    accent: ['#665596', '#b9a9df'],
    category: '生活記錄', short: 'ADHD Compass', en: 'ADHD Compass',
    shortDescription: '管理任務、專注計時、用藥與每日紀錄，將照護觀察及預約保存在裝置上。',
    enDesc: 'Manage tasks, focus timers, medication records and daily notes. Keep care observations and appointments on your device.',
  },
  'luxury-guide': {
    accent: ['#8e7548', '#c8b183'],
    category: '學習與規劃', short: '名牌指南', en: 'Luxury Guide',
    shortDescription: "探索名牌故事、經典單品與製作工藝，閱讀課程與測驗、保存筆記，並比較選購情境。",
    enDesc: "Explore luxury brands, classic designs and craftsmanship. Learn with lessons and quizzes, save notes and compare buying scenarios.",
  },
  finatlas: {
    accent: ['#9a7d49', '#d6bd81'],
    category: '學習與規劃', short: 'FinAtlas 金融產業與職涯', en: 'FinAtlas: Finance & Careers',
    shortDescription: '學習金融產業與職涯，查詢金融機構、閱讀課程與測驗，整理筆記及學習進度。',
    enDesc: 'Explore the financial industry and careers with institution references, lessons and quizzes. Keep notes and track your learning progress.',
  },
  'paper-reading-desk': {
    accent: ['#8f6736', '#d7b582'],
    category: '學習與規劃', short: '研究生讀 Paper 神器', en: 'Paper Reading Desk',
    shortDescription: '將文獻、閱讀筆記與引用資料保存在裝置上，匯入文件、查看論文拆解並匯出備份。',
    enDesc: 'Keep papers, reading notes and citations on your device. Import documents, review paper breakdowns and export backups.',
  },
  'future-major-guide': {
    accent: ['#1469de', '#99ccff'],
    category: '學習與規劃', short: '我決定自己的未來-大學選系指南', en: 'Future Major Guide',
    shortDescription: '探索台灣與美國的大學及科系，透過興趣測驗、校系比較、收藏與筆記整理選校方向。',
    enDesc: 'Explore universities and majors in Taiwan and the United States with interest quizzes, side-by-side comparisons, saved options and notes.',
  },
  milebutler: {
    accent: ['#0a5c63', '#6fc2c8'],
    category: '學習與規劃', short: '哩程管家：信用卡換機票試算', en: 'MileButler: Miles & Card Plans',
    shortDescription: '比較航空哩程兌換、買哩成本與信用卡轉點，估算換票所需點數、消費金額和累積時間。',
    enDesc: 'Compare flight award redemptions, mile-purchase costs and credit-card point transfers. Estimate the points, spending and time needed for a ticket.',
  },
  'semiconductors-illustrated': {
    accent: ['#1a6eab', '#6fc3e8'],
    category: '學習與規劃', short: '圖解半導體', en: 'Semiconductors Illustrated',
    shortDescription: '用圖解與互動製程示意學習半導體，搭配入門課、術語字典、小測驗與學習筆記。',
    enDesc: 'Learn semiconductor basics with illustrated lessons, interactive process diagrams, a glossary, quizzes and study notes.',
  },
  'dream-journal': {
    accent: ['#633da3', '#b9a3ef'],
    category: '生活記錄', short: '把夢遺留下來', en: 'Leave Your Dream Behind',
    shortDescription: '記錄夢境、情緒與標籤，用月曆和趨勢回顧夢境紀錄。',
    enDesc: 'Record dreams, moods and tags, then review your entries with a calendar and trends.',
  },
  'coffee-chat': {
    accent: ['#8f7347', '#e8d6b0'],
    category: '日常工具', short: 'Coffee Chat 筆記', en: 'Coffee Chat Note',
    shortDescription: '準備求職與職場交流的會面，記錄對話、整理聯絡人，並設定後續跟進提醒。',
    enDesc: 'Prepare for career conversations, take notes, organise contacts and set follow-up reminders.',
  },
  'design-it': {
    accent: ['#8a5a3b', '#d9a77c'],
    category: '創作工具', short: '自己來設計', en: 'Design It Yourself',
    shortDescription: '在房間照片上試色，預覽空間、比較材料，並整理預算。',
    enDesc: 'Test colours on room photos, preview spaces, compare materials and track your budget.',
  },
  'perfect-pig': {
    accent: ['#d4566c', '#f59aaa'],
    category: '遊戲', short: '完美養豬', en: 'Perfect Pig',
    shortDescription: '透過日常照顧培養小豬，七天後自行選擇結算故事或繼續陪伴，收集卡牌與結局。',
    enDesc: 'Raise a piglet through daily care, then choose whether to finish its story or keep it company after seven days. Collect cards and endings.',
  },
  'time-manager': {
    accent: ['#1a78d6', '#7db4f0'],
    category: '日常工具', short: 'AI 時間管理', en: 'AI Time Manager',
    shortDescription: '管理任務、排程與專注計時，使用裝置內規則和範本拆解目標，回顧進度。',
    enDesc: 'Manage tasks, schedules and focus timers. Break down goals with on-device rules and templates, then review your progress.',
  },
  vitamins: {
    accent: ['#56799a', '#9fbad1'],
    category: '生活記錄', short: '你今天維他命了嗎', en: 'Vitamin Today',
    shortDescription: '安排補充品提醒、記錄每日服用情況，透過月曆與週月統計查看紀錄。',
    enDesc: 'Set supplement reminders, log daily intake and review your records in a calendar or weekly and monthly summaries.',
  },
  'easy-draw': {
    accent: ['#427db0', '#8db8e0'],
    category: '日常工具', short: '輕鬆抽獎', en: 'Easy Lucky Draw',
    shortDescription: '貼上名單後自動去除重複項目，用於活動抽獎、聚會遊戲或課堂分組。',
    enDesc: 'Paste a list, remove duplicates automatically and use it for prize draws, party games or class groups.',
  },
  'compound-calculator': {
    accent: ['#634736', '#f0d4a6'],
    category: '學習與規劃', short: '複利計算器', en: 'Compound Interest Calculator',
    shortDescription: '試算複利、定期投入與通膨影響，比較退休、財務自由及貸款的規劃情境。',
    enDesc: 'Calculate compound growth, regular contributions and inflation effects. Compare retirement, financial independence and loan scenarios.',
  },
  'stock-simulator': {
    accent: ['#245f9e', '#70b5e2'],
    category: '學習與規劃', short: '股神養成', en: 'Stock Master: TW & US Paper Trading',
    shortDescription: '以虛擬資金練習台股與美股交易，依收盤價或自訂價格下單，記錄理由並查看持倉。',
    enDesc: 'Practise Taiwan and US stock trading with virtual funds, using closing or custom prices. Record your reasons and review your holdings.',
  },
  'crypto-dictionary': {
    accent: ['#3d6bd1', '#93b2f2'],
    category: '學習與規劃', short: '幣圈神器', en: 'Crypto Essentials Dictionary',
    shortDescription: '查詢區塊鏈、加密貨幣與資產安全知識，提供繁中及英文內容、課程與每日複習。',
    enDesc: 'Look up blockchain, cryptocurrency and asset security topics in Traditional Chinese and English, with lessons and daily review.',
  },
  'pr-diary': {
    accent: ['#b52e66', '#ef8fb5'],
    category: '生活記錄', short: '公關日記', en: 'PR Diary',
    shortDescription: '提供客人、小姐、男模與經紀各自的日記，記錄工作互動、收支、排班與待辦。',
    enDesc: 'Diaries for guests, hostesses, hosts and managers to record work interactions, income, expenses, shifts and tasks.',
  },
  'larry-cocktail': {
    accent: ['#b8702c', '#f0ab67'],
    category: '遊戲', short: '賴瑞的調酒研究室', en: "Larry's Cocktail Lab",
    shortDescription: '以酒吧為背景的戀愛文字遊戲。透過對話選項進入不同故事分支，並以本機存檔回顧路線。',
    enDesc: 'A romance text game set in a bar. Dialogue choices lead to different story branches, with local saves for revisiting routes.',
  },
};
