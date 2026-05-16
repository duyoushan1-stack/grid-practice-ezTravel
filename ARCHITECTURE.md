# 專案架構文件 (ARCHITECTURE.md)

## 1. 系統概述
- **專案名稱**：grid-practice-ezTravel
- **目標**：模擬 ezTravel 的旅遊產品展示頁面，練習 CSS Grid 佈局與 Alpine.js 的互動邏輯。
- **核心功能**：
    - 多層級 Tab 切換（推薦行程、自遊最夯）。
    - 動態卡片資料渲染。
    - 響應式佈局設計。

## 2. 技術棧
- **前端框架**：[Alpine.js v3+](https://alpinejs.dev/) - 輕量級反應式框架。
- **建構工具**：[Vite](https://vitejs.dev/) - 快速的前端開發與打包工具。
- **樣式方案**：Vanilla CSS (CSS Grid / Flexbox)。
- **資料格式**：JSON 靜態檔案。

## 3. 前端架構
### 目錄結構
```text
/
├── data/           # 靜態資料 (JSON)
├── scripts/        # 輔助腳本
├── app.js          # Alpine.js 入口與邏輯定義
├── index.html      # 主頁面結構
└── style.css       # 樣式定義
```

### 邏輯設計模式
- **資料驅動 (Data-Driven)**：UI 狀態由 Alpine.js 的資料模型驅動。
- **單一狀態源 (Single Source of Truth)**：目前所有切換邏輯集中在 `showTabContent` 元件中。

## 4. 優化規範與指導原則
- **效能優化**：
    - 減少重複的陣列搜尋 (Array Find)。
    - 使用動態導入 (Dynamic Import) 處理大體積 JSON。
- **可維護性**：
    - 邏輯與資料分離。
    - 使用語意化命名。
- **安全**：
    - 確保 JSON 資料來源可靠，避免 XSS 注入（Alpine.js 預設有防護）。

## 5. 未來擴展
- **組件化**：隨著頁面複雜度增加，將 Tab 與 Card 抽離為獨立的 Alpine 組件。
- **API 整合**：將靜態 JSON 替換為真實的後端 API 呼叫。
