const form = document.getElementById('form');
const form_type = document.getElementById('form-type');
const email_input = document.getElementById('email-input');
const username_input = document.getElementById('username-input');
const pass_input = document.getElementById('pass-input');
const confirm_pass_input = document.getElementById('confirm-pass');
const error_message = document.getElementById('error-message');

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    error_message.innerText = "";
    error_message.className = "message";

    let errors = [];

    if (form_type.value == 'register') {
      errors = getSignupFormErrors(
        email_input.value,
        username_input.value,
        pass_input.value,
        confirm_pass_input.value
      );

      if (errors.length === 0) {
        const users = JSON.parse(localStorage.getItem('quizUsers')) || [];
        const existingUser = users.find(
          user =>
            user.email === email_input.value || user.username === username_input.value
        );

        if (existingUser) {
          if (existingUser.email === email_input.value) {
            errors.push("❌ This email is already registered");
          }
          if (existingUser.username === username_input.value) {
            errors.push("❌ This username is already taken");
          }
          showErrors(errors);
        } else {
          try {
            const hashedPassword = await hashPassword(pass_input.value);
            const user = {
              email: email_input.value,
              username: username_input.value,
              password: hashedPassword,
              scores: {}
            };

            users.push(user);
            localStorage.setItem('quizUsers', JSON.stringify(users));

            error_message.className = 'message success';
            error_message.innerText = "✅ Registration successful! Redirecting to login...";
            setTimeout(() => {
              window.location.href = "/index.html";
            }, 2000);
          } catch (error) {
            showErrors(["❌ An error occurred during registration. Please try again."]);
          }
        }
      } else {
        showErrors(errors);
      }

    } else if (form_type.value == 'login') {
      if (email_input.value === "admin@gmail.com" && pass_input.value === "admin123") {
        error_message.className = 'message success';
        error_message.innerText = "✅ Welcome Admin! Redirecting to dashboard...";
        localStorage.setItem('currentUser', JSON.stringify({
          email: "admin@gmail.com",
          username: "Admin",
          password: await hashPassword("admin123")
        }));
        setTimeout(() => {
          window.location.href = "./public/dashboard.html";
        }, 2000);
        return;
      } else {
        errors = getLoginFormErrors(email_input.value, pass_input.value);

        if (errors.length === 0) {
          try {
            const users = JSON.parse(localStorage.getItem('quizUsers')) || [];
            const hashedPassword = await hashPassword(pass_input.value);
            
            const matchedUser = users.find(
              user => user.email === email_input.value && user.password === hashedPassword
            );

            if (matchedUser) {
              error_message.className = 'message success';
              error_message.innerText = `✅ Welcome back, ${matchedUser.username}! Redirecting...`;
              localStorage.setItem('currentUser', JSON.stringify(matchedUser));

              setTimeout(() => {
                window.location.href = "./public/home.html";
              }, 2000);
            } else {
              const emailExists = users.some(user => user.email === email_input.value);

              if (!emailExists) {
                showErrors(["❌ This email is not registered."]);
              } else {
                showErrors(["❌ Incorrect password."]);
              }
            }
          } catch (error) {
            showErrors(["❌ An error occurred during login. Please try again."]);
          }
        } else {
          showErrors(errors);
        }
      }
    }
  });
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
      pass_input.value = '';
    if (confirm_pass_input) confirm_pass_input.value = '';
}