// ---------- ADMIN READ ----------
async function loadAndRenderAdmins() {
  try {
    const admins = await apiRequest('/admin');
    renderAdminList(admins);
  } catch (err) {
    document.getElementById('adminList').innerHTML =
      `<div class="empty"><div class="big">লোড করা যায়নি</div>${err.message}</div>`;
  }
}

function renderAdminList(admins) {
  const wrap = document.getElementById('adminList');

  wrap.innerHTML = admins.map(a => `
    <div class="admin-row">
      <span class="admin-name">${a.username}${a.username === loggedInAdmin.username ? ' <em>(আপনি)</em>' : ''}</span>
      <button class="icon-btn danger" onclick="removeAdmin('${a.id}')">সরিয়ে দিন</button>
    </div>
  `).join('');
}
