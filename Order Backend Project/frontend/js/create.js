// ---------- CREATE ----------
async function addProduct() {
  const name = document.getElementById('fName').value.trim();
  const category = document.getElementById('fCategory').value.trim();
  const price = document.getElementById('fPrice').value;
  const qty = document.getElementById('fQty').value;

  if (!name) {
    showToast('পণ্যের নাম দিতে হবে');
    return;
  }

  try {
    await apiRequest('/products', {
      method: 'POST',
      body: JSON.stringify({ name, category, price, qty })
    });

    showToast('পণ্য যোগ হয়েছে');
    clearAddForm();
    await loadAndRenderProducts();
  } catch (err) {
    showToast(err.message);
  }
}

function clearAddForm() {
  document.getElementById('fName').value = '';
  document.getElementById('fCategory').value = '';
  document.getElementById('fPrice').value = '';
  document.getElementById('fQty').value = '';
  document.getElementById('fName').focus();
}
