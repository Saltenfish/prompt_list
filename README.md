# Prompt Atelier · PixAI 素材庫

單一 HTML 的 AI 繪圖 prompt 素材庫與組合工作檯，內建 405 條模組化 prompt（服飾／姿勢／雙人構圖／場景／元素／畫風／版面／人物特徵等 22 類）。

## 使用方式

直接開啟 `index.html` 即可，不需伺服器。放上 GitHub 後可用 GitHub Pages 部署：
Settings → Pages → Branch 選 main → 網址即為線上版。

## 功能

- 🔍 中英文即時搜尋
- 📂 大類 Tab ＋ 細分類側欄（手機為橫向 chips）
- 📋 單條複製／⭐ 收藏（存於瀏覽器）
- 🧺 組合工作檯（右側抽屜）：選主體 → 加模組 → 自動依 prompt 結構排序 → 預覽依結構區塊換行 → 一鍵複製
- 🎲 隨機抽一套；列表中每項可單獨重抽
- ＋ 頁面內新增 prompt（暫存瀏覽器，並產生可貼回原始碼的程式行）

## 🖼️ 加入參考圖

把生成好的圖片放進 `images/` 資料夾，**檔名 = prompt 標題開頭的代號**：

```
images/F4.png    → 顯示在「F4 中式旗袍」旁
images/P12.jpg   → 顯示在「P12 旋轉舞姿」旁
images/EY3.webp  → 顯示在「EY3 紅眸豎瞳」旁
```

支援 png / jpg / jpeg / webp（依序嘗試）。找不到圖片時縮圖自動隱藏，點縮圖可放大。

## ✏️ 永久新增 Prompt

打開 `index.html`，找到 `📚 PROMPT 資料區` 註解，照格式加一行即可：

```js
{c:"outfit_f", t:"F31 露背晚裝", p:"backless evening dress, ...", n:"備註選填"},
```

分類代號完整列表寫在該註解中。也可以用網頁右上「＋ 新增」填表，會自動產生這行程式碼供複製。

## 分類代號速查

| 代號 | 分類 | 代號 | 分類 |
|---|---|---|---|
| layout | 版面設計 | expression | 表情 |
| hair | 髮型 | gaze | 視線 |
| haircolor | 髮色 | pose | 姿勢 |
| eyes | 眼睛 | couple | 雙人構圖 |
| race | 種族特徵 | camera | 鏡頭構圖 |
| outfit_m / outfit_f | 男／女套裝 | location | 地點 |
| top_m / bottom_m | 男上／下裝 | element | 元素 |
| top_f / bottom_f | 女上／下裝 | palette | 配色盤 |
| accessory | 飾品 | lighting | 光線 |
| | | style | 畫風 |
