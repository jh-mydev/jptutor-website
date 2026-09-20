// 若要讓表單真的把訊息寄到你的信箱，請到 https://formspree.io 免費註冊，
// 建立一個表單後，把取得的網址貼到下面 FORM_ENDPOINT 取代預設值。
const FORM_ENDPOINT = "https://formspree.io/f/your-form-id";

document.getElementById("year").textContent = new Date().getFullYear();

// 手機版選單開關
const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// 聯絡表單驗證與送出
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

function setError(fieldName, message) {
  const row = document.querySelector(`[name="${fieldName}"]`).closest(".form-row");
  const errorEl = row.querySelector(".form-error");
  if (message) {
    row.classList.add("has-error");
    errorEl.textContent = message;
  } else {
    row.classList.remove("has-error");
    errorEl.textContent = "";
  }
}

function validate(data) {
  let valid = true;

  if (!data.name.trim()) {
    setError("name", "請輸入姓名");
    valid = false;
  } else {
    setError("name", "");
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim()) {
    setError("email", "請輸入 Email");
    valid = false;
  } else if (!emailPattern.test(data.email.trim())) {
    setError("email", "Email 格式不正確");
    valid = false;
  } else {
    setError("email", "");
  }

  if (!data.message.trim()) {
    setError("message", "請輸入想留的話");
    valid = false;
  } else {
    setError("message", "");
  }

  return valid;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const data = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value,
  };

  if (!validate(data)) {
    statusEl.textContent = "";
    statusEl.className = "form-status";
    return;
  }

  const submitBtn = form.querySelector(".btn-submit");
  submitBtn.disabled = true;
  statusEl.className = "form-status";
  statusEl.textContent = "傳送中…";

  if (FORM_ENDPOINT.includes("your-form-id")) {
    statusEl.textContent = "表單尚未連接送信服務，請先設定 script.js 內的 FORM_ENDPOINT（詳見說明文件）。";
    statusEl.className = "form-status error";
    submitBtn.disabled = false;
    return;
  }

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form),
    });

    if (response.ok) {
      statusEl.textContent = "感謝留言！我會盡快回覆你 😊";
      statusEl.className = "form-status success";
      form.reset();
    } else {
      statusEl.textContent = "送出失敗，請稍後再試一次。";
      statusEl.className = "form-status error";
    }
  } catch (err) {
    statusEl.textContent = "網路發生問題，請稍後再試一次。";
    statusEl.className = "form-status error";
  } finally {
    submitBtn.disabled = false;
  }
});
