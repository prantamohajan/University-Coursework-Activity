// ---------- Toast ----------
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => t.classList.remove('show'), 2200);
}

// ---------- Event wiring ----------
document.getElementById('addBtn').addEventListener('click', addProduct);
document.getElementById('searchBox').addEventListener('input', renderProductTable);
document.getElementById('cancelEdit').addEventListener('click', closeEdit);
document.getElementById('saveEdit').addEventListener('click', saveEdit);
document.getElementById('editBackdrop').addEventListener('click', (e) => {
  if (e.target.id === 'editBackdrop') closeEdit();
});

['fName', 'fCategory', 'fPrice', 'fQty'].forEach(id => {
  document.getElementById(id).addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addProduct();
  });
});

document.getElementById('logoutBtn').addEventListener('click', logoutAdmin);
document.getElementById('addAdminBtn').addEventListener('click', addAdmin);
['aUsername', 'aPassword'].forEach(id => {
  document.getElementById(id).addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addAdmin();
  });
});

// ---------- Boot ----------
loadAndRenderProducts();
loadAndRenderAdmins();
