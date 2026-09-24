// ---------- Toast ----------
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => t.classList.remove('show'), 2200);
}

// ---------- Event wiring ----------
document.getElementById('addBtn').addEventListener('click', addOrder);
document.getElementById('cancelEdit').addEventListener('click', closeEdit);
document.getElementById('saveEdit').addEventListener('click', saveEdit);
document.getElementById('editBackdrop').addEventListener('click', (e) => {
  if (e.target.id === 'editBackdrop') closeEdit();
});

['fCustomer', 'fItem', 'fQty', 'fPrice'].forEach(id => {
  document.getElementById(id).addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addOrder();
  });
});

document.getElementById('filters').addEventListener('click', (e) => {
  const btn = e.target.closest('.chip');
  if (!btn) return;
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  activeFilter = btn.dataset.status;
  renderOrders();
});

document.getElementById('logoutBtn').addEventListener('click', logoutAdmin);
document.getElementById('addAdminBtn').addEventListener('click', addAdmin);
['aUsername', 'aPassword'].forEach(id => {
  document.getElementById(id).addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addAdmin();
  });
});

// ---------- Boot ----------
loadAndRenderOrders();
loadAndRenderAdmins();
