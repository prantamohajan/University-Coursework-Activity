// ---------- ADMIN CREATE ----------
async function addAdmin() {
  const username = document.getElementById('aUsername').value.trim();
  const password = document.getElementById('aPassword').value;

  if (!username || !password) {
    showToast('ইউজারনেম ও পাসওয়ার্ড দিতে হবে');
    return;
  }

  try {
    await apiRequest('/admin/register', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });

    showToast('নতুন এডমিন যোগ হয়েছে');
    document.getElementById('aUsername').value = '';
    document.getElementById('aPassword').value = '';
    await loadAndRenderAdmins();
  } catch (err) {
    showToast(err.message);
  }
}
