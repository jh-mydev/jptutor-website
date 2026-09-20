# 日語小教室網站

純 HTML/CSS/JS 靜態網站，包含：關於我、日語文法說明、文章分享、聯絡表單。

## 檔案結構
- `index.html` — 網站內容（單頁，含四個區塊）
- `style.css` — 樣式
- `script.js` — 手機選單、表單驗證與送出邏輯

## 讓聯絡表單真的能收到信
表單預設只會驗證欄位，不會寄信，因為靜態網站沒有後端。要收到訪客留言：

1. 到 [Formspree](https://formspree.io) 免費註冊，建立一個表單，取得類似
   `https://formspree.io/f/xxxxxxx` 的網址。
2. 打開 `script.js`，把第一行 `FORM_ENDPOINT` 的值換成你自己的網址。
3. 存檔、重新整理網頁即可測試，之後訪客送出表單時你會收到 Email 通知。

（也可以改用 EmailJS 或其他表單服務，作法類似，只要把送出邏輯的 fetch 目標換掉即可。）

## 如何預覽
直接用瀏覽器開啟 `index.html`，或在此資料夾執行：

```bash
python3 -m http.server 8000
```

再到瀏覽器打開 `http://localhost:8000`。

## 如何編輯內容
- 關於我／文法／文章內容都直接寫在 `index.html` 對應區塊（`#about`、`#grammar`、`#articles`）裡，修改文字即可。
- 想新增文法卡片，複製一組 `<details class="grammar-card">...</details>` 貼上並修改內容。
- 想新增文章，複製一組 `<article class="article-card">...</article>` 貼上並修改內容。

## 部署
這是純靜態網站，可直接部署到 GitHub Pages、Netlify、Vercel 等服務，
把整個資料夾上傳即可，不需要額外設定伺服器。
