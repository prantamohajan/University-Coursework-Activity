// ---------- AUTH GUARD ----------
const loggedInAdmin = JSON.parse(localStorage.getItem('khataAdmin') || 'null');

if (!loggedInAdmin) {
  window.location.href = 'login.html';
}

function logoutAdmin() {
  localStorage.removeItem('khataAdmin');
  window.location.href = 'login.html';
}
