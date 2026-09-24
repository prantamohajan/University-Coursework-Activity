// ---------- UPDATE ----------
let editingId = null;

function openEdit(id) {
  const p = currentProducts.find(x => x.id === id);
  if (!p) return;

  editingId = id;
  document.getElementById('eName').value = p.name;
  document.getElementById('eCategory').value = p.category || '';
  document.getElementById('ePrice').value = p.price;
  document.getElementById('eQty').value = p.qty;
  document.getElementById('editBackdrop').classList.add('show');
}

function closeEdit() {
  editingId = null;
  document.getElementById('editBackdrop').classList.remove('show');
}

async function saveEdit() {
  const name = document.getElementById('eName').value.trim();
  const category = document.getElementById('eCategory').value.trim();
  const price = document.getElementById('ePrice').value;
  const qty = document.getElementById('eQty').value;

  if (!name) {
    showToast('পণ্যের নাম দিতে হবে');
    return;
  }

  try {
    await apiRequest(`/products/${editingId}`, {
      method: 'PUT',
      body: JSON.stringify({ name, category, price, qty })
    });

    showToast('হালনাগাদ সম্পন্ন হয়েছে');
    closeEdit();
    await loadAndRenderProducts();
  } catch (err) {
    showToast(err.message);
  }
}
