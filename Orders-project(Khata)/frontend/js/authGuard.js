// ---------- AUTH GUARD ----------
// index.html লোড হওয়ার সাথে সাথেই সবচেয়ে আগে চেক করা হয়
const loggedInAdmin = JSON.parse(localStorage.getItem('orderHubAdmin') || 'null');

if (!loggedInAdmin) {
  window.location.href = 'login.html';
}

function logoutAdmin() {
  localStorage.removeItem('orderHubAdmin');
  window.location.href = 'login.html';
}
