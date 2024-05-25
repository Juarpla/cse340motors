document.addEventListener("DOMContentLoaded", () => {
  const title = document.title;

  if (title.includes("Login") || title.includes("Register")) {
    const passwordInput = document.getElementById("password");
    const togglePasswordBtn = document.getElementById("pwd-visibility");

    if (passwordInput && togglePasswordBtn) {
      const togglePassword = () => {
        passwordInput.type =
          passwordInput.type === "password" ? "text" : "password";
      };

      togglePasswordBtn.addEventListener("click", togglePassword);
    }
  }
});
