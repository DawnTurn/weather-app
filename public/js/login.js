const passwordInput = document.getElementById('password')
const seePasswordBtn = document.querySelector('.bxs-lock-alt')
const unSeePasswordBtn = document.querySelector('.bxs-lock-open-alt')

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
