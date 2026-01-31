document.getElementById("pswdBtn").addEventListener("click", () => {
  const input = document.getElementById("account_password")
  const text = document.getElementById("toggle-text")

  if (input.type === "password") {
    input.type = "text"
    text.textContent = "Hide Password"
  } else {
    input.type = "password"
    text.textContent = "Show Password"
  }
})
