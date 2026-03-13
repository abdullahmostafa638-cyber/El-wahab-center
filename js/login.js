/* ═══════════════════════════════════════════
   مركز الوهاب — Login Page JavaScript
   login.js
═══════════════════════════════════════════ */

/* ════════════════════════════════
   CREDENTIALS & CONFIG
════════════════════════════════ */
var VALID_USER  = 'abdulla7';
var VALID_PASS  = '12345';
var TARGET_PAGE = 'student.html';

/* ════════════════════════════════
   DOM REFERENCES
════════════════════════════════ */
var usernameInput = document.getElementById('username');
var passInput     = document.getElementById('password');
var toggleBtn     = document.getElementById('togglePass');
var eyeIcon       = document.getElementById('eyeIcon');
var loginBtn      = document.getElementById('loginBtn');
var spinner       = document.getElementById('spinner');
var btnLabel      = document.getElementById('btnLabel');
var errorMsg      = document.getElementById('errorMsg');
var successOverlay = document.getElementById('successOverlay');

/* ════════════════════════════════
   PASSWORD VISIBILITY TOGGLE
════════════════════════════════ */
var eyeOpenSVG = [
  '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"',
  ' stroke="currentColor" stroke-width="1.6"/>',
  '<circle cx="12" cy="12" r="3"',
  ' stroke="currentColor" stroke-width="1.6"/>'
].join('');

var eyeClosedSVG = [
  '<line x1="1" y1="1" x2="23" y2="23"',
  ' stroke="currentColor" stroke-width="1.6"/>',
  '<path d="M10.73 5.08A10.94 10.94 0 0112 5c7 0 11 7 11 7',
  'a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24',
  'M1 12s4-8 11-8"',
  ' stroke="currentColor" stroke-width="1.6"',
  ' stroke-linecap="round" stroke-linejoin="round"/>',
  '<path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8',
  'a18.5 18.5 0 01-1.71 2.71"',
  ' stroke="currentColor" stroke-width="1.6"',
  ' stroke-linecap="round" stroke-linejoin="round"/>'
].join('');

var passVisible = false;

toggleBtn.addEventListener('click', function () {
  passVisible       = !passVisible;
  passInput.type    = passVisible ? 'text' : 'password';
  eyeIcon.innerHTML = passVisible ? eyeClosedSVG : eyeOpenSVG;
});

/* ════════════════════════════════
   ENTER KEY — SUBMIT
════════════════════════════════ */
[usernameInput, passInput].forEach(function (el) {
  el.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') handleLogin();
  });
});

/* ════════════════════════════════
   CLEAR ERROR ON TYPING
════════════════════════════════ */
usernameInput.addEventListener('input', clearError);
passInput.addEventListener('input', clearError);

function clearError() {
  errorMsg.classList.remove('show');
}

/* ════════════════════════════════
   SHAKE INPUTS ON WRONG CREDS
════════════════════════════════ */
function shakeInputs() {
  ['username', 'password'].forEach(function (id) {
    var el = document.getElementById(id);
    el.style.borderColor = 'rgba(220,50,50,0.5)';
    el.style.background  = 'rgba(220,50,50,0.06)';
    setTimeout(function () {
      el.style.borderColor = '';
      el.style.background  = '';
    }, 1200);
  });
}

/* ════════════════════════════════
   SHOW SUCCESS & REDIRECT
════════════════════════════════ */
function showSuccess() {
  successOverlay.classList.add('show');
  setTimeout(function () {
    window.location.href = TARGET_PAGE;
  }, 1200);
}

/* ════════════════════════════════
   MAIN LOGIN HANDLER
════════════════════════════════ */
function handleLogin() {
  var user = usernameInput.value.trim();
  var pass = passInput.value;

  /* Reset error */
  errorMsg.classList.remove('show');
  errorMsg.style.animation = 'none';

  if (user === VALID_USER && pass === VALID_PASS) {

    /* ── Correct credentials ── */
    spinner.style.display = 'block';
    btnLabel.textContent  = 'جارٍ الدخول…';
    loginBtn.disabled     = true;
    loginBtn.style.opacity = '0.85';

    setTimeout(showSuccess, 700);

  } else {

    /* ── Wrong credentials ── */
    /* Re-trigger shake animation via reflow */
    void errorMsg.offsetWidth;
    errorMsg.style.animation = '';
    errorMsg.classList.add('show');

    shakeInputs();
  }
}
