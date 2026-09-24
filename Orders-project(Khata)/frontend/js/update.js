// ---------- UPDATE ----------
let editingId = null;

function openEdit(id) {
  const o = currentOrders.find(x => x.id === id);
  if (!o) return;

  editingId = id;
  document.getElementById('eCustomer').value = o.customer;
  document.getElementById('eItem').value = o.item;
  document.getElementById('eQty').value = o.quantity;
  document.getElementById('ePrice').value = o.price;
  document.getElementById('eStatus').value = o.status;
  document.getElementById('editBackdrop').classList.add('show');
}

function closeEdit() {
  editingId = null;
  document.getElementById('editBackdrop').classList.remove('show');
}

async function saveEdit() {
  const customer = document.getElementById('eCustomer').value.trim();
  const item = document.getElementById('eItem').value.trim();
  const quantity = document.getElementById('eQty').value;
  const price = document.getElementById('ePrice').value;
  const status = document.getElementById('eStatus').value;

  if (!customer || !item) {
    showToast('গ্রাহকের নাম ও পণ্যের নাম দিতে হবে');
    return;
  }

  try {
    await apiRequest(`/orders/${editingId}`, {
      method: 'PUT',
      body: JSON.stringify({ customer, item, quantity, price, status })
    });

    showToast('অর্ডার হালনাগাদ হয়েছে');
    closeEdit();
    await loadAndRenderOrders();
  } catch (err) {
    showToast(err.message);
  }
}
