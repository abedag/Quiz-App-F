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

    
  })
}

