# Alpine.js 與 JavaScript Getter 方法解說

## 一、Alpine.js 動態 Class 綁定

### 1.1 基本概念

在 HTML 中使用 `:class` 指令來動態添加或移除 CSS 類別。這是 Alpine.js 提供的強大功能，可以根據資料狀態改變元素的樣式。

### 1.2 語法結構

```html
:class="{'className': condition, 'className2': condition2}"
```

- **對象鍵**：CSS 類別名稱（字符串）
- **對象值**：布林條件（true 添加該類別，false 不添加）

### 1.3 實際案例

在本專案中的 Tab 切換：

```html
<li x-text="tour.title" 
    @click="goTourTab(tour.title)"
    :class="{'tour-tab': true, 'active': activeTab === tour.title}">
</li>
```

#### 解析：

| 類別名稱 | 條件 | 說明 |
|---------|------|------|
| `tour-tab` | `true` | 始終添加，是基礎樣式 |
| `active` | `activeTab === tour.title` | 只有選中的 Tab 才有此類別 |

#### 實際效果：

假設點擊「北陸」這個 Tab：

```javascript
activeTab = '北陸'
```

則該 li 元素的 HTML 會變成：

```html
<li class="tour-tab active">北陸</li>
```

而未選中的「精選推薦」則是：

```html
<li class="tour-tab">精選推薦</li>
```

### 1.4 搭配 CSS 樣式

```css
.tour-tab {
  font-size: 18px;
  padding: 5px;
  cursor: pointer;
  /* 未選中時的基礎樣式 */
}

.tour-tab.active {
  color: #0c9251;
  font-weight: 700;
  padding-bottom: 5px;
  border-bottom: 3px solid #11d073;
  /* 選中時的高亮樣式 */
}
```

### 1.5 進階用法

#### 多個條件組合

```html
:class="{
  'active': isActive,
  'disabled': isDisabled,
  'highlight': hasError && isActive
}"
```

#### 使用三元運算子

```html
:class="isActive ? 'highlight' : 'normal'"
```

#### 字符串拼接

```html
:class="`${baseClass} ${isActive ? 'active' : ''}`"
```

---

## 二、JavaScript Getter 方法

### 2.1 什麼是 Getter？

Getter（獲取器）是 ES6 引入的語法，讓你可以像訪問**屬性**一樣調用**方法**。使用 `get` 關鍵字定義。

### 2.2 基本語法

```javascript
get propertyName() {
  // 執行某些邏輯
  return someValue
}
```

### 2.3 普通方法 vs Getter 方法

#### 普通方法

```javascript
getCards() {
  const tab = this.tourList.find(item => item.title === this.activeTab)
  return tab ? tab.cards : []
}

// 使用方式：呼叫時需要 ()
this.getCards()
```

#### Getter 方法

```javascript
get cards() {
  const tab = this.tourList.find(item => item.title === this.activeTab)
  return tab ? tab.cards : []
}

// 使用方式：像屬性一樣訪問，不需要 ()
this.cards
```

### 2.4 本專案中的 Getter 實現

```javascript
get cards() {
  const tab = this.tourList.find(item => item.title === this.activeTab)
  return tab ? tab.cards : []
}
```

#### 詳細解析：

```javascript
// 步驟 1：在 tourList 中查找符合條件的分類
const tab = this.tourList.find(item => item.title === this.activeTab)
//          ^^^^^^^^^^^^^^ 遍歷整個陣列
//                  ^^^^ 找到第一個符合條件的元素
//                             ^^^^^^^^^^^^^^^^^^^^^^^^^^^ 條件：分類名稱等於當前選中的 tab

// 步驟 2：如果找到則返回該分類的卡片，否則返回空陣列
return tab ? tab.cards : []
//     ^^^   ^^^^^^^^^^   ^^
//     檢查   如果找到     如果沒找到
```

### 2.5 資料流程範例

#### 初始資料

```javascript
tourList = [
  {
    title: '精選推薦',
    cards: [
      { title: '搶先預購', desc: '親子跟團', price: '21,000', img: 'url1' },
      { title: '每周推薦', desc: '買到賺到', price: '23,900', img: 'url2' }
    ]
  },
  {
    title: '北陸',
    cards: [
      { title: '立山雪景', desc: '春季限定', price: '33,900', img: 'url3' }
    ]
  }
]

activeTab = '精選推薦'
```

#### 步驟執行

| 步驟 | 代碼 | 結果 |
|------|------|------|
| 1 | `find()` 查詢 | 找到 `{ title: '精選推薦', cards: [...] }` |
| 2 | `tab ? tab.cards` | 返回 `[{...}, {...}]`（2 個卡片） |
| 3 | `x-for` 遍歷 | 渲染 2 個卡片元素 |

#### 當使用者點擊「北陸」

```javascript
activeTab = '北陸'
```

再次訪問 `this.cards` 時：

| 步驟 | 代碼 | 結果 |
|------|------|------|
| 1 | `find()` 查詢 | 找到 `{ title: '北陸', cards: [...] }` |
| 2 | `tab ? tab.cards` | 返回 `[{...}]`（1 個卡片） |
| 3 | `x-for` 遍歷 | 重新渲染 1 個卡片元素 |

### 2.6 Getter 的優點

#### ✅ 響應式更新

當 `activeTab` 改變時，下次訪問 `cards` 會自動重新計算

```javascript
activeTab = '精選推薦'
console.log(this.cards)  // 精選推薦的卡片

activeTab = '北陸'
console.log(this.cards)  // 自動更新為北陸的卡片
```

#### ✅ 語法簡潔

在 Alpine 模板中可以直接使用：

```html
<!-- ✅ 使用 Getter -->
<template x-for="card in cards">
  <!-- 代碼 -->
</template>

<!-- ❌ 如果用普通方法 -->
<!-- <template x-for="card in getCards()"> -->
```

#### ✅ 與 Alpine 的無縫整合

Alpine 會自動跟蹤 getter 的依賴，當依賴資料改變時自動更新 DOM

### 2.7 進階技巧

#### 計算屬性中的 Getter

```javascript
// 獲取當前 tab 的詳細資訊
get currentTab() {
  return this.tourList.find(item => item.title === this.activeTab)
}

// 基於 currentTab 的另一個 getter
get cardCount() {
  return this.currentTab ? this.currentTab.cards.length : 0
}
```

#### 結合條件判斷

```javascript
get hasCards() {
  return this.cards.length > 0
}

get emptyMessage() {
  return this.hasCards ? '' : '目前沒有可用的卡片'
}
```

### 2.8 注意事項

#### ⚠️ 不要在 Getter 中修改狀態

```javascript
// ❌ 不推薦
get cards() {
  this.viewCount++  // 副作用：修改狀態
  return this.tourList.find(...).cards
}

// ✅ 推薦
get cards() {
  return this.tourList.find(...).cards
}
```

#### ⚠️ 避免複雜計算

```javascript
// ❌ 不推薦：在 getter 中做複雜運算
get filteredAndSortedCards() {
  return this.cards
    .filter(card => card.price < 30000)
    .sort((a, b) => b.price - a.price)
    .map(card => ({ ...card, discounted: true }))
}

// ✅ 推薦：使用方法或分解成多個 getter
get filteredCards() {
  return this.cards.filter(card => card.price < 30000)
}
```

---

## 三、兩者的協同工作

### 完整流程圖

```
使用者點擊 Tab
    ↓
@click="goTourTab(tour.title)"
    ↓
activeTab = 新的分類名
    ↓
:class 檢測 activeTab 變化
    ↓
添加/移除 'active' 類別
    ↓
同時，cards getter 檢測到 activeTab 變化
    ↓
返回新分類的卡片陣列
    ↓
Alpine 遍歷新陣列，重新渲染卡片
```

### HTML 與 JavaScript 的互動

```html
<!-- HTML：動態 class 綁定 -->
<li :class="{'active': activeTab === tour.title}"
    @click="goTourTab(tour.title)">
  {{ tour.title }}
</li>

<!-- HTML：使用 getter -->
<template x-for="card in cards">
  <a>{{ card.title }}</a>
</template>
```

```javascript
// JavaScript：數據和方法
const showTabContent = () => ({
  activeTab: '精選推薦',
  
  // Tab 切換方法
  goTourTab(title) {
    this.activeTab = title
  },
  
  // Getter 方法：動態獲取卡片
  get cards() {
    const tab = this.tourList.find(item => item.title === this.activeTab)
    return tab ? tab.cards : []
  }
})
```

---

## 總結

| 項目 | Alpine Class | Getter 方法 |
|------|-------------|-----------|
| **用途** | 動態添加/移除 CSS 類別 | 根據條件動態計算屬性值 |
| **語法** | `:class="{name: condition}"` | `get propertyName() { ... }` |
| **特性** | 樣式控制，視覺反饋 | 響應式更新，代碼簡潔 |
| **何時更新** | 當條件改變時 | 當依賴的數據改變時 |
| **使用場景** | Tab 高亮、按鈕狀態、動態樣式 | 過濾數據、計算值、條件渲染 |
