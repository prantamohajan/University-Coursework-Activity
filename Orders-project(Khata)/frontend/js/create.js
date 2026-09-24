// ---------- CREATE ----------
async function addOrder() {
  const customer = document.getElementById('fCustomer').value.trim();
  const item = document.getElementById('fItem').value.trim();
  const quantity = document.getElementById('fQty').value;
  const price = document.getElementById('fPrice').value;

  if (!customer || !item) {
    showToast('গ্রাহকের নাম ও পণ্যের নাম দিতে হবে');
    return;
  }

  try {
    await apiRequest('/orders', {
      method: 'POST',
      body: JSON.stringify({ customer, item, quantity, price })
    });

    showToast('অর্ডার যোগ হয়েছে');
    clearAddForm();
    await loadAndRenderOrders();
  } catch (err) {
    showToast(err.message);
  }
}

function clearAddForm() {
  document.getElementById('fCustomer').value = '';
  document.getElementById('fItem').value = '';
  document.getElementById('fQty').value = '';
  document.getElementById('fPrice').value = '';
  document.getElementById('fCustomer').focus();
}
