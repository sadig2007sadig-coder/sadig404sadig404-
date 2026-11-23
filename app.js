
document.addEventListener("DOMContentLoaded", () => {
  const loginScreen = document.getElementById("loginScreen");
  const appShell = document.getElementById("appShell");
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const userEmail = document.getElementById("userEmail");
  const userName = document.getElementById("userName");
  const toast = document.getElementById("toast");

  // استعادة البريد المحفوظ
  const savedEmail = localStorage.getItem("smartLibraryEmail");

  if (savedEmail) {
    showLibrary(savedEmail);
  }

  // عرض المكتبة
  function showLibrary(email) {
    loginScreen.classList.add("hidden");
    appShell.classList.remove("hidden");

    userEmail.textContent = email;
    userName.textContent = email.split("@")[0] || "طالبنا";
  }

  // تسجيل الدخول التجريبي
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = emailInput.value.trim().toLowerCase();

    if (!emailInput.checkValidity()) {
      emailInput.reportValidity();
      return;
    }

    localStorage.setItem("smartLibraryEmail", email);

    showLibrary(email);
    showToast("مرحباً بك في المكتبة الذكية");
  });

  // تسجيل الخروج
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("smartLibraryEmail");

    appShell.classList.add("hidden");
    loginScreen.classList.remove("hidden");

    emailInput.value = "";
  });

  // أقسام المواد
  document.querySelectorAll(".open-subject").forEach((button) => {
    button.addEventListener("click", () => {
      showToast(
        `سيتم تجهيز قسم ${button.dataset.subject} قريباً`
      );
    });
  });

  // السنة الحالية
  document.getElementById("year").textContent =
    new Date().getFullYear();

  // رسائل الموقع
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(window.libraryToastTimer);

    window.libraryToastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2600);
  }
});
