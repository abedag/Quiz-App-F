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

function getSignupFormErrors(email, username, pass, confirm_pass) {
  const errors = [];

  if (!username) errors.push("Username is required");
  if (!email) errors.push("Email is required");
  if (!pass) errors.push("Password is required");
  if (!confirm_pass) {
    errors.push("Confirm your password");
  } else if (pass !== confirm_pass) {
    errors.push("Passwords do not match");
  }

  return errors;
}

function getLoginFormErrors(email, pass) {
  const errors = [];

  if (!email) errors.push("Email is required");
  if (!pass) errors.push("Password is required");

  return errors;
}

function showErrors(errors) {
  error_message.className = 'message error';
  error_message.innerText = errors.join(". ");
}
