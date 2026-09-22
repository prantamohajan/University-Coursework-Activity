// ---------- LOGIN ----------
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => t.classList.remove('show'), 2200);
}

async function handleLogin() {
  const username = document.getElementById('lUsername').value.trim();
  const password = document.getElementById('lPassword').value;

  if (!username || !password) {
    showToast('ইউজারনেম ও পাসওয়ার্ড দিতে হবে');
    return;
  }

  try {
    const admin = await apiRequest('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });

    localStorage.setItem('khataAdmin', JSON.stringify(admin));
    window.location.href = 'index.html';
  } catch (err) {
    showToast(err.message);
  }
}

document.getElementById('loginBtn').addEventListener('click', handleLogin);
['lUsername', 'lPassword'].forEach(id => {
  document.getElementById(id).addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleLogin();
  });
});
