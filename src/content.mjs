// 花火工作室 FireSparkle.Studio — 網站文案與作品設定
// 改文案、作品分類、英文名稱或排序，都在這個檔案；改完執行 node scripts/build.mjs。

export const site = {
  url: 'https://firesparkle.com',
  nameZh: '花火工作室',
  nameEn: 'FireSparkle.Studio',
  email: 'firesparkle.studio@gmail.com',
  tagline: 'Small sparks, big ideas.',
  founded: 2026,
  // 社群帳號：Instagram 與 Threads 皆為 @firesparkle.studio
  social: {
    handle: 'firesparkle.studio',
    instagram: 'https://www.instagram.com/firesparkle.studio/',
    threads: 'https://www.threads.com/@firesparkle.studio',
  },
  // 網站隱私說明的更新日期（變更時需同步新增各語言的「Last updated …」文字，見 data/i18n/additions-*.json）
  updatedZh: '2026 年 10 月 23 日',
  updatedEn: 'October 23, 2026',
  // 各 App 隱私政策彙整日期的預設值（manifest 未指定 compiledZh/compiledEn 時使用）
  policyCompiledZh: '2026 年 10 月 18 日',
  policyCompiledEn: 'October 18, 2026',
};

// 作品排序（首頁、作品頁編號依此順序）
export const order = [
  'future-major-guide', 'milebutler', 'semiconductors-illustrated',
  'dream-journal', 'coffee-chat', 'design-it', 'perfect-pig', 'time-manager', 'vitamins',
  'easy-draw', 'compound-calculator', 'stock-simulator', 'crypto-dictionary', 'pr-diary', 'larry-cocktail',
];

export const categoryEn = {
  全部: 'All', 學習與規劃: 'Learn & Plan', 日常工具: 'Everyday Tools', 生活記錄: 'Life Logs', 遊戲: 'Games', 創作工具: 'Creative Tools',
};

export const genreEn = {
  工具程式: 'Utilities', 財經: 'Finance', 生產力工具: 'Productivity', 教育: 'Education', 健康與健身: 'Health & Fitness',
  遊戲: 'Games', 家庭: 'Family', 模擬: 'Simulation', 圖像與設計: 'Graphics & Design', 生活風格: 'Lifestyle',
  參考: 'Reference', 旅遊: 'Travel',
};

// 每款 App：分類、中文簡稱、英文名稱與中英文簡介
export const apps = {
  'future-major-guide': {
    category: '學習與規劃', short: '我決定自己的未來-大學選系指南', en: 'Future Major Guide',
    shortDescription: '探索台灣與美國的大學及科系，透過興趣測驗、校系比較、收藏與筆記整理選校方向。',
    enDesc: 'Explore universities and majors in Taiwan and the United States with interest quizzes, side-by-side comparisons, saved options and notes.',
  },
  milebutler: {
    category: '學習與規劃', short: '哩程管家：信用卡換機票試算', en: 'MileButler: Miles & Card Plans',
    shortDescription: '比較航空哩程兌換、買哩成本與信用卡轉點，估算換票所需點數、消費金額和累積時間。',
    enDesc: 'Compare flight award redemptions, mile-purchase costs and credit-card point transfers. Estimate the points, spending and time needed for a ticket.',
  },
  'semiconductors-illustrated': {
    category: '學習與規劃', short: '圖解半導體', en: 'Semiconductors Illustrated',
    shortDescription: '用圖解與互動製程示意學習半導體，搭配入門課、術語字典、小測驗與學習筆記。',
    enDesc: 'Learn semiconductor basics with illustrated lessons, interactive process diagrams, a glossary, quizzes and study notes.',
  },
  'dream-journal': {
    category: '生活記錄', short: '把夢遺留下來', en: 'Leave Your Dream Behind',
    shortDescription: '記錄夢境、情緒與標籤，用月曆和趨勢回顧夢境紀錄。',
    enDesc: 'Record dreams, moods and tags, then review your entries with a calendar and trends.',
  },
  'coffee-chat': {
    category: '日常工具', short: 'Coffee Chat 筆記', en: 'Coffee Chat Note',
    shortDescription: '準備求職與職場交流的會面，記錄對話、整理聯絡人，並設定後續跟進提醒。',
    enDesc: 'Prepare for career conversations, take notes, organise contacts and set follow-up reminders.',
  },
  'design-it': {
    category: '創作工具', short: '自己來設計', en: 'Design It Yourself',
    shortDescription: '在房間照片上試色，預覽空間、比較材料，並整理預算。',
    enDesc: 'Test colours on room photos, preview spaces, compare materials and track your budget.',
  },
  'perfect-pig': {
    category: '遊戲', short: '完美養豬', en: 'Perfect Pig',
    shortDescription: '以七天為一代的小豬養成遊戲。透過餵食、散步與聊天培養個性，收集卡牌和故事結局。',
    enDesc: 'Raise a piglet over seven days. Feed it, take it for walks and chat to shape its personality and collect cards and story endings.',
  },
  'time-manager': {
    category: '日常工具', short: 'AI 時間管理', en: 'AI Time Manager',
    shortDescription: '管理任務、排程與專注計時，使用裝置內規則和範本拆解目標，回顧進度。',
    enDesc: 'Manage tasks, schedules and focus timers. Break down goals with on-device rules and templates, then review your progress.',
  },
  vitamins: {
    category: '生活記錄', short: '你今天維他命了嗎', en: 'Vitamin Today',
    shortDescription: '安排補充品提醒、記錄每日服用情況，透過月曆與週月統計查看紀錄。',
    enDesc: 'Set supplement reminders, log daily intake and review your records in a calendar or weekly and monthly summaries.',
  },
  'easy-draw': {
    category: '日常工具', short: '輕鬆抽獎', en: 'Easy Lucky Draw',
    shortDescription: '貼上名單後自動去除重複項目，用於活動抽獎、聚會遊戲或課堂分組。',
    enDesc: 'Paste a list, remove duplicates automatically and use it for prize draws, party games or class groups.',
  },
  'compound-calculator': {
    category: '學習與規劃', short: '複利計算器', en: 'Compound Interest Calculator',
    shortDescription: '試算複利、定期投入與通膨影響，比較退休、財務自由及貸款的規劃情境。',
    enDesc: 'Calculate compound growth, regular contributions and inflation effects. Compare retirement, financial independence and loan scenarios.',
  },
  'stock-simulator': {
    category: '學習與規劃', short: '股神養成', en: 'Stock Master: TW & US Paper Trading',
    shortDescription: '用虛擬資金練習台股盤後交易與美股自訂價格下單，記錄交易理由並查看持倉。',
    enDesc: 'Practise Taiwan after-hours trades and US orders at custom prices with virtual funds. Record your reasons and review your holdings.',
  },
  'crypto-dictionary': {
    category: '學習與規劃', short: '幣圈神器', en: 'Crypto Essentials Dictionary',
    shortDescription: '查詢區塊鏈、加密貨幣與資產安全知識，提供繁中及英文內容、課程與每日複習。',
    enDesc: 'Look up blockchain, cryptocurrency and asset security topics in Traditional Chinese and English, with lessons and daily review.',
  },
  'pr-diary': {
    category: '生活記錄', short: '公關日記', en: 'PR Diary',
    shortDescription: '提供客人、小姐、男模與經紀各自的日記，記錄工作互動、收支、排班與待辦。',
    enDesc: 'Diaries for guests, hostesses, hosts and managers to record work interactions, income, expenses, shifts and tasks.',
  },
  'larry-cocktail': {
    category: '遊戲', short: '賴瑞的調酒研究室', en: "Larry's Cocktail Lab",
    shortDescription: '以酒吧為背景的戀愛文字遊戲。透過對話選項進入不同故事分支，並以本機存檔回顧路線。',
    enDesc: 'A romance text game set in a bar. Dialogue choices lead to different story branches, with local saves for revisiting routes.',
  },
};
