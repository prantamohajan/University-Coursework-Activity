// ---------- DELETE ----------
async function removeOrder(id) {
  try {
    await apiRequest(`/orders/${id}`, { method: 'DELETE' });
    showToast('অর্ডার বাতিল করা হয়েছে');
    await loadAndRenderOrders();
  } catch (err) {
    showToast(err.message);
  }
}
