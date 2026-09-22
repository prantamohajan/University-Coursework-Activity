// ---------- DELETE ----------
async function removeProduct(id) {
  try {
    await apiRequest(`/products/${id}`, { method: 'DELETE' });
    showToast('পণ্য মুছে ফেলা হয়েছে');
    await loadAndRenderProducts();
  } catch (err) {
    showToast(err.message);
  }
}
