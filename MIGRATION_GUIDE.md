# 韓集集運管理系統 — 專案拆分遷移指南

## 原始問題

原本所有程式碼都擠在一個 `index.html`（3,871 行），包含：
- 64 個 `useState`
- 38 個頁面
- 全部在一個 `KshipApp()` function 裡

## 新的專案結構

```
kship-admin/
├── index.html                  # Vite 入口 HTML
├── package.json                # 套件管理
├── vite.config.js              # Vite 設定
│
├── src/
│   ├── main.jsx                # React 掛載點
│   ├── App.jsx                 # 主元件（路由 + 版面）
│   ├── App.css                 # 全域樣式
│   │
│   ├── config/                 # ⚙️ 設定檔
│   │   ├── supabase.js         # Supabase 連線
│   │   ├── navigation.js       # 導航選單結構 (NAV)
│   │   └── constants.js        # 常數 (TYPES, SHIFTS, GRADES, 密碼...)
│   │
│   ├── utils/                  # 🔧 工具函式（純函式，不含 React）
│   │   ├── date.js             # 日期、KST 時區
│   │   ├── employee.js         # 員工相關 (dbToLocal, localToDb, tenure...)
│   │   ├── shipping.js         # 運費計算 (DEFAULT_SHIP_RATES, calcShipCost)
│   │   ├── grade.js            # 會員等級 (getGradeInfo, calcGrade)
│   │   └── finance.js          # 財務計算 (calcTax)
│   │
│   ├── hooks/                  # 🪝 自訂 Hook
│   │   ├── useIsMobile.js      # 裝置偵測
│   │   ├── useEmployees.js     # 員工 CRUD（Supabase）
│   │   ├── useAttendance.js    # 出勤管理
│   │   ├── useSchedule.js      # 排班管理
│   │   ├── useFinancials.js    # 財務資料
│   │   └── useShipRates.js     # 運費設定
│   │
│   ├── contexts/               # 📦 React Context（全域共用狀態）
│   │   ├── AuthContext.jsx     # 登入/角色/權限
│   │   └── AppContext.jsx      # emps, tab, dailyStats 等共用資料
│   │
│   ├── components/             # 🧩 可重用元件
│   │   ├── common/
│   │   │   ├── Dot.jsx         # 彩色圓點
│   │   │   ├── Inp.jsx         # 輸入框
│   │   │   ├── RR.jsx          # 行列顯示
│   │   │   └── Placeholder.jsx # 開發中頁面
│   │   └── layout/
│   │       ├── Sidebar.jsx     # 左側選單
│   │       ├── Header.jsx      # 頂部列
│   │       └── LoginScreen.jsx # 登入畫面
│   │
│   └── pages/                  # 📄 各功能頁面
│       ├── dashboard/
│       │   ├── DashOps.jsx         # 營運總覽
│       │   ├── DashToday.jsx       # 今日數據
│       │   ├── DashMonth.jsx       # 本月數據
│       │   ├── DashFinance.jsx     # 財務概況
│       │   └── DashAI.jsx          # AI 營運摘要
│       ├── finance/
│       │   ├── FinDashboard.jsx    # 財務儀表板
│       │   ├── FinMonthly.jsx      # 月報表
│       │   ├── FinYearly.jsx       # 年報表
│       │   ├── FinRevenue.jsx      # 營收明細
│       │   ├── FinExpense.jsx      # 支出管理
│       │   ├── FinSalary.jsx       # 薪資支出
│       │   ├── FinCollection.jsx   # 收款紀錄
│       │   ├── FinShipList.jsx     # 出貨/付款
│       │   ├── FinProfit.jsx       # 利潤分析
│       │   └── FinUnpaid.jsx       # 收款管理
│       ├── customers/
│       │   ├── CustList.jsx        # 客戶列表
│       │   ├── CustDetail.jsx      # 客戶資料
│       │   ├── CustVip.jsx         # VIP 客戶
│       │   ├── CustActive.jsx      # 活躍客戶
│       │   ├── CustInactive.jsx    # 沉睡客戶
│       │   ├── CustUnpaid.jsx      # 未付款客戶
│       │   ├── CustRanking.jsx     # 客戶消費排行
│       │   └── CustAnalysis.jsx    # 客戶分析
│       ├── hr/
│       │   ├── HrEmployees.jsx     # 員工資料
│       │   ├── HrPosition.jsx      # 職位管理
│       │   ├── HrAttendance.jsx    # 出勤管理
│       │   ├── HrSchedule.jsx      # 排班管理
│       │   ├── HrLeave.jsx         # 請假管理
│       │   ├── HrSalary.jsx        # 薪資管理
│       │   ├── HrVisa.jsx          # 簽證期限
│       │   └── HrPerformance.jsx   # 績效統計
│       ├── expenses/
│       │   ├── ExpMeals.jsx        # 每日餐費
│       │   └── ExpPacking.jsx      # 包材支出
│       └── settings/
│           ├── SetCompany.jsx      # 公司資料設定
│           ├── SetShipping.jsx     # 運費設定
│           ├── SetProxy.jsx        # 代購服務費設定
│           ├── SetTier.jsx         # 客戶等級設定
│           ├── SetPermission.jsx   # 權限管理
│           ├── SetLine.jsx         # LINE 通知設定
│           ├── SetSms.jsx          # 簡訊通知設定
│           └── SetApi.jsx          # API 串接設定
```

## 拆分原則

### 1. Config — 放「不會變的東西」
Supabase 連線資訊、導航結構、班次/等級等靜態常數。

### 2. Utils — 放「純計算」
不包含任何 React 的純函式，輸入值 → 回傳結果。
例如：`calcTax(amount)`, `calcShipCost(...)`, `dbToLocal(row)`

### 3. Hooks — 放「資料存取 + 狀態管理」
把原本散落在 KshipApp 裡的 useState + Supabase 查詢，整合成獨立的 Hook。
例如：`useEmployees()` 回傳 `{ emps, loading, addEmp, updateEmp, deleteEmp }`

### 4. Contexts — 放「跨頁面共用」的狀態
登入狀態、當前分頁、員工列表等需要在多個頁面共用的資料。

### 5. Pages — 每個 `tab === "xxx"` 變成一個獨立檔案
原本 KshipApp 裡 `{tab === "hr-employees" && (...)}` 的區塊，
直接抽成 `pages/hr/HrEmployees.jsx`。

## 遷移步驟

### Step 1：初始化 Vite 專案
```bash
npm create vite@latest kship-admin -- --template react
cd kship-admin
npm install @supabase/supabase-js xlsx html2canvas
```

### Step 2：複製設定檔
把 `src/config/`, `src/utils/` 裡的檔案放好。

### Step 3：建立 Context
先處理 `AuthContext` 和 `AppContext`，這是整個 App 的骨架。

### Step 4：逐頁遷移
每次只搬一個 tab 的內容到新的 page 元件裡，測試確認後再搬下一個。
建議順序：
1. 登入畫面 → LoginScreen
2. 儀表板 → DashOps
3. 員工管理 → HrEmployees（最複雜，搬完後其他就容易了）
4. 其餘頁面一個一個搬

### Step 5：移除舊的 index.html
全部搬完後，舊的 3,871 行 index.html 就可以刪掉了。

## 每個檔案的對應關係

| 原始行數 | 原始內容 | 新檔案位置 |
|---------|---------|-----------|
| 42-46 | Supabase 初始化 | `src/config/supabase.js` |
| 47-99 | dbToLocal, localToDb, monthsDiff | `src/utils/employee.js` |
| 100-126 | INIT 預設資料, TYPES | `src/config/constants.js` |
| 127-144 | daysLeft, tenure, calcTax | `src/utils/employee.js`, `src/utils/finance.js` |
| 145-178 | KST, SHIFTS, 日期工具 | `src/utils/date.js`, `src/config/constants.js` |
| 180-210 | GRADES, calcGrade | `src/utils/grade.js` |
| 211-325 | 運費設定, calcShipCost | `src/utils/shipping.js` |
| 307-312 | useIsMobile, Dot | `src/hooks/useIsMobile.js`, `src/components/common/Dot.jsx` |
| 313-394 | Inp, RR, NAV, Placeholder | `src/components/common/`, `src/config/navigation.js` |
| 395-460 | 登入/驗證邏輯 | `src/contexts/AuthContext.jsx` |
| 460-600 | 員工/薪資/出勤 state | `src/hooks/useEmployees.js`, `src/hooks/useAttendance.js` |
| 600-900 | 財務/支出 state | `src/hooks/useFinancials.js` |
| 900+ | 各頁面 render | `src/pages/` 各對應檔案 |
