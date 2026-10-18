// 花火工作室 FireSparkle.Studio — 網站文案與作品設定
// 改文案、作品分類、英文名稱或排序，都在這個檔案；改完執行 node scripts/build.mjs。

export const site = {
  url: 'https://firesparkle.com',
  nameZh: '花火工作室',
  nameEn: 'FireSparkle.Studio',
  email: 'firesparkle.studio@gmail.com',
  tagline: 'Where ideas shine.',
  updatedZh: '2026 年 10 月 18 日',
  updatedEn: 'October 18, 2026',
};

// 作品排序（首頁、作品頁編號依此順序）
export const order = [
  'dream-journal', 'coffee-chat', 'design-it', 'perfect-pig', 'time-manager', 'vitamins',
  'easy-draw', 'compound-calculator', 'stock-simulator', 'crypto-dictionary', 'pr-diary', 'larry-cocktail',
];

// 首頁主視覺環繞的 App 圖示
export const heroApps = ['coffee-chat', 'dream-journal', 'perfect-pig', 'compound-calculator', 'easy-draw'];

export const categoryEn = {
  全部: 'All', 學習與規劃: 'Learn & Plan', 日常工具: 'Everyday Tools', 生活記錄: 'Life Logs', 遊戲與創作: 'Play & Create',
};

export const genreEn = {
  工具程式: 'Utilities', 財經: 'Finance', 生產力工具: 'Productivity', 教育: 'Education', 健康與健身: 'Health & Fitness',
  遊戲: 'Games', 家庭: 'Family', 模擬: 'Simulation', 圖像與設計: 'Graphics & Design', 生活風格: 'Lifestyle',
};

// 每款 App：分類、中文簡稱、英文名稱與英文簡介
export const apps = {
  'dream-journal': {
    category: '生活記錄', short: '把夢遺留下來', en: 'Leave Your Dream Behind',
    enDesc: 'Record dream fragments, moods and tags, then look back through a calendar, trends and on-device, rule-based readings.',
  },
  'coffee-chat': {
    category: '日常工具', short: 'Coffee Chat 筆記', en: 'Coffee Chat Note',
    enDesc: 'A private notebook for job hunting and networking: prepare before you meet, record the conversation, and follow up afterwards.',
  },
  'design-it': {
    category: '遊戲與創作', short: '自己來設計', en: 'Design It Yourself',
    enDesc: 'Preview spaces, test colours on room photos, compare materials and track budgets to turn home ideas into a plan you can discuss.',
  },
  'perfect-pig': {
    category: '遊戲與創作', short: '完美養豬', en: 'Perfect Pig',
    enDesc: 'A seven-day piglet-raising game: feed, walk and chat to shape its personality, then collect cards and story endings.',
  },
  'time-manager': {
    category: '日常工具', short: 'AI 時間管理', en: 'AI Time Manager',
    enDesc: 'Tasks, daily schedules, focus timers and reviews in one place, with on-device rules and templates to break goals down.',
  },
  vitamins: {
    category: '生活記錄', short: '你今天維他命了嗎', en: 'Vitamin Today',
    enDesc: 'Build supplement plans, set reminders and check in daily, then review your routine with a calendar and weekly or monthly stats.',
  },
  'easy-draw': {
    category: '日常工具', short: '輕鬆抽獎', en: 'Easy Lucky Draw',
    enDesc: 'Paste a list of names, let duplicates clean themselves up, and run prize draws, party games or class groupings.',
  },
  'compound-calculator': {
    category: '學習與規劃', short: '複利計算器', en: 'Compound Interest Calculator',
    enDesc: 'Model compound growth, regular contributions and inflation, and map out retirement, financial freedom and loan scenarios.',
  },
  'stock-simulator': {
    category: '學習與規劃', short: '股神養成', en: 'Stock Master: TW & US Paper Trading',
    enDesc: 'Practise Taiwan after-hours trades and custom-price US orders with virtual cash, note your reasons and review your holdings.',
  },
  'crypto-dictionary': {
    category: '學習與規劃', short: '幣圈神器', en: 'Crypto Essentials Dictionary',
    enDesc: 'Blockchain, crypto and asset-safety knowledge in Traditional Chinese and English, with search, lessons and daily review.',
  },
  'pr-diary': {
    category: '生活記錄', short: '公關日記', en: 'PR Diary',
    enDesc: 'Role-based diaries for guests, hostesses, hosts and managers to keep track of work interactions, income, shifts and to-dos.',
  },
  'larry-cocktail': {
    category: '遊戲與創作', short: '賴瑞的調酒研究室', en: "Larry's Cocktail Lab",
    enDesc: 'A romance story set in a bar: explore branching routes through dialogue choices and revisit them with local saves.',
  },
};
