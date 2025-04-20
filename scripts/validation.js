const form = document.getElementById('form');
const email_input = document.getElementById('email-input');
const username_input = document.getElementById('username-input');
const pass_input = document.getElementById('pass-input');
const confirm_pass_input = document.getElementById('confirm-pass');
const error_message = document.getElementById('error-message');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    error_message.innerText = "";
    error_message.className = "message";

    let errors = [];

    if (username_input && confirm_pass_input) {

      errors = getSignupFormErrors(
        email_input.value,
        username_input.value,
        pass_input.value,
        confirm_pass_input.value
      );

      if (errors.length === 0) {
        const user = {
          email: email_input.value,
          username: username_input.value,
          password: pass_input.value,
        }

        localStorage.setItem('quizUser', JSON.stringify(user));

        error_message.className = 'message success';
        error_message.innerText = "✅ Registration successful! Redirecting to login...";
        setTimeout(() => {
          window.location.href = "/index.html";
        }, 2000);
      } else {
        showErrors(errors);
      }

    } else {

      errors = getLoginFormErrors(email_input.value, pass_input.value);

      if (errors.length === 0) {
        const savedUser = JSON.parse(localStorage.getItem('quizUser'));

        if (
          savedUser &&
          savedUser.email === email_input.value &&
          savedUser.password === pass_input.value
        ) {
          error_message.className = 'message success';
          error_message.innerText = `✅ Welcome back, ${savedUser.username}! Redirecting...`;
          setTimeout(() => {
            window.location.href = "./public/home.html";
          }, 2000);
        } else {
          showErrors(["❌ Invalid email or password."]);
        }

      } else {
        showErrors(errors);
      }
    }
  })
}

