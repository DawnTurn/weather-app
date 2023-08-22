const passwordInput = document.getElementById('password')
const seePasswordBtn = document.querySelector('.bxs-lock-alt')
const unSeePasswordBtn = document.querySelector('.bxs-lock-open-alt')
const loginForm = document.getElementById("login-form");
const submitButton = document.getElementById("submit");
const errorMessage = document.querySelector(".message");

seePasswordBtn.addEventListener('click', () => {
    passwordInput.type = 'text'
    unSeePasswordBtn.classList.add('see')
    seePasswordBtn.classList.add('un-see')
})

unSeePasswordBtn.addEventListener('click', () => {
    passwordInput.type = 'password'
    seePasswordBtn.classList.remove('un-see')
    unSeePasswordBtn.classList.remove('see')
})

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      submitButton.disabled = true;

      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful, redirect to home page or perform other actions
        errorMessage.textContent = "login Successful";
        errorMessage.style.color = "green";
        window.location.href = './public/home.html'

      } else {
        // Login failed, display error message
        errorMessage.textContent = data.message;
        errorMessage.style.color = "red";
      }
    } catch (error) {
        console.error("An error occurred:", error);
        errorMessage.textContent = "An error occurred while processing your request.";
        errorMessage.style.color = "red";
      } finally {
          submitButton.disabled = false;
        }
});
