const signupForm = document.querySelector("#signup-form");
const errorMessage = document.querySelector(".message");
const passwordInput = document.getElementById("password");
const seePasswordBtn = document.querySelector(".bxs-lock-alt");
const unSeePasswordBtn = document.querySelector(".bxs-lock-open-alt");

seePasswordBtn.addEventListener("click", () => {
  passwordInput.type = "text";
  unSeePasswordBtn.classList.add("see");
  seePasswordBtn.classList.add("un-see");
});

unSeePasswordBtn.addEventListener("click", () => {
  passwordInput.type = "password";
  seePasswordBtn.classList.remove("un-see");
  unSeePasswordBtn.classList.remove("see");
});

signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;


    try {
        const response = await fetch("/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            errorMessage.textContent = "User account created successfully";
            errorMessage.style.color = "green";
            // window.location.href = '/login'
        } 
        
        else {
        // Signup failed
            errorMessage.textContent = data.message;
            errorMessage.style.color = "red";
        }
        
    } catch (error) {
        console.error("An error occurred:", error);
        errorMessage.textContent =
        "An error occurred while processing your request.";
        errorMessage.style.color = "red";
    }
});

